# GitHub Setup Instructions

Follow these steps to push your code to GitHub and set up the repository.

## Step 1: Initialize Git Repository

```bash
cd /Users/nourhansaieedadmin/Documents/codeZetta/protoflio_code/fullstack-job-tracker
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: Fullstack Job Tracker with Authentication"
```

## Step 4: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Repository name: `fullstack-job-tracker`
4. Description: `Fullstack Job Tracker application with NestJS backend and Angular 19 frontend`
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README" (we already have one)
7. Click **Create repository**

## Step 5: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/fullstack-job-tracker.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 6: Verify

1. Go to your GitHub repository page
2. Verify all files are uploaded
3. Check that both `backend/` and `frontend/` folders are present

## Next Steps

After pushing to GitHub, follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to deploy both applications.

