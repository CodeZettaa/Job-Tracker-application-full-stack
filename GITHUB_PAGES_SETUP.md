# 🚀 GitHub Pages Deployment - Quick Setup Guide

This is a quick reference guide to deploy your frontend to GitHub Pages.

## ✅ Pre-Deployment Checklist

- [x] GitHub repository is set up
- [x] Frontend code is pushed to `main` branch
- [x] Backend is deployed and URL is known
- [x] GitHub Actions workflow is configured

## 📋 Step-by-Step Setup

### Step 1: Enable GitHub Pages

1. Go to your repository: `https://github.com/CodeZettaa/Job-Tracker-application-full-stack`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. Click **Save**

### Step 2: Set API URL Secret (Recommended)

1. In your repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `API_URL`
4. Value: `https://job-tracker-application-full-stack.onrender.com`
5. Click **Add secret**

### Step 3: Update Backend CORS

In your Render dashboard (backend service):

1. Go to **Environment** tab
2. Find `CORS_ORIGINS` variable
3. Set value to:
   ```
   https://CodeZettaa.github.io/Job-Tracker-application-full-stack/
   ```
4. Click **Save Changes**

### Step 4: Trigger Deployment

**Option A: Automatic (Recommended)**
- Push any change to the `frontend/` directory
- The workflow will automatically trigger

**Option B: Manual**
1. Go to **Actions** tab in your repository
2. Select **Deploy Frontend to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### Step 5: Access Your Site

After deployment completes (usually 2-5 minutes), your site will be live at:

```
https://CodeZettaa.github.io/Job-Tracker-application-full-stack/
```

## 🔍 Verify Deployment

1. Go to **Actions** tab in your repository
2. Check the latest workflow run
3. Look for a green checkmark ✅
4. Click on the workflow to see build logs if needed

## 📝 Important URLs

- **Frontend (GitHub Pages):** `https://CodeZettaa.github.io/Job-Tracker-application-full-stack/`
- **Backend (Render):** `https://job-tracker-application-full-stack.onrender.com`
- **Repository:** `https://github.com/CodeZettaa/Job-Tracker-application-full-stack`

## 🐛 Troubleshooting

### Workflow Not Running?

- Check that GitHub Pages is enabled with "GitHub Actions" as source
- Verify the workflow file exists: `.github/workflows/deploy-frontend-gh-pages.yml`
- Make sure you're pushing to the `main` branch

### Build Fails?

- Check the **Actions** tab for error logs
- Verify Node.js version (should be 20)
- Ensure all dependencies are in `package.json`

### 404 Errors?

- Verify `baseHref` is set to `/Job-Tracker-application-full-stack/`
- Check that routes are working (try navigating directly to a route)

### API Not Connecting?

- Verify `CORS_ORIGINS` in backend includes GitHub Pages URL
- Check that `API_URL` secret is set correctly
- Test backend directly: `https://job-tracker-application-full-stack.onrender.com`

## 🔄 Update Your Site

To update your deployed site:

```bash
# Make changes to frontend
git add .
git commit -m "Update frontend"
git push origin main
```

The GitHub Action will automatically rebuild and redeploy!

## 📚 Additional Resources

- Full deployment guide: [GITHUB_PAGES_DEPLOY.md](./GITHUB_PAGES_DEPLOY.md)
- Render deployment: [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

---

**Need help?** Check the workflow logs in the **Actions** tab for detailed error messages.


