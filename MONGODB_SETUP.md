# MongoDB Setup Guide

This guide will help you set up MongoDB for the Job Tracker application.

## 🚀 Quick Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended for Production)

1. **Sign up** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a free cluster** (M0 - Free tier available)
3. **Create a database user:**
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Save the username and password
4. **Whitelist IP addresses:**
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (for development) or add specific IPs
5. **Get connection string:**
   - Go to **Clusters** → **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/job-tracker?retryWrites=true&w=majority`

### Option 2: Local MongoDB Installation

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Windows
1. Download MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will start automatically as a service

#### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/job-tracker
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker?retryWrites=true&w=majority
```

### For Production Deployment

#### Railway
1. Go to your Railway project
2. Add environment variable: `MONGODB_URI`
3. Set value to your MongoDB connection string

#### Render
1. Go to your Render service
2. Add environment variable: `MONGODB_URI`
3. Set value to your MongoDB connection string

#### Heroku
```bash
heroku config:set MONGODB_URI="your-connection-string"
```

## 🧪 Testing the Connection

1. **Start the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Check the console** - You should see:
   ```
   🚀 Backend server running on port 3000
   ```

3. **If connection fails**, you'll see an error. Common issues:
   - MongoDB not running (local)
   - Wrong connection string
   - Network access not configured (Atlas)
   - Wrong credentials

## 📊 Database Structure

The application creates two collections:

### `users`
- `_id`: ObjectId (auto-generated)
- `email`: String (unique, indexed)
- `password`: String (hashed)
- `firstName`: String
- `lastName`: String
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

### `jobapplications`
- `_id`: ObjectId (auto-generated)
- `userId`: ObjectId (references User)
- `positionTitle`: String
- `companyName`: String
- `location`: String (optional)
- `status`: Enum (applied, interviewing, offer, rejected, archived)
- `source`: Enum (optional)
- `applicationDate`: Date
- `lastUpdateDate`: Date
- `salaryExpectation`: Number (optional)
- `salaryOffered`: Number (optional)
- `jobUrl`: String (optional)
- `notes`: String (optional)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

**Indexes:**
- `userId + status` (compound index for faster queries)
- `userId + companyName` (compound index for faster queries)

## 🔧 Troubleshooting

### Connection Refused (Local)
- Ensure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Linux)
- Check MongoDB is listening on port 27017: `lsof -i :27017`

### Authentication Failed (Atlas)
- Verify username and password are correct
- Check that the database user has proper permissions
- Ensure IP address is whitelisted

### Network Timeout (Atlas)
- Check your internet connection
- Verify IP whitelist includes your current IP
- Try using `Allow Access from Anywhere` (0.0.0.0/0) for testing

### Database Not Found
- MongoDB will create the database automatically on first write
- The database name is specified in the connection string (e.g., `job-tracker`)

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [NestJS Mongoose Documentation](https://docs.nestjs.com/techniques/mongodb)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 🔒 Security Best Practices

1. **Never commit** `.env` files with real credentials
2. **Use strong passwords** for database users
3. **Restrict IP access** in production (don't use 0.0.0.0/0)
4. **Enable MongoDB authentication** even in development
5. **Use connection string with SSL** for production (MongoDB Atlas does this by default)

