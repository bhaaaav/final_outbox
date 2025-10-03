# Deployment Guide for Vercel

This guide will help you deploy your email application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Backend Hosting**: You'll need to deploy your backend separately (Railway, Render, or Vercel Functions)

## Step 1: Deploy Backend First

### Option A: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select your backend folder
4. Add environment variables:
   ```
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=email_app
   OPENAI_API_KEY=your_openai_key (optional)
   ```
5. Deploy and get your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Render
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your repository and select backend folder
4. Add environment variables as above
5. Deploy and get your backend URL

## Step 2: Deploy Frontend to Vercel

1. **Push to GitHub**: Make sure your code is in a GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set the **Root Directory** to `frontend`

3. **Configure Build Settings**:
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Add Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```

5. **Deploy**: Click "Deploy"

## Step 3: Update API Configuration

After deployment, update your frontend API configuration:

1. **Update API Base URL**: In `frontend/src/api/api.ts`, change:
   ```typescript
   const API = axios.create({
     baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
     // ... rest of config
   });
   ```

2. **Redeploy**: Push changes to trigger a new deployment

## Step 4: Database Setup

For production, you'll need a MySQL database:

### Option A: Railway MySQL
1. Add MySQL service in Railway
2. Get connection details from Railway dashboard
3. Update backend environment variables

### Option B: PlanetScale
1. Create account at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get connection string
4. Update backend environment variables

### Option C: AWS RDS
1. Create MySQL instance in AWS RDS
2. Configure security groups
3. Get connection details
4. Update backend environment variables

## Environment Variables Summary

### Frontend (.env.local)
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

### Backend
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=email_app
OPENAI_API_KEY=your_openai_key (optional)
JWT_SECRET=your_jwt_secret
```

## Testing Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints at `https://your-backend-url.railway.app/api`
3. **Database**: Verify emails are being saved
4. **Email Sending**: Test with Ethereal or real SMTP

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure backend allows your frontend domain
2. **API Not Found**: Check environment variables and API URLs
3. **Database Connection**: Verify database credentials and network access
4. **Build Failures**: Check for TypeScript errors and missing dependencies

### Debug Steps:
1. Check Vercel deployment logs
2. Check backend deployment logs
3. Test API endpoints directly
4. Verify environment variables are set correctly

## Production Considerations

1. **Security**: Use strong JWT secrets and database passwords
2. **Performance**: Consider adding caching and CDN
3. **Monitoring**: Set up error tracking (Sentry, LogRocket)
4. **Backup**: Regular database backups
5. **SSL**: Ensure HTTPS is enabled

## Cost Estimation

- **Vercel**: Free tier (100GB bandwidth, unlimited static sites)
- **Railway**: $5/month for hobby plan
- **Database**: $0-20/month depending on provider
- **Total**: ~$5-25/month for small to medium usage
