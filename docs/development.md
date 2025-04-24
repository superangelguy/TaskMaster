# TaskMaster Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git
- MongoDB (v5 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskmaster.git
cd taskmaster
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
taskmaster/
├── src/
│   ├── api/           # API routes and controllers
│   ├── config/        # Configuration files
│   ├── models/        # Database models
│   ├── middleware/    # Custom middleware
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── app.js         # Main application file
├── public/            # Static files
├── tests/             # Test files
├── docs/              # Documentation
└── package.json       # Project dependencies
```

## 🔧 Development Workflow

### Branching Strategy
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Code Style
- Use ESLint for JavaScript linting
- Follow Airbnb JavaScript Style Guide
- Use Prettier for code formatting

### Git Commit Messages
Follow the conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test related changes
- chore: Maintenance tasks

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:integration
```

### End-to-End Tests
```bash
npm run test:e2e
```

## 🔍 Code Review Process

1. Create a feature branch
2. Write tests for new features
3. Submit a pull request
4. Address review comments
5. Get approval from at least one reviewer
6. Merge to develop branch

## 🛠️ Development Tools

### Recommended VS Code Extensions
- ESLint
- Prettier
- GitLens
- MongoDB for VS Code
- REST Client

### Debugging
```bash
npm run debug
```

### API Testing
Use the included REST Client files in `tests/api/` for testing endpoints.

## 📦 Deployment

### Staging
```bash
npm run deploy:staging
```

### Production
```bash
npm run deploy:production
```

## 🔒 Security Guidelines

1. Never commit sensitive data
2. Use environment variables for secrets
3. Validate all user input
4. Implement rate limiting
5. Use HTTPS in production
6. Keep dependencies updated

## 📚 Documentation

- Keep API documentation updated
- Document new features
- Update README when needed
- Comment complex code sections

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🐛 Common Issues

### Database Connection
- Check MongoDB URI
- Verify MongoDB service is running
- Check network connectivity

### Authentication
- Verify JWT secret
- Check token expiration
- Validate user permissions

### API Errors
- Check request format
- Verify required fields
- Validate data types

## 📞 Support

For development support:
- Slack: #taskmaster-dev
- Email: dev-support@taskmaster.com
- Documentation: https://docs.taskmaster.com/dev 