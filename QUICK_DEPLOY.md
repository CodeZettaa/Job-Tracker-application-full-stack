# Quick Deployment Guide

## 🚀 Step-by-Step Deployment

### 1. Push to GitHub

```bash
cd /Users/nourhansaieedadmin/Documents/codeZetta/protoflio_code/fullstack-job-tracker

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Fullstack Job Tracker"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/fullstack-job-tracker.git
git branch -M main
git push -u origin main
```

### 2. Deploy Backend (Railway - Recommended)

1. **Go to [Railway.app](https://railway.app)** and sign up/login
2. **Click "New Project"** → **"Deploy from GitHub repo"**
3. **Select your repository** → **"Configure"**
4. **Set Root Directory:** `backend`
5. **Add Environment Variables:**
   ```
   JWT_SECRET=your-super-secret-key-here
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```
6. **Deploy** - Railway will auto-detect and build
7. **Copy your backend URL** (e.g., `https://your-app.railway.app`)

### 3. Deploy Frontend (Vercel - Recommended)

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login
2. **Click "Add New"** → **"Project"**
3. **Import your GitHub repository**
4. **Configure:**
   - **Framework Preset:** Angular
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/job-tracker-frontend/browser`
5. **Environment Variables:**
   - `API_URL` = Your backend URL from Railway
6. **Deploy**

### 4. Update Frontend API URL

After deploying backend, update the frontend:

1. **Edit `frontend/src/environments/environment.prod.ts`:**
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-backend.railway.app', // Your Railway URL
   };
   ```

2. **Commit and push:**
   ```bash
   git add frontend/src/environments/environment.prod.ts
   git commit -m "Update API URL for production"
   git push
   ```

3. **Vercel will automatically redeploy**

### 5. Update Backend CORS

After deploying frontend, update backend CORS:

1. **In Railway dashboard**, go to your service
2. **Add/Update Environment Variable:**
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```
3. **Redeploy** (Railway will auto-redeploy)

## ✅ Verification

1. **Test Backend:**
   ```bash
   curl https://your-backend.railway.app/jobs
   ```

2. **Test Frontend:**
   - Visit your Vercel URL
   - Register a new account
   - Create a job application
   - Verify everything works

## 🔐 Security Notes

- **Never commit** `.env` files
- **Use strong JWT_SECRET** (generate with: `openssl rand -base64 32`)
- **Update CORS_ORIGINS** to only allow your frontend domain
- **Use HTTPS** in production

## 📚 Alternative Platforms

**Backend:**
- **Render:** Similar to Railway, free tier available
- **Heroku:** Requires credit card for free tier
- **Fly.io:** Good alternative with free tier

**Frontend:**
- **Netlify:** Great alternative to Vercel
- **GitHub Pages:** Free but requires GitHub Actions setup
- **Cloudflare Pages:** Fast CDN, free tier

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

