# Student Codeforces Analytics Dashboard

A comprehensive web application for tracking and analyzing student performance on Codeforces competitive programming platform. Built with Next.js, TypeScript, and modern web technologies.

# My Project

<div>
    <a href="https://www.loom.com/share/03a398bee1a5425e8bd78047f187bd7b">
      <p>Full Stack Developer Project Showcase 🚀 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/03a398bee1a5425e8bd78047f187bd7b">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/03a398bee1a5425e8bd78047f187bd7b-32e4d4e6682538f8-full-play.gif">
    </a>
</div>

## 🚀 Features

### 📊 Student Management
- **Complete Student Table View**: Display all enrolled students with Name, Email, Phone, Codeforces Handle, Current Rating, and Max Rating
- **CRUD Operations**: Add, edit, and delete student records with validation
- **CSV Export**: Download complete dataset for offline analysis
- **Real-time Data Sync**: Automatic Codeforces data updates with configurable scheduling
- **Last Updated Tracking**: View when each student's data was last synchronized

### 📈 Detailed Student Analytics
- **Contest History Analysis**:
  - Filterable by 30, 90, or 365 days
  - Interactive rating progression graphs
  - Contest performance with rating changes and rankings
  - Problem-solving statistics per contest
  
- **Problem Solving Insights**:
  - Filterable by 7, 30, or 90 days
  - Most difficult problem solved tracking
  - Comprehensive solving statistics (total solved, average rating)
  - Activity metrics (problems per day)
  - Rating distribution bar charts
  - Visual submission heatmaps

### 🔄 Automated Data Management
- **Smart Sync System**: Daily automated Codeforces data fetching (default: 2 AM)
- **Configurable Scheduling**: Adjust sync time and frequency via settings
- **Real-time Updates**: Immediate data fetch when Codeforces handles are updated
- **Efficient API Usage**: Minimize API calls during peak user hours

### 📧 Engagement & Notifications
- **Inactivity Detection**: Automatically identify students inactive for 7+ days
- **Smart Email Reminders**: Automated motivational emails for inactive students
- **Email Management**: Track reminder frequency and disable per-student notifications
- **Custom Templates**: Configurable email templates and preferences

### 🎨 Modern User Experience
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Interactive Dashboard**: Real-time analytics and data visualization
- **Intuitive Navigation**: Clean, user-friendly interface design

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14+ with TypeScript
- **Build Tool**: Bun for fast development and optimized builds
- **State Management**: React Hooks + Context API + React Query
- **Styling**: Tailwind CSS v4 + shadcn/ui + tweakcn
- **Animation** : Motion (framer-motion)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icon library

### Project Structure

