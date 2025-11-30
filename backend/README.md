# Job Tracker Backend

NestJS backend for the Job Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Jobs

- `GET /jobs` - Get all jobs (with optional query params: `status`, `company`, `search`)
- `GET /jobs/stats` - Get statistics by status
- `GET /jobs/:id` - Get a single job
- `POST /jobs` - Create a new job
- `PATCH /jobs/:id` - Update a job
- `DELETE /jobs/:id` - Delete a job

## Tech Stack

- NestJS 10
- TypeScript (strict mode)
- class-validator & class-transformer for DTO validation
- In-memory storage (can be swapped for a database)

