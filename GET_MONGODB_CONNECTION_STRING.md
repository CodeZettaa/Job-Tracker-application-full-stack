# 🔗 How to Get Your MongoDB Atlas Connection String

## The Problem

If you see:
```
Error: querySrv ENOTFOUND _mongodb._tcp.cluster0.xxxxx.mongodb.net
```

This means your connection string has a **placeholder** (`cluster0.xxxxx.mongodb.net`) instead of your **actual cluster name**.

## ✅ Step-by-Step: Get Your Real Connection String

### Step 1: Go to MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Sign in** to your account

### Step 2: Find Your Cluster

1. On the **Dashboard**, you'll see your cluster(s)
2. **Click on your cluster name** (it will be something like `Cluster0`, `MyCluster`, etc.)
3. **Note the cluster name** - you'll need this!

### Step 3: Get Connection String

1. **Click the "Connect" button** on your cluster
2. A popup will appear with connection options
3. **Choose "Connect your application"**
4. **Select:**
   - **Driver:** `Node.js`
   - **Version:** `5.5 or later` (or latest available)
5. **Copy the connection string** - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
   
   **Important:** Notice the cluster name is something like `cluster0.abc123.mongodb.net` (NOT `cluster0.xxxxx.mongodb.net`)

### Step 4: Replace Placeholders

The connection string will have placeholders:
```
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
1. `<username>` → Your MongoDB Atlas username
2. `<password>` → Your MongoDB Atlas password
3. Add database name: `/job-tracker` before the `?`

**Final format:**
```
mongodb+srv://yourusername:yourpassword@cluster0.abc123.mongodb.net/job-tracker?retryWrites=true&w=majority
```

### Step 5: Handle Special Characters in Password

**If your password has special characters, URL-encode them:**

| Character   | URL-Encoded |
| ----------- | ----------- |
| `@`         | `%40`       |
| `#`         | `%23`       |
| `%`         | `%25`       |
| `&`         | `%26`       |
| `+`         | `%2B`       |
| `=`         | `%3D`       |
| `?`         | `%3F`       |
| `/`         | `%2F`       |
| `:`         | `%3A`       |
| ` ` (space) | `%20`       |

**Example:**
- Password: `MyP@ss#123`
- URL-encoded: `MyP%40ss%23123`
- Connection string: `mongodb+srv://username:MyP%40ss%23123@cluster0.abc123.mongodb.net/job-tracker`

### Step 6: Update Render

1. Go to **Render Dashboard** → Your Backend Service
2. Click **Environment** tab
3. Find `MONGODB_URI` variable
4. **Delete the old value** (the one with `xxxxx`)
5. **Paste your complete, real connection string:**
   ```
   mongodb+srv://username:password@cluster0.abc123.mongodb.net/job-tracker?retryWrites=true&w=majority
   ```
6. **Make sure:**
   - ✅ No spaces
   - ✅ Real cluster name (not `xxxxx`)
   - ✅ Real username and password
   - ✅ Database name included (`/job-tracker`)
7. Click **Save Changes**
8. Render will automatically redeploy

## 🔍 How to Identify Your Real Cluster Name

Your cluster name in MongoDB Atlas will be something like:
- `cluster0.abc123.mongodb.net`
- `cluster1.xyz789.mongodb.net`
- `mycluster.def456.mongodb.net`

**It will NOT be:**
- ❌ `cluster0.xxxxx.mongodb.net` (placeholder)
- ❌ `1511` (just a number)
- ❌ `cluster0.mongodb.net` (incomplete)

## ✅ Verification

After updating, check Render logs. You should see:
```
🔗 MongoDB Connection String (masked): mongodb+srv://username:***@cluster0.abc123.mongodb.net/job-tracker
```

**Notice:** The cluster name should be real (like `abc123`), not `xxxxx`.

## 🐛 Still Having Issues?

### Issue 1: Can't Find Cluster

- Make sure you're logged into the correct MongoDB Atlas account
- Check if you have any clusters created
- If no clusters, create one first (free tier available)

### Issue 2: Connection String Still Wrong

1. **Copy directly from MongoDB Atlas** - Don't type it manually
2. **Double-check** you replaced `<username>` and `<password>`
3. **Verify** you added `/job-tracker` before the `?`
4. **Check** there are no extra spaces

### Issue 3: Still Getting ENOTFOUND

- Verify the cluster name in the connection string matches what you see in MongoDB Atlas
- Make sure you're using `mongodb+srv://` (not `mongodb://`)
- Check that the cluster is active in MongoDB Atlas

## 📝 Quick Checklist

- [ ] Logged into MongoDB Atlas
- [ ] Found my cluster
- [ ] Clicked "Connect" → "Connect your application"
- [ ] Copied the connection string
- [ ] Replaced `<username>` with real username
- [ ] Replaced `<password>` with real password (URL-encoded if needed)
- [ ] Added `/job-tracker` before the `?`
- [ ] Updated `MONGODB_URI` in Render
- [ ] No spaces in connection string
- [ ] Real cluster name (not `xxxxx`)

## 🎯 Summary

**The error means you're using a placeholder cluster name instead of your real one.**

**Fix:** Get the actual connection string from MongoDB Atlas and use that exact cluster name.

---

**After updating with the real connection string, your app should connect successfully!** 🎉

