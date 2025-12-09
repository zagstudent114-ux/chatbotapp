# 🚀 Quick Deployment Checklist

## ✅ Files Created for Deployment

### Configuration Files
- ✅ `netlify.toml` - Netlify build & deployment config
- ✅ `supabase/config.toml` - Supabase local development config
- ✅ `.env.example` - Environment variables template
- ✅ `DEPLOYMENT.md` - Complete step-by-step deployment guide

### Security Improvements
- ✅ Updated `.gitignore` - Secured environment variables
- ✅ Removed hardcoded Groq API key from `supabase/functions/chat/index.ts`
- ✅ API key now required via Supabase secrets

---

## 📝 Next Steps untuk Deploy

### 1️⃣ Supabase Backend (Estimasi: 15-20 menit)

```bash
# Install Supabase CLI
npm install -g supabase

# Login & link project
supabase login
supabase link --project-ref <YOUR_PROJECT_REF>

# Push database migrations
supabase db push

# Deploy Edge Functions
supabase functions deploy chat
supabase functions deploy process-document

# Set Groq API secret
supabase secrets set chatbot=<YOUR_GROQ_API_KEY>
```

**Get credentials:**
- Supabase Project: https://supabase.com/dashboard (create new project)
- Groq API Key: https://console.groq.com (free signup)

---

### 2️⃣ Netlify Frontend (Estimasi: 10 menit)

**Option A: Via GitHub (Recommended)**
```bash
# Initialize git
git init
git add .
git commit -m "Ready for deployment"

# Push to GitHub
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main

# Connect to Netlify
# 1. Login to https://app.netlify.com
# 2. Import from GitHub
# 3. Set build: npm run build, publish: dist
# 4. Add environment variables (see below)
```

**Option B: Manual Deploy**
```bash
npm run build
# Upload 'dist' folder to https://app.netlify.com/drop
```

**Environment Variables (Netlify Settings):**
```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

---

## 🔐 Security Reminders

⚠️ **IMPORTANT - Before Pushing to Git:**
- [ ] Verify `.env` is in `.gitignore`
- [ ] Never commit API keys or secrets
- [ ] Rotate Supabase keys jika pernah terexpose

**Current .env file status:**
- Contains production Supabase credentials
- Should be regenerated for security
- Replace with new credentials dari fresh Supabase project

---

## 🧪 Testing After Deployment

1. **Authentication**: Sign up & login
2. **Metrics**: Log fitness data
3. **Nutrition**: Log meals
4. **Charts**: View progress visualization  
5. **AI Chat**: Test chatbot dengan Groq API
6. **Knowledge Base**: Upload test document

---

## 💰 Cost (Free Tier)

- Supabase: $0/mo (500MB DB, 50K users)
- Netlify: $0/mo (100GB bandwidth)
- Groq API: $0/mo (30 req/min)

**Total: $0/month** untuk MVP

---

## 📚 Documentation

- **Full Guide**: See `DEPLOYMENT.md` untuk detailed instructions
- **Environment Setup**: See `.env.example` untuk template
- **Build Config**: See `netlify.toml` untuk Netlify settings
- **Supabase Config**: See `supabase/config.toml`

---

## 🐛 Common Issues

**Build fails**: Check environment variables di Netlify
**Function error 500**: Verify Groq API secret di Supabase
**Auth not working**: Check Supabase URL & anon key
**Database empty**: Run `supabase db push` untuk migrations

---

## 📞 Support

For detailed troubleshooting, see **DEPLOYMENT.md** section "Troubleshooting"

---

**Ready to deploy? Follow DEPLOYMENT.md step by step! 🚀**
