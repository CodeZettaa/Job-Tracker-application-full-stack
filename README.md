# Fullstack Job Tracker

A professional fullstack job application tracking application built with **Angular 19** and **NestJS**, demonstrating clean architecture, modern patterns, and senior-level development practices. Perfect for tracking your job search progress with a beautiful, responsive UI.

## 🏗️ Project Structure

```
fullstack-job-tracker/
├── backend/          # NestJS REST API
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── jobs/     # Jobs feature module
│   │   └── main.ts   # Application entry point
│   └── package.json
└── frontend/         # Angular 19 standalone application
    ├── src/
    │   ├── app/
    │   │   ├── auth/      # Authentication pages & services
    │   │   ├── core/      # Core services & interceptors
    │   │   ├── jobs/      # Jobs feature module
    │   │   └── shared/    # Shared components
    │   └── environments/  # Environment configurations
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start:dev
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend application will be available at `http://localhost:4200`

## ✨ Features

### 🔐 Authentication & Authorization

- ✅ **User Registration** - Create account with email, password, first name, and last name
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **JWT-based Auth** - Token-based authentication with 7-day expiration
- ✅ **Password Security** - Bcrypt password hashing (10 salt rounds)
- ✅ **Protected Routes** - Route guards protect authenticated pages
- ✅ **Auto Token Injection** - HTTP interceptor automatically adds auth tokens
- ✅ **Session Persistence** - User sessions persist across page refreshes
- ✅ **Public Routes** - Login and register pages are publicly accessible

### 💼 Job Application Management

- ✅ **Create Jobs** - Add new job applications with comprehensive details
- ✅ **View All Jobs** - List all job applications in a clean, organized view
- ✅ **Job Details** - View detailed information for each job application
- ✅ **Update Jobs** - Edit job applications (status, notes, salary, etc.)
- ✅ **Delete Jobs** - Remove job applications with confirmation
- ✅ **Advanced Filtering** - Filter by status, company, or search term
- ✅ **Real-time Statistics** - View job statistics by status (Applied, Interviewing, Offers, etc.)
- ✅ **Responsive Design** - Mobile-friendly interface

### 🎨 User Interface

- ✅ **Modern UI** - Clean, professional design with smooth animations
- ✅ **Dark/Light Mode** - Toggle between light and dark themes
- ✅ **Theme Persistence** - Theme preference saved in localStorage
- ✅ **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Form Validation** - Real-time validation on both frontend and backend

### 📊 Job Application Fields

- **Position Title** (required)
- **Company Name** (required)
- **Location**
- **Status:** Applied, Interviewing, Offer, Rejected, Archived
- **Source:** LinkedIn, Company Website, Referral, Other
- **Application Date** (required)
- **Last Updated Date** (auto-generated)
- **Salary Expectation**
- **Salary Offered**
- **Job URL**
- **Notes** (rich text support)

## 🛠️ Tech Stack

### Backend (NestJS)

- **NestJS** (v10.4.0) - Progressive Node.js framework
- **TypeScript** (v5.5.3) - Strict type checking
- **class-validator** & **class-transformer** - DTO validation and transformation
- **@nestjs/jwt** (v10.2.0) - JWT token generation and validation
- **@nestjs/passport** (v10.0.3) - Authentication strategies
- **passport-jwt** (v4.0.1) - JWT Passport strategy
- **bcrypt** (v5.1.1) - Password hashing
- **uuid** (v10.0.0) - Unique ID generation
- **In-memory storage** - Simple array-based persistence (easily swappable for database)

### Frontend (Angular 19)

- **Angular** (v19.2.0) - Latest Angular with standalone components
- **TypeScript** (v5.7.2) - Strict type checking
- **Angular Signals** - Modern reactive state management
- **RxJS** (v7.8.0) - Reactive programming
- **Angular Router** - Client-side routing with guards
- **Angular Forms** - Reactive forms with validation
- **Angular HttpClient** - HTTP client with interceptors
- **Standalone Components** - Modern Angular architecture

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework (backend)
- **Angular CLI** - Development tooling

## 📡 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
  - Body: `{ email, password, firstName, lastName }`
  - Response: `{ user, accessToken }`
- `POST /auth/login` - Login user
  - Body: `{ email, password }`
  - Response: `{ user, accessToken }`

### Jobs (Protected - Requires JWT Token)

- `GET /jobs` - Get all jobs (with optional query params: `status`, `company`, `search`)
- `GET /jobs/stats` - Get statistics by status
- `GET /jobs/:id` - Get a single job
- `POST /jobs` - Create a new job
  - Body: `CreateJobDto`
- `PATCH /jobs/:id` - Update a job
  - Body: `UpdateJobDto`
- `DELETE /jobs/:id` - Delete a job

## 🏛️ Architecture

### Backend Structure

```
backend/src/
├── main.ts                    # Application bootstrap & CORS config
├── app.module.ts              # Root module
├── auth/
│   ├── auth.module.ts         # Auth feature module
│   ├── auth.controller.ts     # Auth API endpoints
│   ├── auth.service.ts        # Auth business logic
│   ├── entities/
│   │   └── user.entity.ts     # User entity/model
│   ├── dto/
│   │   ├── login.dto.ts       # Login DTO with validation
│   │   └── register.dto.ts    # Register DTO with validation
│   ├── guards/
│   │   └── jwt-auth.guard.ts  # JWT authentication guard
│   ├── strategies/
│   │   └── jwt.strategy.ts    # JWT Passport strategy
│   └── decorators/
│       ├── public.decorator.ts    # Public route decorator
│       └── get-user.decorator.ts  # Get user decorator
└── jobs/
    ├── jobs.module.ts         # Jobs feature module
    ├── jobs.controller.ts     # REST API endpoints
    ├── jobs.service.ts         # Business logic & in-memory storage
    ├── entities/
    │   └── job.entity.ts       # Job entity/model
    └── dto/
        ├── create-job.dto.ts   # Create job DTO
        ├── update-job.dto.ts   # Update job DTO
        └── filter-jobs.dto.ts  # Filter jobs DTO
```