#### Client (Frontend) - Next.js Application
```
client/
├── bun.lock                    # Bun package lock file
├── components.json             # shadcn/ui components configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Project dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── public/                    # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/
    ├── api/                   # API client services
    │   ├── constant.ts        # API constants and endpoints
    │   ├── CronApi.ts         # Cron job API calls
    │   ├── emailTemplateApi.ts # Email template API calls
    │   └── studentApi.ts      # Student management API calls
    ├── app/                   # Next.js App Router pages
    │   ├── ClientRootLayout.tsx # Client-side root layout
    │   ├── favicon.ico        # Site favicon
    │   ├── globals.css        # Global styles
    │   ├── layout.tsx         # Root layout component
    │   ├── page.tsx           # Home page
    │   ├── ThemeSwitcher.tsx  # Theme toggle component
    │   ├── provider/
    │   │   └── provider.tsx   # Context providers wrapper
    │   └── settings/
    │       └── page.tsx       # Settings page
    ├── components/            # Reusable UI components
    │   ├── analytics/         # Student analytics components
    │   │   ├── AnayticsLayout.tsx    # Analytics page layout
    │   │   ├── AnimatedComponetns.tsx # Animated UI elements
    │   │   ├── ContestHistoryTab.tsx  # Contest history view
    │   │   └── ProblemSolvingTab.tsx  # Problem solving analytics
    │   ├── common/            # Shared utility components
    │   │   ├── Error.tsx      # Error display component
    │   │   └── Loading.tsx    # Loading spinner component
    │   ├── dashboard/         # Dashboard-specific components
    │   │   ├── add-student-popup.tsx        # Add student modal
    │   │   ├── dashboard-card.tsx           # Dashboard card component
    │   │   ├── dashboardHeader.tsx          # Dashboard header
    │   │   ├── dashboard-main.tsx           # Main dashboard layout
    │   │   ├── dashboard-overview-cards.tsx # Overview statistics cards
    │   │   ├── edit-student-popup.tsx       # Edit student modal
    │   │   ├── student-data-table.tsx       # Student data table
    │   │   ├── studentPagination.tsx        # Table pagination
    │   │   ├── student-table-header.tsx     # Table header component
    │   │   └── student-table-rows.tsx       # Table row component
    │   ├── layout/            # Layout components
    │   │   └── dashboard-layout.tsx # Main dashboard layout
    │   ├── logo/              # Logo components
    │   │   └── logo.tsx       # Application logo
    │   ├── setting/           # Settings page components
    │   │   ├── CronJob/       # Cron job management
    │   │   │   ├── CronJobBuilder.tsx # Cron job creation form
    │   │   │   ├── CronJobList.tsx    # Cron jobs listing
    │   │   │   └── cron-tab.tsx       # Cron tab component
    │   │   ├── Email-Template/ # Email template management
    │   │   │   ├── EmailTemplateBuilder.tsx    # Template builder
    │   │   │   ├── EmailTemplateEditDialog.tsx # Edit template dialog
    │   │   │   ├── EmailTemplateList.tsx       # Templates listing
    │   │   │   ├── EmailTemplatePreview.tsx    # Template preview
    │   │   │   └── EmailTemplateTab.tsx        # Email template tab
    │   │   └── setting-page.tsx # Main settings page
    │   └── ui/                # shadcn/ui components
    │       ├── alert.tsx      # Alert component
    │       ├── badge.tsx      # Badge component
    │       ├── button.tsx     # Button component
    │       ├── card.tsx       # Card component
    │       ├── dialog.tsx     # Dialog/Modal component
    │       ├── dropdown-menu.tsx # Dropdown menu
    │       ├── grid-pattern.tsx  # Grid pattern background
    │       ├── input.tsx      # Input field component
    │       ├── label.tsx      # Label component
    │       ├── pagination.tsx # Pagination component
    │       ├── popover.tsx    # Popover component
    │       ├── scroll-area.tsx # Scrollable area
    │       ├── select.tsx     # Select dropdown
    │       ├── separator.tsx  # Separator line
    │       ├── sidebar.tsx    # Sidebar component
    │       ├── switch.tsx     # Toggle switch
    │       ├── table.tsx      # Table component
    │       ├── tabs.tsx       # Tabs component
    │       └── textarea.tsx   # Textarea component
    ├── data/                  # Static data and configurations
    │   └── dashboard-data.tsx # Dashboard mock/static data
    ├── hooks/                 # Custom React hooks
    │   ├── useCronManagement.tsx      # Cron job management logic
    │   ├── useCron.ts                 # Cron job API hooks
    │   ├── useEmailTemplateManagement.tsx # Email template management
    │   ├── useEmailtemplate.ts        # Email template API hooks
    │   ├── usePagination.tsx          # Pagination logic
    │   ├── useStudentManagement.tsx   # Student management logic
    │   └── useStudents.ts             # Student API hooks
    ├── lib/                   # Utility libraries
    │   ├── helpers/           # Helper functions
    │   │   ├── analytics-helpers.ts   # Analytics utility functions
    │   │   ├── convert-data-to-csv.ts # CSV export functionality
    │   │   └── dashboard-helpers.ts   # Dashboard utility functions
    │   └── utils.ts           # General utility functions
    └── types/                 # TypeScript type definitions
        ├── analytics.d.ts     # Analytics-related types
        └── index.d.ts         # General type definitions
```

