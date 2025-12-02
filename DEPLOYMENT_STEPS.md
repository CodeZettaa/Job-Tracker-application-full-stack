# 🚀 Deployment Steps - Get Your App Live!

Follow these steps to deploy your Job Tracker application and get the links for your portfolio.

## 📋 Prerequisites

- GitHub account with your repository pushed
- Railway account (for backend) - [Sign up here](https://railway.app)
- Vercel account (for frontend) - [Sign up here](https://vercel.com)

---

## 🔧 Step 1: Deploy Backend to Railway

### 1.1 Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository: `CodeZettaa/Job-Tracker-application-full-stack`
4. Railway will detect the project automatically

### 1.2 Configure Backend Service

1. In Railway dashboard, click **"New"** → **"Service"**
2. Select **"GitHub Repo"** → Choose your repository
3. In the service settings:
   - **Root Directory:** Set to `backend`
   - **Build Command:** `npm install && npm run build` (or leave default)
   - **Start Command:** `npm run start:prod`

### 1.3 Set Environment Variables

In Railway service settings, go to **"Variables"** and add:

```
JWT_SECRET=your-super-secret-jwt-key-here-generate-with-openssl-rand-base64-32
CORS_ORIGINS=https://your-frontend.vercel.app
NODE_ENV=production
```

**To generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

### 1.4 Get Your Backend URL

1. Once deployed, Railway will provide a URL like: `https://your-app-name.up.railway.app`
2. **Copy this URL** - you'll need it for the frontend!

### 1.5 Get Railway Token and Service ID (for GitHub Actions)

1. Go to Railway dashboard → **Settings** → **Tokens**
2. Click **"New Token"** → Name it "GitHub Actions" → **Copy the token**
3. Go to your service → **Settings** → **General**
4. **Copy the Service ID** (it's in the service URL or settings)

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `CodeZettaa/Job-Tracker-application-full-stack`
4. Configure the project:
   - **Framework Preset:** Angular
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build:prod` (already set in vercel.json)
   - **Output Directory:** `dist/job-tracker-frontend/browser`

### 2.2 Set Environment Variables

In Vercel project settings → **Environment Variables**, add:

```
API_URL=https://your-backend-url.railway.app
```

(Replace with your actual Railway backend URL from Step 1.4)

### 2.3 Deploy

Click **"Deploy"** - Vercel will build and deploy your frontend!

### 2.4 Get Your Frontend URL

1. After deployment, Vercel will provide a URL like: `https://your-app-name.vercel.app`
2. **Copy this URL** - this is your live app! 🎉

### 2.5 Get Vercel Credentials (for GitHub Actions)

1. Go to Vercel dashboard → **Settings** → **Tokens**
2. Click **"Create Token"** → Name it "GitHub Actions" → **Copy the token**
3. In your project → **Settings** → **General**
4. **Copy the Project ID** and **Organization ID**

---

## 🔐 Step 3: Configure GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

### For Backend Deployment:
- `RAILWAY_TOKEN` - Your Railway token from Step 1.5
- `RAILWAY_SERVICE_ID` - Your Railway service ID from Step 1.5

### For Frontend Deployment:
- `API_URL` - Your Railway backend URL (e.g., `https://your-app.up.railway.app`)
- `VERCEL_TOKEN` - Your Vercel token from Step 2.5
- `VERCEL_ORG_ID` - Your Vercel organization ID from Step 2.5
- `VERCEL_PROJECT_ID` - Your Vercel project ID from Step 2.5

---

## 🔄 Step 4: Update Backend CORS

After getting your frontend URL, update the backend CORS settings:

1. Go back to Railway → Your backend service → **Variables**
2. Update `CORS_ORIGINS` to include your Vercel URL:
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```
3. Railway will automatically redeploy

---

## ✅ Step 5: Test Your Deployment

1. **Frontend URL:** Visit your Vercel URL
2. **Backend URL:** Test with `https://your-backend.railway.app/health` (if you have a health endpoint)

Try:
- Register a new account
- Login
- Create a job application
- View your job list

---

## 📝 Step 6: Add to Your Portfolio

Once everything is working, you can add these links to your portfolio:

### Live Application:
```
Frontend: https://your-app-name.vercel.app
```

### Repository:
```
GitHub: https://github.com/CodeZettaa/Job-Tracker-application-full-stack
```

### Tech Stack:
- **Frontend:** Angular 19, TypeScript, RxJS
- **Backend:** NestJS, TypeScript, MongoDB
- **Authentication:** JWT
- **Deployment:** Vercel (Frontend), Railway (Backend)

---

## 🐛 Troubleshooting

### Backend not connecting?
- Check that `CORS_ORIGINS` includes your frontend URL
- Verify `API_URL` in Vercel matches your Railway backend URL
- Check Railway logs for errors

### Frontend build failing?
- Ensure `API_URL` secret is set in GitHub/Vercel
- Check that the build script has proper permissions

### GitHub Actions failing?
- Verify all secrets are set correctly
- Check that Railway token has proper permissions
- Ensure service IDs are correct

---

## 🎉 You're Done!

Your fullstack application is now live and ready to showcase in your portfolio!

**Need help?** Check the logs in Railway and Vercel dashboards for detailed error messages.


