# Deployment Guide

This guide will help you deploy both the frontend and backend of the Job Tracker application.

## 📋 Prerequisites

- GitHub account
- Node.js installed locally
- Git installed

## 🚀 Step 1: Push to GitHub

### 1.1 Initialize Git Repository

```bash
cd /Users/nourhansaieedadmin/Documents/codeZetta/protoflio_code/fullstack-job-tracker
git init
git add .
git commit -m "Initial commit: Fullstack Job Tracker with Auth"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `fullstack-job-tracker` (or your preferred name)
3. **Don't** initialize with README, .gitignore, or license (we already have these)

### 1.3 Push to GitHub

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fullstack-job-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy Backend (NestJS)

### Option A: Railway (Recommended - Free tier available)

1. **Sign up** at [Railway](https://railway.app)
2. **Create New Project** → "Deploy from GitHub repo"
3. **Select your repository** → Choose `backend` folder
4. **Configure Environment Variables:**
   - `PORT` = `3000` (Railway will set this automatically)
   - `JWT_SECRET` = Generate a strong secret (e.g., use `openssl rand -base64 32`)
   - `CORS_ORIGINS` = Your frontend URL (e.g., `https://your-frontend.vercel.app`)
   - `NODE_ENV` = `production`
5. **Deploy** - Railway will automatically:
   - Install dependencies
   - Build the project
   - Start the server
6. **Copy your backend URL** (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Sign up** at [Render](https://render.com)
2. **New** → **Web Service**
3. **Connect GitHub repository**
4. **Configure:**
   - **Name:** `job-tracker-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
5. **Add Environment Variables:**
   - `JWT_SECRET` = Your secret key
   - `CORS_ORIGINS` = Your frontend URL
6. **Deploy**

### Option C: Heroku

1. **Install Heroku CLI** and login
2. **Create Heroku app:**
   ```bash
   cd backend
   heroku create your-app-name
   ```
3. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set CORS_ORIGINS=https://your-frontend.vercel.app
   ```
4. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

## 🎨 Step 3: Deploy Frontend (Angular)

### Option A: Vercel (Recommended - Free tier available)

1. **Sign up** at [Vercel](https://vercel.com)
2. **Import Project** → Select your GitHub repository
3. **Configure Project:**
   - **Framework Preset:** Angular
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/job-tracker-frontend/browser`
4. **Environment Variables:**
   - `API_URL` = Your backend URL (e.g., `https://your-backend.railway.app`)
5. **Deploy** - Vercel will automatically deploy on every push to main

### Option B: Netlify

1. **Sign up** at [Netlify](https://netlify.com)
2. **New site from Git** → Connect GitHub
3. **Build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist/job-tracker-frontend/browser`
4. **Environment Variables:**
   - `API_URL` = Your backend URL
5. **Deploy**

### Option C: GitHub Pages

1. **Update `angular.json`** to set `baseHref`:
   ```json
   "baseHref": "/fullstack-job-tracker/",
   ```
2. **Build:**
   ```bash
   cd frontend
   npm run build -- --base-href=/fullstack-job-tracker/
   ```
3. **Deploy to GitHub Pages** using GitHub Actions (see `.github/workflows/deploy.yml`)

## ⚙️ Step 4: Update Frontend API URL

After deploying the backend, update the frontend environment file:

1. **Edit `frontend/src/environments/environment.prod.ts`:**
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-backend-url.railway.app', // Replace with your backend URL
   };
   ```

2. **Or use environment variables in your deployment platform:**
   - Vercel: Add `API_URL` in project settings
   - Update `environment.prod.ts` to read from `process.env['API_URL']`

## 🔒 Step 5: Update CORS Settings

After deploying the frontend, update the backend CORS settings:

1. **In your backend deployment platform, add/update:**
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```

2. **Restart the backend** to apply changes

## 📝 Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed and running
- [ ] Backend URL copied
- [ ] Frontend environment updated with backend URL
- [ ] Frontend deployed
- [ ] Frontend URL copied
- [ ] Backend CORS updated with frontend URL
- [ ] Test authentication flow
- [ ] Test CRUD operations

## 🧪 Testing Deployment

1. **Test Backend:**
   ```bash
   curl https://your-backend.railway.app/jobs
   ```

2. **Test Frontend:**
   - Visit your frontend URL
   - Try registering a new user
   - Create a job application
   - Verify all features work

## 🔧 Troubleshooting

### Backend Issues

- **Port not found:** Make sure `PORT` environment variable is set
- **CORS errors:** Verify `CORS_ORIGINS` includes your frontend URL
- **JWT errors:** Ensure `JWT_SECRET` is set and consistent

### Frontend Issues

- **API connection failed:** Check `API_URL` in environment files
- **Build errors:** Ensure all dependencies are in `package.json`
- **Routing issues:** Verify `baseHref` is set correctly for your deployment

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [NestJS Deployment](https://docs.nestjs.com/recipes/deployment)
- [Angular Deployment](https://angular.io/guide/deployment)