### Frontend Structure

```
frontend/src/app/
├── app.component.ts            # Root component
├── app.config.ts               # Application configuration
├── app.routes.ts               # Route definitions with guards
├── auth/
│   ├── guards/
│   │   └── auth.guard.ts      # Route protection guard
│   ├── models/
│   │   └── auth.model.ts      # Auth TypeScript interfaces
│   ├── pages/
│   │   ├── login-page/        # Login page component
│   │   └── register-page/     # Register page component
│   └── services/
│       └── auth.service.ts    # Auth service with signals
├── core/
│   ├── interceptors/
│   │   └── auth.interceptor.functional.ts  # JWT token interceptor
│   └── services/
│       ├── api-config.service.ts  # API configuration
│       └── theme.service.ts       # Theme management
├── jobs/
│   ├── models/
│   │   └── job-application.model.ts  # TypeScript interfaces
│   ├── services/
│   │   └── jobs.service.ts          # HTTP service
│   ├── state/
│   │   └── jobs.store.ts            # Signals-based store
│   ├── components/
│   │   └── job-stats/
│   │       └── job-stats.component.ts  # Statistics component
│   └── pages/
│       ├── jobs-page.component.ts      # Jobs list page
│       ├── job-form-page.component.ts   # Create/Edit form
│       └── job-detail-page.component.ts # Job details page
└── shared/
    └── components/
        └── theme-toggle/
            └── theme-toggle.component.ts  # Theme switcher
```

## 🎨 Design Principles

- **Clean Architecture** - Separation of concerns, modular structure
- **Type Safety** - Strong TypeScript typing throughout
- **Reactive State** - Angular Signals for state management
- **Validation** - Form validation on both frontend and backend
- **Error Handling** - Proper error handling and user feedback
- **Responsive Design** - Mobile-friendly UI with breakpoints
- **Security First** - JWT authentication, password hashing, route guards
- **Modern Patterns** - Standalone components, functional interceptors, signals

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt with 10 salt rounds
- **Route Guards** - Protected routes require authentication
- **HTTP Interceptors** - Automatic token injection
- **CORS Configuration** - Configurable allowed origins
- **Input Validation** - DTO validation on all endpoints
- **Error Sanitization** - Safe error messages to clients

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### GitHub Pages (Frontend)

The frontend is configured for automatic deployment to GitHub Pages. See [GITHUB_PAGES_DEPLOY.md](./GITHUB_PAGES_DEPLOY.md) for setup instructions.

**Quick Setup:**
1. Go to repository **Settings** → **Pages**
2. Select **Source**: `GitHub Actions`
3. Push to `main` branch - deployment happens automatically
4. Your site will be live at: `https://CodeZettaa.github.io/Job-Tracker-application-full-stack/`

### Quick Deploy Options

**Backend:**

- **Railway** (recommended) - Free tier, easy setup
- **Render** - Free tier available
- **Heroku** - Requires credit card
- **Fly.io** - Good alternative

**Frontend:**

- **Vercel** (recommended) - Free tier, automatic deployments
- **Netlify** - Great alternative
- **GitHub Pages** - Free hosting
- **Cloudflare Pages** - Fast CDN

### Environment Variables

**Backend:**

- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGINS` - Comma-separated list of allowed origins

**Frontend:**

- `API_URL` - Backend API URL (set in environment files)

## 📝 Development Notes

- The backend uses in-memory storage. Data will be lost on server restart.
- CORS is configured to allow requests from the frontend origin.
- All dates are handled as ISO strings for consistency.
- JWT tokens expire after 7 days.
- Theme preference is saved in browser localStorage.
- User sessions persist across page refreshes via localStorage.

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage report
```

### Frontend Tests

```bash
cd frontend
npm run test          # Run tests
```

## 📚 API Documentation

### Authentication Flow

1. **Register:** `POST /auth/register` → Returns `{ user, accessToken }`
2. **Login:** `POST /auth/login` → Returns `{ user, accessToken }`
3. **Use Token:** Include `Authorization: Bearer <token>` header in requests
4. **Protected Routes:** All `/jobs/*` endpoints require valid JWT token

### Job Application Flow

1. **Create:** `POST /jobs` with job data → Returns created job
2. **List:** `GET /jobs?status=applied&company=Google` → Returns filtered jobs
3. **View:** `GET /jobs/:id` → Returns single job
4. **Update:** `PATCH /jobs/:id` with partial data → Returns updated job
5. **Delete:** `DELETE /jobs/:id` → Removes job
6. **Stats:** `GET /jobs/stats` → Returns statistics by status

## 🔄 State Management

The frontend uses **Angular Signals** for reactive state management:

- **JobsStore** - Centralized state for jobs
- **AuthService** - Authentication state with signals
- **ThemeService** - Theme state management
- **Computed Signals** - Derived state (filtered jobs, statistics)

## 🎯 Future Enhancements

- Database integration (PostgreSQL, MongoDB, etc.)
- File uploads (resume, cover letter)
- Email notifications
- Advanced analytics and reporting
- Export functionality (CSV, PDF)
- Job application templates
- Interview scheduling
- Reminders and notifications
- Multi-user support with data isolation
- API rate limiting
- Request logging and monitoring

## 📄 License

MIT

## 👨‍💻 Author

Built as a portfolio project demonstrating fullstack development skills with modern frameworks and best practices.

---

**Happy Job Hunting! 🎯**
