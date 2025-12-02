# 🔧 Fix: MongoDB Connection Error on Render

## The Problem

The error shows:

```
Error: querySrv ENOTFOUND _mongodb._tcp.1511
```

This means your `MONGODB_URI` environment variable in Render is **incorrect or malformed**.

## ✅ Solution: Fix MongoDB Connection String

### Step 1: Get Correct MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your **Cluster** → **Connect** button
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string - it should look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 2: Format the Connection String Correctly

**Replace these parts:**

- `<username>` → Your MongoDB Atlas username
- `<password>` → Your MongoDB Atlas password (URL-encode special characters if needed)
- Add database name at the end: `/job-tracker`

**Final format should be:**

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/job-tracker?retryWrites=true&w=majority
```

**Important:**

- ✅ Use `mongodb+srv://` (not `mongodb://`)
- ✅ Include the full cluster name (e.g., `cluster0.xxxxx.mongodb.net`)
- ✅ Add database name: `/job-tracker`
- ✅ Include query parameters: `?retryWrites=true&w=majority`
- ❌ Don't include `<` or `>` brackets
- ❌ Don't use just a number like `1511`

### Step 3: Update MONGODB_URI in Render

1. Go to **Render Dashboard** → Your Backend Service
2. Click **Environment** tab
3. Find `MONGODB_URI` variable
4. **Click Edit** (or delete and recreate)
5. **Paste your complete connection string:**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/job-tracker?retryWrites=true&w=majority
   ```
6. **Important:** Make sure there are NO spaces or line breaks
7. Click **Save Changes**
8. Render will automatically redeploy

### Step 4: Verify MongoDB Atlas Network Access

1. Go to MongoDB Atlas → **Network Access**
2. Make sure you have:
   - **"Allow Access from Anywhere"** (0.0.0.0/0) for testing
   - OR specific Render IP addresses if you know them
3. Click **"Confirm"** if you made changes

### Step 5: Verify Database User

1. Go to MongoDB Atlas → **Database Access**
2. Make sure your database user:
   - Has a password set
   - Has **"Read and write to any database"** permissions
   - Is **Active** (not deleted)

## 🔍 Common Issues

### Issue 1: Password Has Special Characters

If your password has special characters like `@`, `#`, `%`, etc., you need to **URL-encode** them:

| Character | URL-Encoded |
| --------- | ----------- |
| `@`       | `%40`       |
| `#`       | `%23`       |
| `%`       | `%25`       |
| `&`       | `%26`       |
| `+`       | `%2B`       |
| `=`       | `%3D`       |
| `?`       | `%3F`       |
| `/`       | `%2F`       |
| `:`       | `%3A`       |

**Example:**

- Password: `MyP@ss#123`
- URL-encoded: `MyP%40ss%23123`
- Connection string: `mongodb+srv://username:MyP%40ss%23123@cluster0.xxxxx.mongodb.net/job-tracker`

### Issue 2: Connection String Has Spaces

**Remove ALL spaces** from the connection string. Even one space can break it.

### Issue 3: Missing Database Name

Make sure you add `/job-tracker` (or your database name) before the `?`:

```
✅ mongodb+srv://...@cluster.net/job-tracker?retryWrites=true
❌ mongodb+srv://...@cluster.net?retryWrites=true
```

### Issue 4: Wrong Cluster Name

The cluster name should be something like:

- `cluster0.xxxxx.mongodb.net`
- `cluster1.yyyyy.mongodb.net`

NOT just a number like `1511`.

## ✅ Correct Connection String Examples

**Example 1: Basic**

```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/job-tracker?retryWrites=true&w=majority
```

**Example 2: With URL-encoded password**

```
mongodb+srv://myuser:MyP%40ss%23123@cluster0.abc123.mongodb.net/job-tracker?retryWrites=true&w=majority
```

**Example 3: With additional options**

```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/job-tracker?retryWrites=true&w=majority&appName=JobTracker
```

## 🧪 Testing the Connection

After updating:

1. **Watch Render logs** - You should see:

   ```
   [Nest] Connected to MongoDB successfully
   🚀 Backend server running on port 10000
   ```

2. **If still failing**, check:
   - Connection string format (copy-paste from Atlas)
   - Network access settings
   - Database user is active
   - Password is correct (and URL-encoded if needed)

## 📝 Quick Checklist

- [ ] Connection string starts with `mongodb+srv://`
- [ ] Username and password are correct
- [ ] Cluster name is complete (e.g., `cluster0.xxxxx.mongodb.net`)
- [ ] Database name is included (`/job-tracker`)
- [ ] Query parameters are included (`?retryWrites=true&w=majority`)
- [ ] No spaces in the connection string
- [ ] Special characters in password are URL-encoded
- [ ] Network access allows Render IPs (or 0.0.0.0/0)
- [ ] Database user has proper permissions

## 🎯 After Fixing

Your app should connect successfully and you'll see:

```
[Nest] Connected to MongoDB successfully
🚀 Backend server running on port 10000
```

---

**Need help?** Double-check your connection string format matches the examples above exactly!

