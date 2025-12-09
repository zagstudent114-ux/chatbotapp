# Deployment Guide: RAG-Powered Nutritionist Chatbot

Panduan lengkap untuk deploy aplikasi ke **Netlify** (frontend) dan **Supabase** (backend).

## 📋 Prerequisites

- Node.js 18.x atau 20.x
- npm atau yarn
- Git account
- Supabase account (gratis di https://supabase.com)
- Netlify account (gratis di https://netlify.com)
- Groq API Key (gratis di https://console.groq.com)

---

## 🗄️ Part 1: Supabase Backend Setup

### Step 1: Buat Supabase Project

1. Login ke https://supabase.com/dashboard
2. Klik **"New Project"**
3. Isi detail project:
   - **Name**: `nutrition-chatbot` (atau nama pilihan Anda)
   - **Database Password**: Simpan password ini dengan aman!
   - **Region**: Pilih yang terdekat (contoh: `Southeast Asia (Singapore)`)
4. Klik **"Create new project"** (tunggu ~2 menit untuk provisioning)

### Step 2: Install Supabase CLI

```bash
# Install Supabase CLI globally
npm install -g supabase

# Verify installation
supabase --version
```

### Step 3: Login & Link Project

```bash
# Login ke Supabase
supabase login

# Link project ke local directory
cd chatbot
supabase link --project-ref <YOUR_PROJECT_REF>
```

**Note**: Project ref bisa ditemukan di URL dashboard: `https://supabase.com/dashboard/project/<PROJECT_REF>`

### Step 4: Push Database Migrations

Migrations akan membuat 5 tabel utama + pgvector extension:

```bash
# Push semua migrations ke database
supabase db push

# Verify migrations berhasil
supabase db diff
```

**Expected Tables Created:**
- ✅ `athletes` - User profiles
- ✅ `fitness_metrics` - Body composition tracking
- ✅ `nutrition_logs` - Meal tracking
- ✅ `chat_messages` - Chat history
- ✅ `knowledge_base` - RAG document storage

### Step 5: Deploy Edge Functions

```bash
# Deploy chat function (AI chatbot)
supabase functions deploy chat

# Deploy process-document function (knowledge base)
supabase functions deploy process-document
```

### Step 6: Set Groq API Secret

```bash
# Set Groq API key as secret
supabase secrets set chatbot=<YOUR_GROQ_API_KEY>

# Verify secret is set
supabase secrets list
```

**Get Groq API Key:**
1. Go to https://console.groq.com
2. Create account (gratis)
3. Navigate to **API Keys**
4. Create new API key
5. Copy the key (format: `gsk_...`)

### Step 7: Get Supabase Credentials

Dari Supabase Dashboard, ambil credentials:

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://<project-ref>.supabase.co`
   - **anon/public key**: Key untuk client-side

**Simpan credentials ini untuk Netlify setup!**

---

## 🌐 Part 2: Netlify Frontend Deployment

### Option A: Deploy via Git (Recommended)

#### Step 1: Initialize Git Repository

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for deployment"

# Create GitHub repository dan push
git remote add origin https://github.com/<username>/<repo-name>.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Netlify

1. Login ke https://app.netlify.com
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **GitHub** dan authorize
4. Select repository Anda
5. Configure build settings:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20

#### Step 3: Add Environment Variables

Di Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add variables:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

3. Klik **"Save"**

#### Step 4: Deploy

1. Klik **"Deploy site"**
2. Tunggu build selesai (~2-3 menit)
3. Site akan live di `https://<random-name>.netlify.app`

#### Step 5: Custom Domain (Optional)

1. Go to **Domain settings**
2. Klik **"Add custom domain"**
3. Follow instructions untuk setup DNS

---

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Set environment variables
netlify env:set VITE_SUPABASE_URL "https://<project-ref>.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "<your-anon-key>"

# Deploy to production
netlify deploy --prod
```

---

### Option C: Manual Deploy (Drag & Drop)

```bash
# Build project locally
npm install
npm run build

# Upload dist folder
# 1. Go to https://app.netlify.com/drop
# 2. Drag and drop the 'dist' folder
# 3. Set environment variables in site settings
```

---

## ✅ Post-Deployment Testing

### 1. Test Authentication

- [ ] Navigate to deployed site
- [ ] Click **"Sign Up"**
- [ ] Create account dengan email
- [ ] Verify email di inbox
- [ ] Login dengan credentials

### 2. Test Core Features

- [ ] **Log Metrics**: Add weight, body fat, performance scores
- [ ] **Log Nutrition**: Add meal dengan calories & macros
- [ ] **View Charts**: Verify data visualization
- [ ] **AI Chat**: Ask nutrition question
- [ ] **Knowledge Base**: Upload test document

### 3. Verify Edge Functions

```bash
# Test chat function
curl -X POST https://<project-ref>.supabase.co/functions/v1/chat \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"message":"What is protein?","athlete_id":"<test-user-id>"}'

# Check function logs
supabase functions logs chat
```

### 4. Monitor Performance

**Netlify:**
- Dashboard → **Analytics** → Check response times
- Check **Build logs** untuk errors

**Supabase:**
- Dashboard → **Database** → Check table row counts
- Dashboard → **Edge Functions** → Check invocations
- Dashboard → **Auth** → Verify user count

---

## 🔒 Security Checklist

- [x] `.env` file excluded dari git
- [x] Groq API key di Supabase Secrets (tidak hardcoded)
- [x] Row Level Security (RLS) enabled pada semua tables
- [x] HTTPS enabled (automatic di Netlify)
- [x] CORS headers configured di Edge Functions
- [ ] **IMPORTANT**: Rotate Supabase keys jika pernah tercommit ke git
- [ ] Setup rate limiting untuk Edge Functions (optional)

### Rotate Supabase Keys (Jika Terexpose)

1. Go to Supabase Dashboard → **Settings** → **API**
2. Scroll to **Project API keys**
3. Klik **"Reset"** pada anon key
4. Update environment variables di Netlify
5. Redeploy

---

## 💰 Cost Breakdown

### Free Tier Limits

**Supabase Free Tier:**
- ✅ 500 MB database storage
- ✅ 50,000 monthly active users
- ✅ 2 GB bandwidth/month
- ✅ 500K Edge Function invocations/month
- ⚠️ Project pauses after 1 week inactivity (free tier)

**Netlify Free Tier:**
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS
- ✅ Continuous deployment from Git

**Groq API Free Tier:**
- ✅ 30 requests per minute
- ✅ 14,400 requests per day
- ✅ Llama 3.1 8B Instant model
- ⚠️ Upgrade required untuk higher limits

**Total Monthly Cost: $0** (dalam free tier limits)

### When to Upgrade

**Upgrade Supabase ($25/mo Pro):**
- Database > 500 MB
- Need custom domain
- Want daily backups
- Remove inactivity pausing

**Upgrade Netlify ($19/mo Pro):**
- Bandwidth > 100 GB/month
- Need advanced analytics
- Password-protected sites

**Upgrade Groq (Contact Sales):**
- Need > 30 req/min
- Production SLA required

---

## 🐛 Troubleshooting

### Build Fails di Netlify

```bash
# Check build logs di Netlify dashboard
# Common issues:
1. Missing environment variables → Add to Netlify settings
2. Node version mismatch → Set NODE_VERSION=20 in netlify.toml
3. TypeScript errors → Run `npm run typecheck` locally
```

### Edge Functions Error 500

```bash
# Check function logs
supabase functions logs chat --limit 50

# Common issues:
1. Missing Groq API secret → Run `supabase secrets set chatbot=<key>`
2. CORS issues → Verify corsHeaders in function code
3. Database connection → Check SUPABASE_URL env var
```

### Authentication Not Working

```bash
# Verify Supabase config
1. Check .env file has correct VITE_SUPABASE_URL
2. Check anon key is correct
3. Verify email confirmation settings in Supabase Auth
```

### Database Migration Failed

```bash
# Reset and retry
supabase db reset
supabase db push

# Or manually run migrations in order:
# 1. 20251123170752_create_initial_schema.sql
# 2. 20251124053643_fix_security_issues.sql
# 3. 20251124053833_complete_security_fixes.sql
# 4. 20251124121947_fix_athletes_insert_policy.sql
# 5. 20251127030703_add_admin_role_system.sql
```

---

## 📚 Useful Commands

```bash
# Local development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview                # Preview production build
npm run typecheck              # Check TypeScript errors

# Supabase
supabase status                # Check local Supabase status
supabase db diff               # Check database changes
supabase db reset              # Reset local database
supabase functions serve       # Test functions locally
supabase gen types typescript  # Generate TypeScript types

# Netlify
netlify dev                    # Run local dev server
netlify deploy                 # Deploy to draft URL
netlify deploy --prod          # Deploy to production
netlify open                   # Open site in browser
```

---

## 🚀 Next Steps

After successful deployment:

1. **Add Sample Data**: Login dan create sample metrics/nutrition logs
2. **Upload Knowledge Base**: Add nutrition guidelines untuk RAG
3. **Test AI Chat**: Verify Groq API integration working
4. **Setup Monitoring**: Configure alerts di Supabase/Netlify
5. **Custom Domain**: Add custom domain di Netlify (optional)
6. **Backup Strategy**: Setup automated backups (Pro tier)

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Groq API Docs**: https://console.groq.com/docs
- **Project Issues**: Create issue di GitHub repository

---

## 📄 License

MIT License - Feel free to use for your projects!
