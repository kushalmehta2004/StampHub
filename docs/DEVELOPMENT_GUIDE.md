# Development Guide - National Web Community of Philatelists

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git
- Code editor (VS Code recommended)

### Installation

1. **Clone and Setup**
   ```bash
   # Navigate to project directory
   cd "National Web Community of Philatelists (SIH1762)"
   
   # Run setup script (Windows)
   setup.bat
   
   # Or manually install dependencies
   npm run install-all
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment file
   cp server/.env.example server/.env
   
   # Update the following variables in server/.env:
   MONGODB_URI=mongodb://localhost:27017/philately_platform
   JWT_SECRET=your_super_secret_jwt_key_here
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend server on http://localhost:3000

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── common/    # Common UI components
│   │   │   ├── layout/    # Layout components
│   │   │   └── admin/     # Admin-specific components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   │   ├── auth/      # Authentication pages
│   │   │   ├── user/      # User dashboard pages
│   │   │   └── admin/     # Admin pages
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Additional styles
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── package.json
├── docs/                 # Documentation
└── README.md
```

## 🛠 Development Workflow

### Backend Development

1. **Adding New Routes**
   ```javascript
   // server/routes/example.js
   const express = require('express');
   const router = express.Router();
   
   router.get('/', (req, res) => {
     res.json({ message: 'Example route' });
   });
   
   module.exports = router;
   ```

2. **Creating Models**
   ```javascript
   // server/models/Example.js
   const mongoose = require('mongoose');
   
   const exampleSchema = new mongoose.Schema({
     name: { type: String, required: true },
     // ... other fields
   }, { timestamps: true });
   
   module.exports = mongoose.model('Example', exampleSchema);
   ```

3. **Adding Middleware**
   ```javascript
   // server/middleware/example.js
   const exampleMiddleware = (req, res, next) => {
     // Middleware logic
     next();
   };
   
   module.exports = { exampleMiddleware };
   ```

### Frontend Development

1. **Creating Components**
   ```jsx
   // client/src/components/ExampleComponent.js
   import React from 'react';
   
   const ExampleComponent = ({ prop1, prop2 }) => {
     return (
       <div className="example-class">
         {/* Component JSX */}
       </div>
     );
   };
   
   export default ExampleComponent;
   ```

2. **Adding Pages**
   ```jsx
   // client/src/pages/ExamplePage.js
   import React from 'react';
   
   const ExamplePage = () => {
     return (
       <div className="container-custom section-padding">
         <h1>Example Page</h1>
       </div>
     );
   };
   
   export default ExamplePage;
   ```

3. **Using Services**
   ```javascript
   // client/src/services/exampleService.js
   import { apiHelpers, endpoints } from './api';
   
   export const exampleService = {
     getItems: () => apiHelpers.get('/example'),
     createItem: (data) => apiHelpers.post('/example', data),
   };
   ```

## 🎨 Styling Guidelines

### Tailwind CSS Classes

We use a custom design system built on Tailwind CSS:

```css
/* Button Classes */
.btn-primary     /* Primary button */
.btn-secondary   /* Secondary button */
.btn-outline     /* Outlined button */
.btn-ghost       /* Ghost button */

/* Input Classes */
.input           /* Standard input */
.input-error     /* Error state input */
.label           /* Input label */
.error-text      /* Error message text */

/* Card Classes */
.card            /* Basic card */
.card-hover      /* Hoverable card */
.card-header     /* Card header */
.card-body       /* Card body */
.card-footer     /* Card footer */

/* Badge Classes */
.badge-primary   /* Primary badge */
.badge-success   /* Success badge */
.badge-warning   /* Warning badge */
.badge-error     /* Error badge */
```

### Color Palette

```css
/* Primary Colors */
primary-50 to primary-900

/* Secondary Colors */
secondary-50 to secondary-900

/* Accent Colors */
accent-50 to accent-900
```

## 🔧 API Development

### REST API Conventions

