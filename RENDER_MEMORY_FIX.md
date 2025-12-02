# 🔧 Fix: JavaScript Heap Out of Memory Error on Render

If you're getting `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory` on Render, follow these steps:

## ✅ Solution: Update Build Commands in Render Dashboard

### For Backend Service:

1. Go to your Render Dashboard → Backend Service → **Settings**
2. Find **Build Command** and update it to:
   ```bash
   npm install && NODE_OPTIONS=--max-old-space-size=2048 npm run build
   ```

3. Go to **Environment** tab and add:
   ```
   NODE_OPTIONS=--max-old-space-size=1024
   ```

4. Click **Save Changes** - Render will redeploy

### For Frontend Service:

1. Go to your Render Dashboard → Frontend Service → **Settings**
2. Find **Build Command** and update it to:
   ```bash
   npm install && NODE_OPTIONS=--max-old-space-size=4096 npm run build:render
   ```

3. Go to **Environment** tab and add:
   ```
   NODE_OPTIONS=--max-old-space-size=4096
   API_URL=https://job-tracker-application-full-stack.onrender.com
   ```

4. Click **Save Changes** - Render will redeploy

## 📝 What This Does

- **Backend:** Increases memory limit to 2GB during build, 1GB during runtime
- **Frontend:** Increases memory limit to 4GB during build (Angular builds are memory-intensive)

## 🔄 Alternative: Upgrade Render Plan

If you're on the **Free** plan and still having issues:

1. Consider upgrading to **Starter** plan ($7/month) which has more memory
2. Or optimize your build further (see below)

## 🚀 Additional Optimizations

### Option 1: Use render.yaml (Recommended)

The `render.yaml` file has been updated with memory limits. If you're using it:

1. Make sure `render.yaml` is in your repository root
2. Render should automatically use it
3. Or manually sync it from the Render dashboard

### Option 2: Optimize Angular Build

You can also reduce memory usage by:

1. Building with production optimizations only
2. Disabling source maps (if not needed)
3. Using incremental builds

## ✅ Verification

After updating:

1. Go to **Events** tab in Render
2. Watch the build process
3. It should complete without memory errors
4. Check logs for any other issues

## 🐛 Still Having Issues?

If you're still getting memory errors:

1. **Check Render logs** for the exact error
2. **Try increasing memory further:**
   - Backend build: `--max-old-space-size=3072` (3GB)
   - Frontend build: `--max-old-space-size=6144` (6GB)
3. **Consider splitting the build:**
   - Build locally and commit the `dist` folder
   - Or use a CI/CD service with more memory

## 📚 Related Files

- `render.yaml` - Render configuration with memory limits
- `backend/package.json` - Backend build scripts
- `frontend/package.json` - Frontend build scripts with memory limits

---

**Note:** The free tier on Render has limited memory. For production apps, consider upgrading to a paid plan.


