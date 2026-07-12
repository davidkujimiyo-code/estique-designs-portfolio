# Estique Designs Portfolio – Booking System

This is the creative brand design portfolio for **Estique Designs (Esther Udoh)**. It includes a fully functional, production-ready backend booking request system.

---

## 🛠️ Tech Stack & Architecture
- **Frontend**: React (Vite, TypeScript, TailwindCSS)
- **Backend API**: Vercel Edge Functions (using standard Fetch Request/Response Web APIs)
- **Database**: Supabase (PostgreSQL with Row Level Security, Trigger Functions, and Indexes)
- **Email Delivery**: Resend
- **Security Check**: Cloudflare Turnstile

---

## 📂 Project Setup & Local Development

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Environment Configuration
Copy the configuration template:
```bash
cp .env.example .env
```
Open `.env` and fill in the required credentials:
- `RESEND_API_KEY`: API key from your Resend dashboard.
- `ESTHER_ALERT_EMAIL`: Esther's destination email (`estherudoh27@gmail.com`).
- `SUPABASE_URL`: The API Endpoint URL of your Supabase project.
- `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`: Key tokens from Supabase API dashboard.
- `TURNSTILE_SECRET_KEY`: The Turnstile private key.
- `VITE_TURNSTILE_SITE_KEY`: The Turnstile public site key.

> [!NOTE]
> For local testing, you can use Cloudflare's public Turnstile test keys.
> Sitekey: `1x00000000000000000000AA`
> Secret key: `1x000000000000000000000000000000000`

### 3. Database Migration
To set up the required table schema and indexes:
1. Open your **Supabase Dashboard**.
2. Go to the **SQL Editor** tab.
3. Open the [supabase_migration.sql](file:///c:/Users/InfinityMFB/Documents/PORTFOLIO/supabase_migration.sql) file in this project repository.
4. Copy the SQL commands and paste them into the Supabase SQL Editor.
5. Click **Run** to execute. This creates the `bookings` table, updates RLS security, constructs database indexes, and configures the automatic `updated_at` trigger.

---

## 🔒 Security & Spam Protection

1. **Row Level Security (RLS)**: Row-level security is enabled on the `bookings` table. Public anonymous visitors cannot read, write, or modify records. Only the backend API using the `SUPABASE_SERVICE_ROLE_KEY` is authorized to insert rows.
2. **Turnstile Captcha Verification**: Validates tokens server-side before executing any write transactions.
3. **Stateless IP Rate Limiting**: The backend counts incoming IP submissions in the last hour; requests exceeding 3 bookings/hour are rejected with a `429` status.
4. **Duplicate Prevention**: Rejects any submission matching the same email and description within a 2-minute window.
5. **Sanitization**: Sanitizes input fields against XSS/script injection threats.

---

## 🚀 Vercel Edge Deployment

This project uses the standard **Web Request/Response API**, allowing the API to run directly as a high-performance Vercel Edge Function.

### Environment Variable Setup on Vercel:
When deploying the repository to Vercel, ensure you configure the following variables in the **Environment Variables** section of the Vercel Project Settings page:
- `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TURNSTILE_SECRET_KEY`
- `VITE_TURNSTILE_SITE_KEY`
- `ESTHER_ALERT_EMAIL`
- `RESEND_FROM_EMAIL` (Optional, defaults to Resend's default onboarding sender email)

---

## 🔍 Troubleshooting Guide

### 1. Error: `Unexpected end of JSON input`
- **Cause**: The Vite development server was not proxying requests to the API handler, returning the default SPA HTML shell instead.
- **Fix**: We configured custom Web API request/response translator middleware inside [vite.config.ts](file:///c:/Users/InfinityMFB/Documents/PORTFOLIO/vite.config.ts). Run `npm run dev` and Vite will intercept `/api/booking` calls and run the backend script locally.

### 2. Error: `res.setHeader is not a function`
- **Cause**: Next.js / Express-specific Node.js response wrappers were invoked in the Edge environment.
- **Fix**: The backend has been completely refactored to use standard Web API `Response.json(...)` returns.

### 3. Verification token fails
- **Fix**: Ensure that the `VITE_TURNSTILE_SITE_KEY` in the frontend (stored in `.env`) matches the `TURNSTILE_SECRET_KEY` verification key on the backend.
