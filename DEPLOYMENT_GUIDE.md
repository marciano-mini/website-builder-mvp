# Website Builder MVP - Deployment Guide

## Status
✅ Code is ready for deployment
✅ TypeScript errors fixed
✅ Build successful
✅ Prisma configured for Neon database

## What Was Fixed
1. **TypeScript errors in ProjectList.tsx**: Changed callback functions to return Promise<void>
2. **TypeScript errors in auth.ts**: Added proper type assertions for credentials and token
3. **Prisma configuration**: Updated to use @prisma/adapter-neon for Neon database compatibility
4. **Environment variables**: Added both DATABASE_URL and NEON_DATABASE_URL to .env

## Deployment Steps

### Step 1: Create GitHub Repository (Manual)
Since automated GitHub repository creation requires a personal access token, please create it manually:

1. Go to https://github.com/new
2. Repository name: `website-builder-mvp`
3. Description: `Website Builder MVP - Create stunning websites in minutes`
4. Visibility: Public or Private (your choice)
5. Click "Create repository"

Then push the code:
```bash
cd /Users/mini/.openclaw/workspace/website-builder

# Add remote (replace with your URL from GitHub)
git remote add origin https://github.com/marciano-mini/website-builder-mvp.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Create Neon Database

1. Go to https://neon.tech
2. Click "Sign in" or create an account
3. Click "Create a project"
4. Project name: `website-builder-mvp`
5. Region: Select closest to your users (e.g., Frankfurt for EU)
6. PostgreSQL version: Default
7. Click "Create Project"

**Get the connection string:**
- After project creation, you'll see a connection string like:
  `postgresql://[user]:[password]@[project-id].postgres.neon.tech/neondb?sslmode=require`
- Copy this - you'll need it for Vercel

### Step 3: Deploy to Vercel

Option A: **From Vercel Dashboard** (Recommended)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `website-builder-mvp` from GitHub
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)

Option B: **From Vercel CLI**
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login
vercel login

# From website-builder directory
vercel
```

**Environment Variables** (Required):
Add these in Vercel → Project → Settings → Environment Variables:

```
DATABASE_URL = <paste your Neon connection string here>
NEON_DATABASE_URL = <paste your Neon connection string here>
NEXTAUTH_SECRET = kUv8XR4bIWXJgXXjPIOQpTCtGDEJEY0gN1/lUfdtbMA=
NEXTAUTH_URL = <your Vercel project URL, e.g., https://website-builder-mvp.vercel.app>
```

**Deploy:**
Click "Deploy" button and wait ~2-3 minutes.

### Step 4: Seed Database with Templates

The application has 17 ready-to-use templates. You need to seed the database:

**Option 1: Using Vercel CLI**
```bash
# Pull environment variables
cd /Users/mini/.openclaw/workspace/website-builder
vercel env pull .env.local

# Seed database
npm run db:seed
```

**Option 2: Using Neon SQL Editor**
1. Go to Neon → Your Project → SQL Editor
2. Copy the seed script from: `prisma/seed.ts`
3. Run the SQL commands in the editor
4. Verify with: `SELECT * FROM "Template";`

**Option 3: Using Vercel Web Terminal**
1. Go to Vercel → Your Project → Deployments
2. Click on the latest deployment
3. Click "Console" → "Console"
4. Run:
   ```bash
   npm run db:seed
   ```

### Step 5: Test the Deployed Site

1. **Visit your Vercel URL** (e.g., https://website-builder-mvp.vercel.app)
2. **Register an account**
   - Click "Register" or "Sign Up"
   - Enter email and password
   - Submit
3. **Create a website**
   - Go to Dashboard
   - Click "New Project"
   - Select a template (Restaurant, Salon, etc.)
   - Enter project name and slug
   - Click "Create"
4. **Edit pages**
   - Add content to your pages
   - Customize text
   - Add sections
5. **Publish**
   - Click "Publish" button
   - Visit the public URL: `https://your-site.vercel.app/your-slug`

## Project Structure

```
website-builder/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Template seeding script
├── src/
│   ├── app/
│   │   ├── [site]/            # Dynamic site routing
│   │   ├── api/               # API routes
│   │   ├── dashboard          # User dashboard
│   │   └── projects           # Project management
│   ├── components/
│   │   ├── website-builder/   # Desktop editor
│   │   └── mobile/            # Mobile editor
│   └── lib/
│       ├── auth.ts            # NextAuth configuration
│       └── db.ts              # Prisma client
└── .env                       # Environment variables
```

## Available Templates (17)

After seeding, these templates will be available:

**Horeca:**
- Restaurant
- Café
- Catering

**Webshop:**
- E-commerce
- Fashion Store

**Bouw:**
- Construction
- Interior Design

**Beauty:**
- Hair Salon
- Spa

**Fitness:**
- Gym
- Personal Trainer

**Professionals:**
- Consulting
- Real Estate
- Photography
- Portfolio
- Dental
- Legal

## Key Features

✅ **User Authentication** - Email/Password login
✅ **Template Selection** - 17 industry templates
✅ **Visual Editor** - Edit website content visually
✅ **Page Management** - Create and edit multiple pages
✅ **Publish/Unpublish** - Control site visibility
✅ **Slug-Based Routing** - Clean URLs like `/my-restaurant`
✅ **Mobile Support** - Responsive design
✅ **Multi-language** - English & Dutch

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon connection string | `postgresql://user:pass@...` |
| `NEON_DATABASE_URL` | Neon connection string (alt) | Same as DATABASE_URL |
| `NEXTAUTH_SECRET` | Auth session secret | `kUv8XR4bIWXJgXXjPIOQpTCtGDEJEY0gN1/lUfdtbMA=` |
| `NEXTAUTH_URL` | Your app URL | `https://website-builder-mvp.vercel.app` |

## Troubleshooting

### "Database connection failed"
- Verify Neon connection string in Vercel environment variables
- Check that the Neon project is active
- Ensure you've seeded the database

### "Cannot find module @prisma/adapter-neon"
- Run: `npm install @prisma/adapter-neon @neondatabase/serverless`

### "NEXTAUTH_SECRET required"
- Add to Vercel environment variables
- Generate new one: `openssl rand -base64 32`

### "404 on /your-slug"
- Make sure the project is published (status = "published")
- Check that the slug matches

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build` locally first

## Performance Tips

1. **Database queries are optimized** with Prisma selects
2. **Next.js caching** is automatically handled by Vercel
3. **Images** should be optimized (Next.js Image component)
4. **Static generation** where possible (marked with ○ in build output)

## Cost Estimate

**Vercel (Hobby Plan):**
- ✅ Free
- 100GB bandwidth
- Unlimited deployments

**Neon (Free Tier):**
- ✅ Free
- 512MB storage
- 3 hours compute/month

**Total: $0/month**

## Next Steps After Deployment

1. ✅ Test user registration
2. ✅ Create a test website
3. ✅ Publish a website
4. ⏭️ Add Google OAuth (optional)
5. ⏭️ Configure custom domain (optional)
6. ⏭️ Add analytics (optional)

## Support & Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Neon Docs:** https://neon.tech/docs
- **NextAuth Docs:** https://authjs.dev
- **Prisma Docs:** https://www.prisma.io/docs

---

**Created:** 2026-02-14
**Status:** Ready for deployment ✅
**Target:** Marciano - for testing website builder MVP