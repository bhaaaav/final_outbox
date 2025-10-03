# 🚀 Deployment Checklist

## ✅ **Pre-Deployment Setup**

### **1. Backend Deployment (Railway)**
- [ ] Go to [railway.app](https://railway.app)
- [ ] Sign up/Login with GitHub
- [ ] Click "New Project" → "Deploy from GitHub repo"
- [ ] Select repository: `bhaaaav/final_outbox`
- [ ] Set Root Directory: `backend`
- [ ] Add Environment Variables:
  ```
  DB_HOST=your_mysql_host
  DB_USER=your_mysql_user
  DB_PASSWORD=your_mysql_password
  DB_NAME=email_app
  JWT_SECRET=your-super-secret-jwt-key
  OPENAI_API_KEY=your-openai-key (optional)
  ```
- [ ] Click "Deploy"
- [ ] **Copy Backend URL**: `https://your-app.railway.app`

### **2. Database Setup**
**Option A: Railway MySQL**
- [ ] In Railway dashboard: "New" → "Database" → "MySQL"
- [ ] Copy connection details
- [ ] Update backend environment variables

**Option B: PlanetScale (Free)**
- [ ] Go to [planetscale.com](https://planetscale.com)
- [ ] Create account and database
- [ ] Get connection string
- [ ] Update backend environment variables

### **3. Frontend Deployment (Vercel)**
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up/Login with GitHub
- [ ] Click "New Project"
- [ ] Import repository: `bhaaaav/final_outbox`
- [ ] Set Framework: Create React App
- [ ] Set Root Directory: `frontend`
- [ ] Add Environment Variable:
  ```
  REACT_APP_API_URL=https://your-backend-url.railway.app/api
  ```
- [ ] Click "Deploy"
- [ ] **Copy Frontend URL**: `https://your-app.vercel.app`

## 🧪 **Testing Your Deployment**

### **4. Test Backend**
- [ ] Visit: `https://your-backend-url.railway.app/api/health`
- [ ] Should return: `{"status":"ok","timestamp":"..."}`
- [ ] Test API docs: `https://your-backend-url.railway.app/api/docs`

### **5. Test Frontend**
- [ ] Visit your Vercel URL
- [ ] Register a new account
- [ ] Login successfully
- [ ] Try composing an email
- [ ] Test spam score feature
- [ ] Test GPT refinement (if OpenAI key is set)
- [ ] Send an email and check if it appears in inbox

## 🔧 **Troubleshooting**

### **Common Issues:**
1. **CORS Errors**: Backend needs to allow Vercel domain
2. **API Not Found**: Check `REACT_APP_API_URL` environment variable
3. **Database Connection**: Verify database credentials
4. **Build Failures**: Check for TypeScript errors

### **Debug Commands:**
```bash
# Test backend locally
cd backend
npm run dev

# Test frontend locally
cd frontend
npm start
```

## 📊 **Cost Estimation**
- **Vercel**: Free (100GB bandwidth)
- **Railway**: $5/month (hobby plan)
- **Database**: $0-20/month
- **Total**: ~$5-25/month

## 🎯 **Success Criteria**
- [ ] Frontend loads without errors
- [ ] User can register and login
- [ ] Email composition works
- [ ] Spam scoring works
- [ ] GPT refinement works (if configured)
- [ ] Emails are sent and received
- [ ] Database stores emails correctly

## 📞 **Need Help?**
- Check Railway logs for backend issues
- Check Vercel logs for frontend issues
- Verify environment variables are set correctly
- Test API endpoints directly with Postman/curl