#### Server (Backend) - Express.js API
```
server/
├── bun.lock               # Bun package lock file
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── mockDataTest/          # Mock data for testing
│   └── FeedMockData.ts    # Sample data feed
└── src/
    ├── constants/         # Application constants
    │   ├── error.constants.ts        # Error message constants
    │   └── httpStatusCode.constants.ts # HTTP status codes
    ├── controller/        # Request handlers
    │   ├── cronController.ts      # Cron job management
    │   ├── studentController.ts   # Student operations
    │   └── templateController.ts  # Email template operations
    ├── error/             # Error handling
    │   ├── apiError.ts    # API error classes
    │   ├── dbError.ts     # Database error handling
    │   └── handleError.ts # Global error handler
    ├── middleware/        # Express middleware
    │   └── ErrorMiddleware.ts # Error handling middleware
    ├── model/             # Database models
    │   ├── cronModel.ts         # Cron job schema
    │   ├── emailTemplate.ts     # Email template schema
    │   ├── studentAnalystics.ts # Student analytics schema
    │   └── student.ts           # Student schema
    ├── routes/            # API routes
    │   └── v1/            # Version 1 API routes
    │       ├── cronRoutes.ts    # Cron job routes
    │       ├── emailRoute.ts    # Email template routes
    │       └── studentRouter.ts # Student management routes
    ├── service/           # Business logic services
    │   ├── dbService.ts       # Database operations service
    │   ├── emailService.ts    # Email sending service
    │   ├── jobScheduler.ts    # Cron job scheduler
    │   └── statsService.ts    # Statistics calculation service
    ├── types/             # TypeScript type definitions
    │   └── analytics.d.ts # Analytics type definitions
    ├── utils/             # Utility functions
    │   ├── config.ts      # Configuration management
    │   └── database.ts    # Database connection setup
    └── index.ts           # Application entry point
```

### Key Design Patterns
- **Component Composition**: Modular, reusable components with proper TypeScript interfaces
- **Custom Hooks**: Clean separation of business logic from UI components
- **Service Layer**: Centralized API management and external service integration
- **Type Safety**: Comprehensive TypeScript coverage for runtime safety
- **Theme System**: Dynamic theming with CSS custom properties

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun runtime
- Modern web browser
- Codeforces API access

### Installation for server

1. **Clone the repository**
```bash
git clone <repository-url>
cd tle-assignment
cd server
```

2. **Install dependencies**
```bash
bun install
```

3. **Environment setup**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
PORT = "
MONGO_DB_URI = ""
RESEND_API = ""


5. **Start development server**
```bash
bun run dev
```

Visit `http://localhost:8080` to access the server application.


### Installation for client

1. **Clone the repository**
```bash
cd ../client
```

2. **Install dependencies**
```bash
bun install
```

3. **Start development server**
```bash
bun run dev
```

Visit `http://localhost:3000` to access the application.


## 📋 Usage Guide

### Managing Students
1. **Add Students**: Click "Add Student" button, fill in details including Codeforces handle
2. **Edit Records**: Click edit icon in any row to modify student information
3. **Delete Students**: Use delete option with confirmation dialog
4. **Export Data**: Click "Export CSV" to download complete dataset
5. **View Details**: Click on any student row to access detailed analytics

### Student Analytics
1. **Contest History**: 
   - Select time filter (30/90/365 days)
   - View rating progression graph
   - Analyze contest performance metrics

2. **Problem Solving Data**:
   - Choose analysis period (7/30/90 days)
   - Review solving statistics and trends
   - Examine submission patterns via heatmap

### System Configuration
1. **Sync Settings**: Navigate to Settings → Data Sync
2. **Email Templates**: Customize reminder email content
3. **Theme Toggle**: Switch between light/dark modes
4. **Notification Preferences**: Configure email settings per student

## 🔧 Development

### Available Scripts
```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Lint code
bun run format       # Format code with Prettier
bun run type-check   # Run TypeScript compiler
```

### Code Quality
- **ESLint**: Enforces coding standards and best practices
- **Prettier**: Maintains consistent code formatting
- **TypeScript**: Provides compile-time type safety

