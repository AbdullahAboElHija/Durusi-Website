---
name: external-deployment
description: Deploy the Durusi (دروسي) app on external hosting services like Railway, Render, VPS, Vercel, or DigitalOcean. Use when you need instructions for deploying outside of Replit.
---

# External Deployment Guide — دروسي (Durusi)

## Prerequisites

- **Node.js** v20 or higher
- **npm** v9 or higher
- A **MongoDB Atlas** cluster (or any MongoDB instance)
- Git repository with the project code

## Environment Variables

Set these on every hosting platform:

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/durusi`) |
| `ADMIN_PASSWORD` | Yes | Password for the admin dashboard at `/admin` |
| `PORT` | Depends | Server port — some platforms set this automatically |
| `NODE_ENV` | No | Set to `production` for optimized builds (set automatically by build script) |

## Build & Run Commands

```bash
# Install dependencies
npm install

# Build the app (compiles frontend + backend into dist/)
npm run build

# Start production server
npm start
```

- `npm run build` creates a `dist/` folder with:
  - `dist/index.cjs` — bundled Express server
  - `dist/public/` — compiled React frontend (static files)
- `npm start` runs `NODE_ENV=production node dist/index.cjs`
- The server serves both the API and the frontend on a single port

## Platform-Specific Instructions

---

### Railway

1. Push your code to a GitHub repository
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub repo
3. Railway auto-detects Node.js — set the following:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Go to **Variables** tab and add:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `ADMIN_PASSWORD` — your chosen admin password
5. Railway automatically assigns `PORT` — no need to set it
6. Deploy — Railway gives you a `.up.railway.app` URL

---

### Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service → connect your repo
3. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Go to **Environment** and add:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
5. Render automatically sets `PORT` — no need to add it
6. Deploy — Render gives you a `.onrender.com` URL

> Note: On the free tier, Render spins down after inactivity. First request after sleep may take 30-60 seconds.

---

### VPS / Linux Server (Ubuntu/Debian)

#### 1. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 2. Clone and build

```bash
git clone <your-repo-url> /opt/durusi
cd /opt/durusi
npm install
npm run build
```

#### 3. Set environment variables

Create a file `/opt/durusi/.env`:

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/durusi
ADMIN_PASSWORD=your_secure_password
PORT=3000
```

Or export them in your shell / systemd service file.

#### 4. Run with PM2 (recommended)

```bash
sudo npm install -g pm2

# Start the app
cd /opt/durusi
PORT=3000 MONGODB_URI="..." ADMIN_PASSWORD="..." pm2 start dist/index.cjs --name durusi

# Auto-restart on reboot
pm2 startup
pm2 save
```

#### 5. Reverse proxy with Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then enable HTTPS with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

### Vercel

> Vercel is optimized for serverless. This app uses a long-running Express server, so Vercel is **not the ideal choice**. Use Railway or Render instead for best results.

If you still want to use Vercel, you would need to:
1. Separate the frontend (deploy as a static Vite site)
2. Convert the backend to serverless API functions in `/api/` directory
3. This requires significant restructuring and is not recommended

---

### DigitalOcean App Platform

1. Push your code to GitHub
2. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com) → Apps → Create App → connect your repo
3. Configure:
   - **Type**: Web Service
   - **Build Command**: `npm install && npm run build`
   - **Run Command**: `npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
5. DigitalOcean sets `PORT` automatically
6. Deploy — you get a `.ondigitalocean.app` URL

---

## MongoDB Atlas — Important Notes

### IP Whitelist

Your MongoDB Atlas cluster must allow connections from your hosting platform's IP addresses:

- **For Railway / Render / DigitalOcean**: IPs change dynamically. Go to MongoDB Atlas → Network Access → Add `0.0.0.0/0` (allow from anywhere). This is safe as long as you use a strong database password.
- **For VPS**: Add your server's static IP to the whitelist for better security.

### Database Name

The database name is `durusi` (included in the connection string). Make sure your `MONGODB_URI` ends with `/durusi`, for example:

```
mongodb+srv://user:pass@cluster0.abc123.mongodb.net/durusi
```

## Troubleshooting

| Problem | Solution |
|---|---|
| `MONGODB_URI must be set` | Environment variable not configured — add it in the platform's settings |
| `MongoDB connection error` | Check Atlas IP whitelist — add `0.0.0.0/0` for cloud platforms |
| App loads but no lessons appear | Ensure the database has seeded data with `status: "approved"` |
| Arabic text not rendering correctly | Cairo font loads from Google Fonts CDN — ensure outbound HTTPS is allowed |
| Admin login fails | Verify `ADMIN_PASSWORD` env var is set correctly on the platform |
| Port binding errors | Don't hardcode the port — the app reads from `PORT` env var, which most platforms set automatically |

## Seeding Data

If deploying to a fresh database, run the seed script after the first deployment:

```bash
# From the project root (with MONGODB_URI exported)
npx tsx server/seed.ts
```

This inserts sample lessons with `status: "approved"` so the app has initial content.
