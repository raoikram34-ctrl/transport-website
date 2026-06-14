# Skyhaul Server Security Configurations

This directory contains modular server configuration templates to harden your deployment environment. These files are designed to protect the application from common vulnerabilities, enforce SSL, configure compression, and block access to sensitive files.

## 📁 Directory Structure

- `apache.htaccess`: For Apache / LiteSpeed web servers (common in A2 Hosting and cPanel environments).
- `nginx.conf`: For Nginx web servers (standard virtual host server block).
- `vercel.json`: For serverless deployment environments (Vercel, Netlify, AWS Amplify).

---

## 🚀 Environment Adaptation Guide

### 1. Apache / LiteSpeed (A2 Hosting, cPanel)
To use the Apache rules, copy `apache.htaccess` to the `public/` directory of your Next.js application, renaming it to `.htaccess`:
```bash
cp server-configs/apache.htaccess public/.htaccess
```
Next.js will copy files from the `public/` directory to the root of the build output, making it active on the server.

### 2. Nginx
If you are deploying behind an Nginx reverse proxy (e.g., VPS, dedicated server, or Dockerized deployment):
1. Copy the server block from `server-configs/nginx.conf`.
2. Paste it into your Nginx site configuration (usually located in `/etc/nginx/sites-available/`).
3. Create a symlink to `/etc/nginx/sites-enabled/`.
4. Test the configuration (`sudo nginx -t`) and reload Nginx (`sudo systemctl reload nginx`).

### 3. Serverless (Vercel, Netlify, AWS)
When deploying to serverless platforms, security headers and compression are typically managed in one of two ways:
1. **Next.js config (Active by default)**: Next.js has native support for headers via `next.config.ts` (configured in the root). Next.js automatically maps these configurations to Vercel/Netlify routing tables during build.
2. **Platform Configuration**: If you prefer to manage them at the platform level (bypassing Next.js routing code), place the `vercel.json` file in the root directory of your project.

---

## 🔐 Key Hardening Measures Implemented

1. **HTTPS Enforcement**: Automatic redirection from HTTP to HTTPS.
2. **Directory Listing Disabled**: Prevents clients from listing directory contents (`Options -Indexes` or `autoindex off`).
3. **Sensitive File Protection**: Denies all access to `.env`, `.git`, `package.json`, `package-lock.json`, and Next.js config files.
4. **Security Headers**: Double-layer enforcement (via server configurations + Next.js middleware) of:
   - `Strict-Transport-Security` (HSTS)
   - `X-Frame-Options` (Clickjacking defense)
   - `X-Content-Type-Options` (MIME sniffing defense)
   - `Referrer-Policy` (Privacy protection)
   - `Permissions-Policy` (Feature control)
5. **Compression**: Gzip/Deflate optimization rules to reduce latency and bandwidth.
