import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Configure Vercel to execute on the Edge Runtime
export const config = {
  runtime: 'edge',
};

// Input sanitization to prevent script/HTML injection
const sanitizeInput = (val: string): string => {
  if (!val) return '';
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export async function POST(request: Request) {
  // Always set JSON content-type header
  const responseHeaders = {
    'Content-Type': 'application/json',
  };

  console.log('✓ Booking request received');

  // 1. Verify Environment Variables
  const requiredEnv = [
    'RESEND_API_KEY',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'TURNSTILE_SECRET_KEY',
    'ESTHER_ALERT_EMAIL'
  ];

  const missingEnv: string[] = [];
  for (const envVar of requiredEnv) {
    const val = process.env[envVar];
    if (!val || val.trim() === '' || val.includes('your-project-id') || val.includes('your-anon-key') || val.includes('your-service-role-key')) {
      missingEnv.push(envVar);
    }
  }

  if (missingEnv.length > 0) {
    for (const envVar of missingEnv) {
      console.error(`✗ Missing ${envVar}`);
    }
    console.error('✗ Booking failed: missing environment variables');
    return new Response(
      JSON.stringify({
        success: false,
        error: `Database or API configuration error. Missing required variable(s): ${missingEnv.join(', ')}. Please configure them in your Vercel Project Settings or local .env file.`
      }),
      { status: 500, headers: responseHeaders }
    );
  }

  let body: any;
  // 2. Parse request body JSON safely
  try {
    console.log('✓ Parsing request JSON...');
    body = (await request.json()) as any;
    console.log('✓ Request JSON parsed successfully');
  } catch (err: any) {
    console.error('✗ Failed at step: Parsing request JSON. Error:', err.message || err);
    return new Response(
      JSON.stringify({ success: false, error: 'Malformed request. Missing request body.' }),
      { status: 400, headers: responseHeaders }
    );
  }

  const { name, email, projectType, budget, timeline, message, turnstileToken, phoneNumber } = body;

  // 3. Validate Request Payload Inputs
  if (!name || typeof name !== 'string' || !name.trim()) {
    console.error('✗ Validation failed: Missing name');
    return new Response(
      JSON.stringify({ success: false, error: 'Please enter your name.' }),
      { status: 400, headers: responseHeaders }
    );
  }
  if (!email || typeof email !== 'string' || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
    console.error('✗ Validation failed: Invalid email address');
    return new Response(
      JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
      { status: 400, headers: responseHeaders }
    );
  }
  if (!projectType || typeof projectType !== 'string') {
    console.error('✗ Validation failed: Missing project type');
    return new Response(
      JSON.stringify({ success: false, error: 'Please select a project type.' }),
      { status: 400, headers: responseHeaders }
    );
  }
  if (!budget || typeof budget !== 'string') {
    console.error('✗ Validation failed: Missing budget range');
    return new Response(
      JSON.stringify({ success: false, error: 'Please select a budget range.' }),
      { status: 400, headers: responseHeaders }
    );
  }
  if (!timeline || typeof timeline !== 'string') {
    console.error('✗ Validation failed: Missing timeline');
    return new Response(
      JSON.stringify({ success: false, error: 'Please select a timeline.' }),
      { status: 400, headers: responseHeaders }
    );
  }
  if (!turnstileToken || typeof turnstileToken !== 'string') {
    console.error('✗ Validation failed: Missing Turnstile token');
    return new Response(
      JSON.stringify({ success: false, error: 'Security verification check token is missing.' }),
      { status: 400, headers: responseHeaders }
    );
  }

  console.log('✓ Validation passed');

  // Sanitize variables
  const cleanName = sanitizeInput(name.trim());
  const cleanEmail = email.trim().toLowerCase();
  const cleanProjectType = sanitizeInput(projectType);
  const cleanBudget = sanitizeInput(budget);
  const cleanTimeline = sanitizeInput(timeline);
  const cleanMessage = sanitizeInput(message || '');
  const cleanPhone = phoneNumber ? sanitizeInput(String(phoneNumber).trim()) : null;

  // Extract client IP
  const clientIp = (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  ).split(',')[0].trim();

  // 4. Cloudflare Turnstile token verification
  try {
    console.log('✓ Turnstile verification started');
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY!;
    
    const params = new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
      remoteip: clientIp,
    });

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    console.log('✓ Turnstile HTTP status:', turnstileRes.status);
    console.log('✓ Turnstile headers:', JSON.stringify(Object.fromEntries(turnstileRes.headers.entries())));

    const turnstileText = await turnstileRes.text();
    console.log('✓ Turnstile raw response text:', turnstileText);

    if (!turnstileText) {
      throw new Error('Empty response body returned by Cloudflare Turnstile server.');
    }

    const turnstileData = JSON.parse(turnstileText);
    if (!turnstileData.success) {
      console.error('✗ Turnstile verification failed. Error codes:', turnstileData['error-codes'] || 'None');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Spam verification failed. Please try solving the security check again.'
        }),
        { status: 401, headers: responseHeaders }
      );
    }
    console.log('✓ Turnstile verification succeeded');
  } catch (err: any) {
    console.error('✗ Failed at step: Turnstile verification. Error:', err.message || err);
    return new Response(
      JSON.stringify({ success: false, error: `Security check server validation failed: ${err.message || err}` }),
      { status: 500, headers: responseHeaders }
    );
  }

  // 5. Connect to Supabase and Check Rate Limits / Duplicates
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // A. Rate Limit check
  let count: number | null = 0;
  try {
    console.log('✓ Checking Supabase rate limits...');
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: ipCount, error: countError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIp)
      .gt('created_at', oneHourAgo);

    if (countError) {
      throw countError;
    }
    count = ipCount;
    console.log(`✓ Supabase rate check done (IP submissions in last hour: ${count || 0})`);
  } catch (err: any) {
    console.error('✗ Failed at step: Supabase rate check. Error:', err.message || err);
    // Log error but do not fail hard, continue submission unless count is exceeding limit
  }

  if (count && count >= 3) {
    console.error(`✗ Rate limit hit for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Too many booking requests from this device. Please try again in an hour.'
      }),
      { status: 429, headers: responseHeaders }
    );
  }

  // B. Duplicate check
  let dupCount: number | null = 0;
  try {
    console.log('✓ Checking Supabase duplicate submissions...');
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const { count: matchCount, error: dupError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('client_email', cleanEmail)
      .eq('description', cleanMessage)
      .gt('created_at', twoMinutesAgo);

    if (dupError) {
      throw dupError;
    }
    dupCount = matchCount;
    console.log(`✓ Supabase duplicate check done (matches in last 2 mins: ${dupCount || 0})`);
  } catch (err: any) {
    console.error('✗ Failed at step: Supabase duplicate check. Error:', err.message || err);
  }

  if (dupCount && dupCount > 0) {
    console.error(`✗ Duplicate submission blocked for: ${cleanEmail}`);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Duplicate booking request detected. You have already submitted this inquiry moments ago.'
      }),
      { status: 409, headers: responseHeaders }
    );
  }

  // 6. Store booking in Supabase Database
  try {
    console.log('✓ Preparing Supabase insert...');
    const { error: insertError } = await supabase
      .from('bookings')
      .insert({
        client_name: cleanName,
        client_email: cleanEmail,
        phone_number: cleanPhone,
        project_type: cleanProjectType,
        budget_range: cleanBudget,
        timeline: cleanTimeline,
        description: cleanMessage,
        ip_address: clientIp,
        status: 'New'
      });

    if (insertError) {
      throw insertError;
    }
    console.log('✓ Supabase insert succeeded');
  } catch (err: any) {
    console.error('✗ Supabase insert failed. Error Details:', err.message || err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'We were unable to save your booking details. Please try again later.'
      }),
      { status: 500, headers: responseHeaders }
    );
  }

  // 7. Send Emails via Resend
  const resendApiKey = process.env.RESEND_API_KEY!;
  const resend = new Resend(resendApiKey);

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const estherEmail = process.env.ESTHER_ALERT_EMAIL!;
  const submittedDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const submittedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC';

  // A. Send Alert to Esther
  const estherEmailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
      <div style="text-align: center; border-bottom: 2px solid #C9A227; padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 32px; display: block; margin-bottom: 10px;">📩</span>
        <h2 style="color: #C9A227; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">New Booking Request</h2>
        <p style="font-size: 13px; color: #6b7280; margin: 5px 0 0 0;">Estique Designs Studio Portal</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px; width: 150px;">Client Name:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;">${cleanName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px;">Client Email:</td>
          <td style="padding: 10px 0; color: #C9A227; font-size: 14px; font-weight: 600;"><a href="mailto:${cleanEmail}" style="color: #C9A227; text-decoration: none;">${cleanEmail}</a></td>
        </tr>
        ${cleanPhone ? `
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px;">Phone Number:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;">${cleanPhone}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px;">Project Type:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;">${cleanProjectType}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px;">Budget Range:</td>
          <td style="padding: 10px 0; color: #10b981; font-size: 14px; font-weight: 600;">${cleanBudget}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px;">Timeline:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;">${cleanTimeline}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px;">Submission Date:</td>
          <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">${submittedDate}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563; font-size: 13px;">Submission Time:</td>
          <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">${submittedTime}</td>
        </tr>
      </table>
      
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h4 style="margin: 0 0 10px 0; color: #374151; font-size: 14px; font-weight: 700; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Project Objectives & Description:</h4>
        <p style="margin: 0; font-size: 13px; color: #4b5563; white-space: pre-wrap; line-height: 1.6;">${cleanMessage || 'No description provided.'}</p>
      </div>
      
      <div style="text-align: center; border-top: 1px solid #f3f4f6; padding-top: 20px; font-size: 11px; color: #9ca3af;">
        Sent from Estique Designs Creative Portfolio system.
      </div>
    </div>
  `;

  try {
    console.log('✓ Sending Esther notification...');
    const result = await resend.emails.send({
      from: fromEmail,
      to: estherEmail,
      subject: '📩 New Booking Request – Estique Designs',
      html: estherEmailHtml,
    });
    console.log('✓ Esther notification sent. Details:', JSON.stringify(result));
  } catch (err: any) {
    console.error('✗ Resend failed (to Esther). Error Details:', err.message || err);
    return new Response(
      JSON.stringify({ success: false, error: `Alert email notification failed to send: ${err.message || err}` }),
      { status: 500, headers: responseHeaders }
    );
  }

  // B. Send Confirmation to Client
  const clientEmailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f3f4f6; padding-bottom: 20px;">
        <h1 style="color: #C9A227; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 2px;">ESTIQUE DESIGNS</h1>
        <p style="margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; color: #6b7280; letter-spacing: 1px;">Premium Creative & Branding Partner</p>
      </div>
      
      <p style="font-size: 15px; color: #111827; margin-bottom: 15px;">Hello ${cleanName},</p>
      <p style="font-size: 14px; color: #4b5563; margin-bottom: 20px;">We have successfully received your creative project booking request! Esther Udoh (Founder & Creative Director) will review your objectives and descriptions shortly.</p>
      
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h4 style="margin: 0 0 10px 0; color: #C9A227; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold;">Request Summary:</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 5px 0; color: #6b7280; font-weight: bold; width: 110px;">Service:</td>
            <td style="padding: 5px 0; color: #1f2937;">${cleanProjectType}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #6b7280; font-weight: bold;">Budget:</td>
            <td style="padding: 5px 0; color: #10b981; font-weight: 600;">${cleanBudget}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #6b7280; font-weight: bold;">Timeline:</td>
            <td style="padding: 5px 0; color: #1f2937;">${cleanTimeline}</td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 14px; color: #4b5563; margin-bottom: 25px;">
        Estique Designs operates with high creative standards. We evaluate inquiries and follow up with a proposal, invoice details, or design consultation booking slot <strong>within 24–48 hours</strong>.
      </p>
      
      <p style="font-size: 14px; color: #4b5563; margin-bottom: 15px;">
        If you have references or immediate mockups you want to share, you can also ping us directly on WhatsApp for instant feedback:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://wa.me/2349027966779" target="_blank" style="display: inline-block; background-color: #C9A227; color: #ffffff; text-decoration: none; padding: 14px 35px; font-weight: bold; border-radius: 30px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 15px -3px rgba(201,162,39,0.25);">Chat on WhatsApp</a>
      </div>
      
      <p style="font-size: 13px; color: #4b5563; margin-top: 30px;">
        Warm regards,<br />
        <strong>Estique Designs Studio</strong>
      </p>
    </div>
  `;

  try {
    console.log('✓ Sending client confirmation...');
    const result = await resend.emails.send({
      from: fromEmail,
      to: cleanEmail,
      subject: "We've received your booking request ✨",
      html: clientEmailHtml,
    });
    console.log('✓ Client confirmation sent. Details:', JSON.stringify(result));
  } catch (err: any) {
    console.error('✗ Resend failed (to Client). Error Details:', err.message || err);
    return new Response(
      JSON.stringify({ success: false, error: `Confirmation email failed to send: ${err.message || err}` }),
      { status: 500, headers: responseHeaders }
    );
  }

  console.log('✓ Returning success response...');
  console.log('✓ Booking completed successfully');
  return new Response(
    JSON.stringify({
      success: true,
      message: 'Booking submitted successfully.'
    }),
    { status: 200, headers: responseHeaders }
  );
}
