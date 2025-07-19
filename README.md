# 🍽️ FoodEx - MERN Stack Recipe Platform

A full-stack recipe sharing and food community platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features user authentication, recipe management, social interactions, and a modern responsive UI.

## 🏭 Features

### User Management
- ✅ Complete authentication system with signup, login, OTP verification, resend OTP, forgot password
- ✅ JWT token-based authentication with secure password hashing
- ✅ User profile management with profile picture upload
- ✅ Follow/unfollow system for users
- ✅ User statistics (post count, followers, following)
- ✅ User preferences and settings

### Recipe Management
- ✅ Create, read, update, and delete recipes
- ✅ Recipe categorization (veg/non-veg, cuisine types)
- ✅ Advanced recipe search and filtering by category
- ✅ Recipe rating and like system
- ✅ Recipe bookmarking functionality with add/remove
- ✅ Recipe suggestions and feedback system
- ✅ Recipe sharing and discovery

### Content Management
- ✅ File upload system for recipe images with progress bar
- ✅ Ingredient lists and cooking instructions
- ✅ Recipe owner attribution and management

### Social Features
- ✅ User following system with real-time updates
- ✅ Recipe sharing and discovery feed
- ✅ User activity tracking and notifications
- ✅ Community engagement features
- ✅ Recipe recommendations based on user preferences

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js
- **UI Library**: Bootstrap, Custom CSS
- **Authentication**: JWT
- **HTTP Client**: Axios
- **File Upload**: Custom upload with progress

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Database**: MongoDB
- **Validation**: Express-validator
- **Email**: Nodemailer (SendGrid)

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **API Testing**: Postman
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
foodex-mern/
├── frontend/                 # React.js Frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store and actions
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # CSS and styling
│   │   └── App.js           # Main app component
│   ├── package.json
│   └── README.md
├── backend/                  # Node.js Backend
│   ├── app.js               # Main application entry point
│   ├── package.json         # Dependencies and scripts
│   ├── controllers/         # Route controllers
│   │   ├── auth.js         # Authentication logic
│   │   ├── recipes.js      # Recipe management
│   │   └── user.js         # User management
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── recipes.js      # Recipe routes
│   │   └── user.js         # User routes
│   ├── middleware/         # Custom middleware
│   │   └── authguard.js    # JWT authentication guard
│   ├── models/             # Data models
│   ├── utils/              # Utility functions
│   │   ├── fileDB.js       # File-based database utility
│   │   ├── email.js        # Email sending utilities
│   │   └── suggestionmail.js # Suggestion email templates
│   ├── data/               # JSON data files
│   │   ├── users.json      # User data storage
│   │   └── recipes.json    # Recipe data storage
│   └── uploads/            # File upload directory
├── package.json            # Root package.json
└── README.md              # This file
```

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/google` - Google OAuth login
- `POST /auth/check-otp` - OTP verification
- `POST /auth/resend-otp` - Resend OTP
- `POST /auth/send-reset-otp` - Send password reset OTP
- `POST /auth/check-reset-otp` - Verify reset OTP
- `POST /auth/reset-password` - Reset password

### Recipes
- `GET /recipe` - Get all recipes
- `POST /recipe/add` - Create new recipe
- `GET /recipe/:id` - Get specific recipe
- `GET /recipe/category/:type` - Get recipes by category
- `PUT /recipe/edit` - Edit recipe
- `DELETE /recipe/:id/:ownerId` - Delete recipe
- `GET /recipe/read/:id/:readerId` - Read recipe with user context
- `GET /recipe/guest/:id` - Read recipe as guest
- `POST /recipe/like` - Like/unlike recipe
- `POST /recipe/suggestion` - Send recipe suggestion
- `GET /recipe/search` - Search recipes

### Users
- `GET /user/profile/:userId` - Get user profile
- `GET /user/bookmarks/:userId` - Get user bookmarks
- `GET /user/other/:celebId/:fanId` - Get other user profile
- `PUT /user/profile-picture/:userId` - Update profile picture
- `GET /user/following/:userId` - Get following list
- `GET /user/followers/:userId` - Get followers list
- `POST /user/follow-toggle` - Follow/unfollow user
- `PUT /user/preferences` - Update user preferences