## 🛠️ API Documentation

### Base URL
```
/v1/api
```

### Student Management Routes
**Base Path**: `/v1/api/students`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/` | Get all students or filter by query parameters | Public |
| `GET` | `/highest-achievers` | Get top performing students | Public |
| `GET` | `/:id` | Get student analytics data by ID | Public |
| `POST` | `/` | Add a new student | Public |
| `PUT` | `/:id` | Update a student by ID | Public |
| `DELETE` | `/:id` | Delete a student by ID | Public |

**Example Requests:**
```bash
# Get all students
GET /v1/api/students

# Get student analytics
GET /v1/api/students/507f1f77bcf86cd799439011

# Add new student
POST /v1/api/students
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "codeforcesHandle": "johndoe_cf",
  "currentRating": 1500,
  "maxRating": 1650
}

# Update student
PUT /v1/api/students/507f1f77bcf86cd799439011
Content-Type: application/json
{
  "name": "John Smith",
  "currentRating": 1600
}
```

### Email Template Management Routes
**Base Path**: `/v1/api/template`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/all` | Get all email templates | Public |
| `POST` | `/` | Create a new email template | Public |
| `PUT` | `/:id` | Update email template by template ID | Public |
| `DELETE` | `/:id` | Delete email template by template ID | Public |

**Example Requests:**
```bash
# Get all templates
GET /v1/api/template/all

# Create new template
POST /v1/api/template
Content-Type: application/json
{
  "name": "Inactivity Reminder",
  "subject": "Time to get back to coding!",
  "body": "Hi {{studentName}}, we noticed you haven't solved any problems recently...",
  "type": "reminder"
}

# Update template
PUT /v1/api/template/507f1f77bcf86cd799439011
Content-Type: application/json
{
  "subject": "Updated: Time to get back to coding!",
  "body": "Updated template content..."
}
```

### Cron Job Management Routes
**Base Path**: `/v1/api/cron-job`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/` | Get all cron job configurations | Public |
| `POST` | `/` | Create a new cron job | Public |
| `PUT` | `/:id` | Update cron job by ID | Public |
| `DELETE` | `/:id` | Delete cron job by ID | Public |

**Example Requests:**
```bash
# Get cron jobs
GET /v1/api/cron-job

# Create new cron job
POST /v1/api/cron-job
Content-Type: application/json
{
  "name": "Daily Data Sync",
  "schedule": "0 2 * * *",
  "type": "data_sync",
  "enabled": true
}

# Update cron job
PUT /v1/api/cron-job/507f1f77bcf86cd799439011
Content-Type: application/json
{
  "schedule": "0 3 * * *",
  "enabled": false
}
```

### Codeforces API Integration
The application integrates with Codeforces API for fetching student data:

**External Endpoints Used:**
- `https://codeforces.com/api/user.status` - User submission history
- `https://codeforces.com/api/user.rating` - Contest rating history

### Data Synchronization Flow
1. **Scheduled Sync**: Daily automated data fetching via cron jobs
2. **Real-time Updates**: Immediate fetch when Codeforces handles are updated
3. **Error Handling**: Robust retry mechanisms and error logging
4. **Rate Limiting**: Respectful API usage to avoid throttling

### Response Format
All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data
  },
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```
## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure TypeScript compliance

## 📊 Analytics & Monitoring

### User Analytics Tracked
- Page views and navigation patterns
- Feature usage statistics
- Error tracking and monitoring
- Student engagement metrics

### Performance Metrics
- API response times
- Data sync success rates
- Email delivery statistics
- User activity patterns

## 🐛 Troubleshooting

### Common Issues
1. **Codeforces API Limits**: Implement proper retry logic and respect rate limits
2. **Data Sync Failures**: Check network connectivity and API availability
3. **Email Delivery**: Verify email service configuration and credentials
4. **Theme Issues**: Clear browser cache after theme updates

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` and `DEBUG=true`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Codeforces](https://codeforces.com/) for providing the competitive programming platform and API
- [Next.js](https://nextjs.org/) team for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components

**Built with ❤️ for competitive programming education**