1. **Endpoint Structure**
   ```
   GET    /api/resource          # Get all resources
   GET    /api/resource/:id      # Get single resource
   POST   /api/resource          # Create resource
   PUT    /api/resource/:id      # Update resource
   DELETE /api/resource/:id      # Delete resource
   ```

2. **Response Format**
   ```json
   {
     "message": "Success message",
     "data": {}, // or []
     "pagination": {
       "currentPage": 1,
       "totalPages": 10,
       "totalItems": 100
     }
   }
   ```

3. **Error Format**
   ```json
   {
     "message": "Error message",
     "error": "ERROR_CODE",
     "errors": [] // Validation errors
   }
   ```

### Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## 🧪 Testing

### Running Tests

```bash
# Run server tests
cd server && npm test

# Run client tests
cd client && npm test
```

### Writing Tests

1. **Backend Tests**
   ```javascript
   // server/tests/example.test.js
   const request = require('supertest');
   const app = require('../index');
   
   describe('Example API', () => {
     test('GET /api/example', async () => {
       const response = await request(app)
         .get('/api/example')
         .expect(200);
       
       expect(response.body.message).toBe('Success');
     });
   });
   ```

2. **Frontend Tests**
   ```javascript
   // client/src/components/__tests__/Example.test.js
   import { render, screen } from '@testing-library/react';
   import ExampleComponent from '../ExampleComponent';
   
   test('renders example component', () => {
     render(<ExampleComponent />);
     expect(screen.getByText('Example')).toBeInTheDocument();
   });
   ```

## 📦 Building for Production

### Build Commands

```bash
# Build client for production
npm run build

# Start production server
npm start
```

### Environment Variables for Production

```bash
# server/.env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/philately_platform
JWT_SECRET=production_jwt_secret
RAZORPAY_KEY_ID=production_razorpay_key
RAZORPAY_KEY_SECRET=production_razorpay_secret
CLIENT_URL=https://yourdomain.com
```

## 🚀 Deployment

### Local Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Cloud Deployment (AWS/Heroku)

1. **Prepare for deployment**
   - Set environment variables
   - Configure database connection
   - Set up file storage (AWS S3)

2. **Deploy backend**
   - Use AWS Elastic Beanstalk or Heroku
   - Configure environment variables
   - Set up MongoDB Atlas

3. **Deploy frontend**
   - Use AWS Amplify, Netlify, or Vercel
   - Configure build settings
   - Set API base URL

## 🔍 Debugging

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   mongod --version
   
   # Start MongoDB service
   net start MongoDB
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

3. **CORS Issues**
   - Check CLIENT_URL in server/.env
   - Verify CORS configuration in server/index.js

### Debug Tools

1. **Backend Debugging**
   - Use console.log() for simple debugging
   - Use VS Code debugger with launch.json
   - Check server logs for errors

2. **Frontend Debugging**
   - Use React Developer Tools
   - Use browser console
   - Use React Query Devtools

## 📚 Additional Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace) - Development tools

## 🤝 Contributing

### Code Style

1. **JavaScript/JSX**
   - Use ES6+ features
   - Use functional components with hooks
   - Follow consistent naming conventions
   - Add comments for complex logic

2. **CSS**
   - Use Tailwind CSS classes
   - Follow mobile-first approach
   - Use semantic class names

3. **Git Workflow**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes and commit
   git add .
   git commit -m "Add new feature"
   
   # Push and create pull request
   git push origin feature/new-feature
   ```

### Pull Request Guidelines

1. Write clear commit messages
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass
5. Follow code review feedback

## 🆘 Getting Help

### Support Channels

1. **Documentation** - Check this guide and README
2. **Issues** - Create GitHub issues for bugs
3. **Discussions** - Use GitHub discussions for questions
4. **Email** - Contact development team

### Troubleshooting Checklist

- [ ] Check environment variables
- [ ] Verify database connection
- [ ] Check server logs
- [ ] Clear browser cache
- [ ] Restart development server
- [ ] Check network connectivity

---

**Happy Coding! 🎉**

For more information, refer to the project README and other documentation files.