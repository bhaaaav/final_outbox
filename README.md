<<<<<<< HEAD
# EmailHub - Modern Email Application

A beautiful, modern email application built with React, TypeScript, and Node.js. Features include email composition, spam scoring, GPT-powered email refinement, and a clean, responsive UI.

## ✨ Features

- 🎨 **Modern UI**: Beautiful, responsive design with Material-UI
- 📧 **Email Composition**: Rich email editor with staging area
- 🛡️ **Spam Protection**: Built-in spam scoring and GPT refinement
- 🔐 **Authentication**: Secure JWT-based authentication
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🚀 **Production Ready**: Optimized for deployment

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Material-UI
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL
- **Email**: Nodemailer with Ethereal testing
- **AI**: OpenAI GPT integration for email refinement

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MySQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd test_outbox
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   
   Create `backend/.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=email_app
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_key (optional)
   ```

   Create `frontend/.env.local`:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. **Set up database**
   ```sql
   CREATE DATABASE email_app;
   USE email_app;
   
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   CREATE TABLE emails (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     recipient VARCHAR(255) NOT NULL,
     subject VARCHAR(255),
     body TEXT,
     spam_score INT DEFAULT 0,
     delivered BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

5. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - API Docs: http://localhost:3000/api/docs

## 📁 Project Structure

```
test_outbox/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API configuration
│   │   ├── theme.ts        # Material-UI theme
│   │   └── types.ts        # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/    # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── app.ts          # Express app
│   └── package.json
├── vercel.json             # Vercel deployment config
├── deploy.sh              # Deployment script
└── README.md
```

## 🎯 Key Features

### Email Staging Area
- **Spam Score Check**: Analyze emails for spam indicators
- **GPT Refinement**: Use AI to improve email content
- **Preview Before Send**: Review and refine before sending

### Modern UI Components
- **Responsive Design**: Works on all screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **Material Design**: Clean, modern interface
- **Interactive Elements**: Smooth animations and transitions

### Backend Features
- **JWT Authentication**: Secure user sessions
- **Email Sending**: SMTP integration with Ethereal testing
- **Spam Detection**: Keyword-based spam scoring
- **GPT Integration**: AI-powered email refinement
- **RESTful API**: Clean, documented endpoints

## 🚀 Deployment

### Vercel (Frontend)
1. Connect GitHub repository to Vercel
2. Set Root Directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL=https://your-backend-url/api`
4. Deploy!

### Railway (Backend)
1. Connect GitHub repository to Railway
2. Select `backend` folder
3. Add environment variables (see above)
4. Deploy!

### Database Options
- **Railway MySQL**: Easy setup, $5/month
- **PlanetScale**: Free tier available
- **AWS RDS**: Enterprise-grade

## 📚 API Documentation

Visit `/api/docs` when running the backend to see the full API documentation with Swagger UI.

### Key Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/email` - Get user emails
- `POST /api/email/send` - Send email
- `POST /api/email/score` - Check spam score
- `POST /api/email/refine` - Refine with GPT

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

**Backend:**
```bash
npm run dev        # Development with hot reload
npm run build      # TypeScript compilation
npm start          # Production server
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Material-UI for consistent design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [Deployment Guide](DEPLOYMENT.md)
2. Review the API documentation
3. Check environment variables
4. Ensure database is properly configured

## 🎉 Acknowledgments

- Material-UI for the component library
- OpenAI for GPT integration
- Ethereal for email testing
- Vercel and Railway for hosting
=======
# not_so_outbox.ai
A project aimed at implementing, deploying code and more in a time crunch
>>>>>>> c9eb7ec66831cced20582ffd4047b11e610b1d8c
