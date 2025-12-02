# 🔧 Fix: "Cannot find module dist/main" Error on Render

## The Problem

The error shows:

```
Error: Cannot find module '/opt/render/project/src/backend/dist/main'
```

This means the build either:

1. **Failed silently** (build command didn't complete)
2. **Output is in wrong location** (dist folder not created)
3. **Start command running from wrong directory**

## ✅ Solution: Fix Build and Start Commands

### Step 1: Update Build Command in Render Dashboard

1. Go to **Render Dashboard** → Your Backend Service
2. Click **Settings** tab
3. Find **Build Command** field
4. **Update it to:**

   ```bash
   cd backend && npm install && NODE_OPTIONS=--max-old-space-size=2048 npm run build && ls -la dist/
   ```

   The `ls -la dist/` at the end will verify the build output exists.

5. Click **Save Changes**

### Step 2: Update Start Command

1. In the same **Settings** tab
2. Find **Start Command** field
3. **Update it to:**

   ```bash
   cd backend && node dist/main.js
   ```

   Note: Use `dist/main.js` (with .js extension) instead of just `dist/main`

4. Click **Save Changes**

### Step 3: Verify Root Directory

Make sure **Root Directory** is set to:

```
backend
```

## 🔍 Alternative: If Root Directory is NOT Set

If you're NOT using Root Directory (building from repo root):

**Build Command:**

```bash
cd backend && npm install && NODE_OPTIONS=--max-old-space-size=2048 npm run build && ls -la backend/dist/
```

**Start Command:**

```bash
cd backend && node dist/main.js
```

## 🐛 Troubleshooting

### Issue 1: Build Still Fails

Check the build logs in Render. Look for:

- TypeScript compilation errors
- Missing dependencies
- Memory errors during build

### Issue 2: dist/main.js Still Not Found

1. **Check build logs** - Look for "Build successful" message
2. **Verify nest-cli.json** - Should have `"deleteOutDir": true`
3. **Check tsconfig.json** - Should have `"outDir": "./dist"`

### Issue 3: Build Succeeds But Start Fails

Try using absolute path in start command:

```bash
cd /opt/render/project/src/backend && node dist/main.js
```

Or verify the working directory:

```bash
cd backend && pwd && ls -la dist/ && node dist/main.js
```

## 📝 Complete Configuration

**Settings Tab:**

- **Root Directory:** `backend`
- **Build Command:** `cd backend && npm install && NODE_OPTIONS=--max-old-space-size=2048 npm run build && ls -la dist/`
- **Start Command:** `cd backend && node dist/main.js`
- **Environment:** `Node`

**Environment Tab:**

- `NODE_ENV=production`
- `PORT=10000`
- `NODE_OPTIONS=--max-old-space-size=1024`
- `JWT_SECRET=...`
- `CORS_ORIGINS=...`
- `MONGODB_URI=...`

## ✅ Verification Steps

After updating:

1. **Watch the build** in Events tab
2. **Look for:** `Build successful 🎉`
3. **Check for:** `ls -la dist/` output showing files
4. **Verify:** `dist/main.js` exists in the output
5. **Start should show:** `🚀 Backend server running on port 10000`

## 🎯 Why This Happens

- Build might fail due to memory issues (fixed with NODE_OPTIONS)
- Build might complete but dist folder gets cleaned
- Start command might run before build completes
- Path resolution issues with relative paths

The fix ensures:

1. Build completes successfully
2. Build output is verified
3. Start command uses correct path with .js extension

---

**After fixing, your app should deploy successfully!** 🎉

