# 🚀 Deploy to Render - Complete Guide

This guide will help you deploy both the backend and frontend of your Job Tracker application to Render.

## 📋 Prerequisites

- GitHub account with your repository pushed
- Render account - [Sign up here](https://render.com) (Free tier available!)
- MongoDB Atlas account (for database) - [Sign up here](https://www.mongodb.com/cloud/atlas)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Create"** → **"Cluster"**
4. Choose **"Free"** tier (M0)
5. Select a cloud provider and region (closest to you)
6. Click **"Create Cluster"**

### 1.2 Configure Database Access

1. Go to **"Database Access"** → **"Add New Database User"**
2. Choose **"Password"** authentication
3. Create a username and strong password
4. Set privileges to **"Read and write to any database"**
5. Click **"Add User"**

### 1.3 Configure Network Access

1. Go to **"Network Access"** → **"Add IP Address"**
2. Click **"Allow Access from Anywhere"** (for Render deployment)
   - Or add Render's IP ranges if you prefer
3. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Replace `<password>` with your actual password
5. Add database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/job-tracker`
6. **Save this connection string** - you'll need it for Render!

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `CodeZettaa/Job-Tracker-application-full-stack`

### 2.2 Configure Backend Service

Fill in the following settings:

- **Name:** `job-tracker-backend` (or your preferred name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install && NODE_OPTIONS=--max-old-space-size=2048 npm run build`
- **Start Command:** `npm run start:prod`
- **Plan:** `Free` (or choose a paid plan)

### 2.3 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```
NODE_ENV=production
PORT=10000
NODE_OPTIONS=--max-old-space-size=1024
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGINS=https://your-frontend.onrender.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker
```

**To generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

**Important:**
- Replace `your-super-secret-jwt-key-here` with a strong random string
- Replace `mongodb+srv://...` with your actual MongoDB connection string from Step 1.4
- Replace `https://your-frontend.onrender.com` with your frontend URL (you'll update this after deploying frontend)

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying your backend
3. Wait for deployment to complete (usually 2-5 minutes)
4. **Copy your backend URL** (e.g., `https://job-tracker-backend.onrender.com`)

---

## 🌐 Step 3: Deploy Frontend to Render

### 3.1 Create Frontend Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub account if needed
3. Select your repository: `CodeZettaa/Job-Tracker-application-full-stack`

### 3.2 Configure Frontend Service

Fill in the following settings:

- **Name:** `job-tracker-frontend` (or your preferred name)
- **Branch:** `main`
- **Root Directory:** `frontend`
- **Build Command:** `npm install && NODE_OPTIONS=--max-old-space-size=4096 npm run build:render`
- **Publish Directory:** `dist/job-tracker-frontend/browser`
- **Plan:** `Free`

### 3.3 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```
NODE_OPTIONS=--max-old-space-size=4096
API_URL=https://your-backend.onrender.com
```

**Important:**
- Replace `https://your-backend.onrender.com` with your actual backend URL from Step 2.4

### 3.4 Deploy

1. Click **"Create Static Site"**
2. Render will start building and deploying your frontend
3. Wait for deployment to complete (usually 2-5 minutes)
4. **Copy your frontend URL** (e.g., `https://job-tracker-frontend.onrender.com`)

---

## 🔄 Step 4: Update CORS Settings

After getting your frontend URL, update the backend CORS:

1. Go to Render Dashboard → Your backend service
2. Go to **"Environment"** tab
3. Update `CORS_ORIGINS` to your frontend URL:
   ```
   CORS_ORIGINS=https://job-tracker-frontend.onrender.com
   ```
4. Click **"Save Changes"** - Render will automatically redeploy

---

## 🔐 Step 5: Configure GitHub Actions (Optional)

If you want automatic deployments via GitHub Actions, you can set up Render webhooks or use Render's built-in auto-deploy (enabled by default).

### Option A: Use Render's Auto-Deploy (Recommended)

Render automatically deploys when you push to your main branch. No GitHub Actions needed!

### Option B: Use GitHub Actions with Render API

1. Go to Render Dashboard → **Account Settings** → **API Keys**
2. Click **"Create API Key"** → Name it "GitHub Actions" → **Copy the key**
3. In GitHub, go to your repository → **Settings** → **Secrets and variables** → **Actions**
4. Add secret: `RENDER_API_KEY` = Your Render API key
5. Add secret: `RENDER_SERVICE_ID_BACKEND` = Your backend service ID
6. Add secret: `RENDER_SERVICE_ID_FRONTEND` = Your frontend service ID

---

## ✅ Step 6: Test Your Deployment

1. **Frontend URL:** Visit your Render frontend URL
2. **Backend URL:** Test with `https://your-backend.onrender.com` (should show NestJS welcome or your API)

Try:
- Register a new account
- Login
- Create a job application
- View your job list

---

## 📝 Step 7: Add to Your Portfolio

Once everything is working, add these links to your portfolio:

### Live Application:
```
Frontend: https://job-tracker-frontend.onrender.com
Backend API: https://job-tracker-backend.onrender.com
```

### Repository:
```
GitHub: https://github.com/CodeZettaa/Job-Tracker-application-full-stack
```

### Tech Stack:
- **Frontend:** Angular 19, TypeScript, RxJS
- **Backend:** NestJS, TypeScript, MongoDB
- **Authentication:** JWT
- **Deployment:** Render (Full Stack)
- **Database:** MongoDB Atlas

---

## 🐛 Troubleshooting

### Backend not connecting?
- Check that `CORS_ORIGINS` includes your frontend URL
- Verify `MONGODB_URI` is correct and accessible
- Check Render logs for errors (Dashboard → Your service → Logs)

### Frontend not loading?
- Verify `API_URL` environment variable is set correctly
- Check that build completed successfully
- Check Render logs for build errors

### Database connection issues?
- Verify MongoDB Atlas network access allows Render IPs
- Check that MongoDB connection string is correct
- Ensure database user has proper permissions

### Build failures?
- Check that all dependencies are in package.json
- Verify build commands are correct
- Check Render logs for specific error messages

---

## 💡 Render Free Tier Notes

- **Spins down after 15 minutes of inactivity** - First request may take 30-60 seconds
- **750 hours/month free** - Enough for personal projects
- **Auto-deploy on git push** - Enabled by default
- **Custom domains** - Available on free tier
- **SSL/HTTPS** - Included automatically

---

## 🎉 You're Done!

Your fullstack application is now live on Render and ready to showcase in your portfolio!

**Need help?** Check the logs in Render dashboard for detailed error messages.

