import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { POST } from './api/booking.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env file into process.env
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    define: {
      'process.env.VERCEL_URL': JSON.stringify(process.env.VERCEL_URL || '')
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vercel-booking-dev-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/booking' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  // Build absolute request URL to satisfy Web API Request constructor
                  const protocol = req.headers['x-forwarded-proto'] || 'http';
                  const host = req.headers.host || 'localhost';
                  const url = `${protocol}://${host}${req.url}`;
                  
                  // Map headers
                  const headers = new Headers();
                  for (const [key, value] of Object.entries(req.headers)) {
                    if (value) {
                      if (Array.isArray(value)) {
                        value.forEach(v => headers.append(key, v));
                      } else {
                        headers.set(key, value);
                      }
                    }
                  }

                  // Create standard Web API Request
                  const webReq = new Request(url, {
                    method: 'POST',
                    headers: headers,
                    body: body || null
                  });

                  // Execute the edge handler
                  const webRes = await POST(webReq);

                  // Set status code
                  res.statusCode = webRes.status;

                  // Set response headers
                  webRes.headers.forEach((value, key) => {
                    res.setHeader(key, value);
                  });

                  // Read response body stream and write to Node's ServerResponse
                  const resBody = await webRes.text();
                  res.end(resBody);
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
  };
});
