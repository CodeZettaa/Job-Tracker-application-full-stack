# 🔧 How to Enable GitHub Pages - Step by Step

If you're getting the error: **"Get Pages site failed. Please verify that the repository has Pages enabled"**, follow these steps:

## ✅ Step 1: Enable GitHub Pages in Repository Settings

### Method 1: Via GitHub Web Interface (Recommended)

1. **Go to your repository:**
   ```
   https://github.com/CodeZettaa/Job-Tracker-application-full-stack
   ```

2. **Click on "Settings"** (top menu bar, next to "Insights")

3. **Scroll down in the left sidebar** and click on **"Pages"**

4. **Under "Source"**, you'll see a dropdown. Select:
   - **Source:** `GitHub Actions` ✅
   
   **NOT** "Deploy from a branch" - that's the old method!

5. **Click "Save"** (if there's a save button)

6. **Wait a few seconds** - GitHub needs to initialize Pages

### Method 2: Verify Pages is Enabled

After enabling, you should see:
- ✅ A message saying "Your site is ready to be published"
- ✅ Or "Your site is live at https://CodeZettaa.github.io/Job-Tracker-application-full-stack/"

## 🔍 Step 2: Verify Repository Permissions

Make sure your repository allows GitHub Actions:

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

3. Click **Save**

## 🚀 Step 3: Trigger the Workflow

After enabling Pages:

1. Go to **Actions** tab in your repository
2. You should see **"Deploy Frontend to GitHub Pages"** workflow
3. Click on it
4. Click **"Run workflow"** → **"Run workflow"** (dropdown button)
5. Wait for it to complete

## 📸 Visual Guide

```
Repository Settings
├── Pages (left sidebar)
│   └── Source: [GitHub Actions ▼]  ← Select this!
│       └── Save button
│
└── Actions → General
    └── Workflow permissions
        └── Read and write permissions ✅
```

## ⚠️ Common Issues

### Issue 1: "Pages" option not visible

**Solution:**
- Make sure you're the repository owner or have admin access
- Check that the repository is public (or you have GitHub Pro/Team for private repos)

### Issue 2: "GitHub Actions" not in Source dropdown

**Solution:**
- Make sure you're looking at the **Pages** settings, not Actions
- Try refreshing the page
- Make sure your repository supports GitHub Actions (most do)

### Issue 3: Still getting "Not Found" error

**Solution:**
1. Wait 1-2 minutes after enabling Pages
2. Try running the workflow again
3. Check that the workflow file exists: `.github/workflows/deploy-frontend-gh-pages.yml`
4. Verify you're on the `main` branch

### Issue 4: Repository is Private

**Solution:**
- GitHub Pages for private repos requires GitHub Pro/Team
- OR make the repository public (Settings → Danger Zone → Change visibility)

## ✅ Verification Checklist

Before running the workflow, verify:

- [ ] GitHub Pages is enabled (Settings → Pages → Source: GitHub Actions)
- [ ] Workflow permissions are set (Settings → Actions → General)
- [ ] Workflow file exists: `.github/workflows/deploy-frontend-gh-pages.yml`
- [ ] You're on the `main` branch
- [ ] Repository is public OR you have GitHub Pro/Team

## 🎯 Quick Fix Command

If you want to verify everything is set up correctly, check:

```bash
# Verify workflow file exists
ls -la .github/workflows/deploy-frontend-gh-pages.yml

# Check if you're on main branch
git branch

# Push any change to trigger workflow
git push origin main
```

## 📞 Still Having Issues?

1. **Check the Actions tab** for detailed error messages
2. **Verify repository settings** match the steps above
3. **Wait 2-3 minutes** after enabling Pages before running workflow
4. **Try manually triggering** the workflow from Actions tab

---

**After enabling Pages, your site will be available at:**
```
https://CodeZettaa.github.io/Job-Tracker-application-full-stack/
```

