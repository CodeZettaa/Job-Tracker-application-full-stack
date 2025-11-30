# Job Tracker Backend

NestJS backend for the Job Tracker application with MongoDB integration.

## Setup

1. **Set up MongoDB:**
   - Install MongoDB locally OR
   - Use MongoDB Atlas (cloud)
   - See [MONGODB_SETUP.md](../MONGODB_SETUP.md) for detailed instructions

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI` (e.g., `mongodb://localhost:27017/job-tracker`)
   - Set `JWT_SECRET` (use a strong secret in production)
   - Set `CORS_ORIGINS` (comma-separated list of allowed origins)

3. **Install dependencies:**
```bash
npm install
```

4. **Start the development server:**
```bash
npm run start:dev
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Jobs (Protected - Requires JWT Token)

- `GET /jobs` - Get all jobs for the authenticated user (with optional query params: `status`, `company`, `search`)
- `GET /jobs/stats` - Get statistics by status for the authenticated user
- `GET /jobs/:id` - Get a single job
- `POST /jobs` - Create a new job
- `PATCH /jobs/:id` - Update a job
- `DELETE /jobs/:id` - Delete a job

## Tech Stack

- **NestJS 10** - Progressive Node.js framework
- **TypeScript** (strict mode)
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **@nestjs/mongoose** - MongoDB integration for NestJS
- **class-validator** & **class-transformer** - DTO validation
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## Database

The application uses MongoDB with two main collections:

- **users** - User accounts with authentication
- **jobapplications** - Job applications linked to users

See [MONGODB_SETUP.md](../MONGODB_SETUP.md) for database setup instructions.
