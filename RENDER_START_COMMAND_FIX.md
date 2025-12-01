# 🔧 Fix: "No open ports detected" Error on Render

If you're getting `==> No open ports detected` and `==> Running 'npm start'`, Render is using the wrong start command.

## ✅ Quick Fix: Update Start Command in Render Dashboard

### Step 1: Update Backend Service Settings

1. Go to **Render Dashboard** → Your Backend Service
2. Click **Settings** tab
3. Find **Start Command** field
4. **Change it from:**
   ```
   npm start
   ```
   **To:**
   ```
   npm run start:prod
   ```
   Or if using root directory:
   ```
   cd backend && npm run start:prod
   ```

5. **Also verify Build Command is:**
   ```
   cd backend && npm install && NODE_OPTIONS=--max-old-space-size=2048 npm run build
   ```

6. Click **Save Changes** - Render will automatically redeploy

### Step 2: Verify Environment Variables

Make sure these are set in **Environment** tab:

```
NODE_ENV=production
PORT=10000
NODE_OPTIONS=--max-old-space-size=1024
JWT_SECRET=your-secret-here
CORS_ORIGINS=https://your-frontend.onrender.com
MONGODB_URI=mongodb+srv://...
```

**Important:** The `PORT` variable is crucial - Render will set it automatically, but having it as a fallback helps.

### Step 3: Verify Root Directory

Make sure **Root Directory** is set to:
```
backend
```

## 🔍 Why This Happens

- `npm start` runs `nest start` (development mode) which doesn't work well in production
- `npm run start:prod` runs `node dist/main` (production mode) which is what you need
- Render might auto-detect `npm start` if start command isn't explicitly set

## ✅ Verification

After updating:

1. Go to **Events** tab
2. Watch the deployment
3. You should see: `==> Running 'npm run start:prod'` or `==> Running 'cd backend && npm run start:prod'`
4. The app should start and bind to the port correctly

## 🐛 Still Having Issues?

### Issue 1: Port Still Not Detected

Check that your `main.ts` uses the PORT environment variable:

```typescript
const port = process.env.PORT || 3000;
await app.listen(port);
```

### Issue 2: Service Keeps Restarting

- Check **Logs** tab for error messages
- Verify MongoDB connection string is correct
- Check that all environment variables are set

### Issue 3: Build Succeeds but Start Fails

- Make sure `dist/main.js` exists after build
- Check that `start:prod` script in package.json is: `node dist/main`
- Verify you're in the `backend` directory when running the command

## 📝 Complete Render Service Configuration

Here's what your backend service should look like:

**Settings Tab:**
- **Name:** `job-tracker-backend`
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install && NODE_OPTIONS=--max-old-space-size=2048 npm run build`
- **Start Command:** `npm run start:prod`
- **Plan:** `Free` (or your chosen plan)

**Environment Tab:**
- `NODE_ENV=production`
- `PORT=10000`
- `NODE_OPTIONS=--max-old-space-size=1024`
- `JWT_SECRET=...`
- `CORS_ORIGINS=...`
- `MONGODB_URI=...`

---

**After fixing, your service should deploy successfully!** 🎉

