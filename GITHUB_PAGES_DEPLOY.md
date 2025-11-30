# Deploy Frontend to GitHub Pages

This guide will help you deploy the Angular frontend to GitHub Pages.

## 🚀 Quick Setup

### Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/CodeZettaa/Job-Tracker-application-full-stack
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Save the settings

### Step 2: Set Environment Variable (Optional)

If you have a deployed backend, set the API URL:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `API_URL`
4. Value: Your backend URL (e.g., `https://your-backend.railway.app`)
5. Click **Add secret**

### Step 3: Trigger Deployment

The deployment will automatically trigger when you:
- Push changes to the `main` branch that affect the `frontend/` directory
- Or manually trigger it from the **Actions** tab

### Step 4: Access Your Site

After deployment completes, your site will be available at:
```
https://CodeZettaa.github.io/Job-Tracker-application-full-stack/
```

## 📝 Manual Deployment

If you want to build and deploy manually:

```bash
cd frontend
npm install
npm run build -- --base-href=/Job-Tracker-application-full-stack/
```

Then commit the `dist` folder and push to a `gh-pages` branch (not recommended, use GitHub Actions instead).

## ⚙️ Configuration

### Base Href

The `baseHref` is set to `/Job-Tracker-application-full-stack/` in:
- `angular.json` (production configuration)
- GitHub Actions workflow

If you change your repository name, update:
1. `angular.json` - `baseHref` in production config
2. `.github/workflows/deploy-frontend-gh-pages.yml` - `--base-href` flag

### Environment Variables

The workflow uses `API_URL` secret if set, otherwise defaults to `http://localhost:3000`.

To update the API URL:
1. Set `API_URL` secret in repository settings
2. Or update `frontend/src/environments/environment.prod.ts` directly

## 🔧 Troubleshooting

### Build Fails

- Check Node.js version (should be 20)
- Verify all dependencies are installed
- Check for TypeScript errors: `cd frontend && npm run build`

### 404 Errors on Routes

- Ensure `baseHref` is correctly set
- GitHub Pages serves static files, so Angular routing needs proper configuration
- The workflow already sets the correct `baseHref`

### API Connection Issues

- Verify `API_URL` secret is set correctly
- Check CORS settings on your backend
- Ensure backend allows requests from `https://CodeZettaa.github.io`

### Deployment Not Triggering

- Check that GitHub Actions is enabled
- Verify the workflow file is in `.github/workflows/`
- Check that you're pushing to the `main` branch
- Ensure changes are in the `frontend/` directory

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular Deployment Guide](https://angular.io/guide/deployment)

## 🔄 Update Deployment

After making changes to the frontend:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

The GitHub Action will automatically build and deploy your changes.

