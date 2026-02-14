# Website Builder - Deployment Guide

Deploy naar **Vercel** met **Neon PostgreSQL** database.

## Prerequisites

- GitHub account (for Vercel integration)
- Vercel account (free)
- Neon account (free)

## Stap 1: Push Code naar GitHub

```bash
cd website-builder

# Git opzetten
git init
git add .
git commit -m "Initial commit: Website Builder MVP"

# Maak repo op GitHub
# Kies eigen naam of "website-builder-mvp"

# Push aanpassingen (volg GitHub instructies)
git branch -M main
git remote add origin <jouw-github-repo-url>
git push -u origin main
```

## Stap 2: Neon Database Setup

1. Ga naar [neon.tech](https://neon.tech)
2. Log in of maak account
3. Klik "New Project"
4. Configureer:
   - **Project name:** `website-builder-db`
   - **Region:** Amsterdam (of EU)
   - **PostgreSQL version:** Laat default
5. Klik "Create Project"
6. Wacht op database creatie
7. Kopieer de **Connection String**: `postgresql://[user]:[password]@[project-id].postgres.neon.tech/neondb?sslmode=require`

## Stap 3: Database Seed op Local

```bash
cd website-builder

# Maak .env.local file
cp .env.example .env.local

# Voeg toe aan .env.local:
NEON_DATABASE_URL=<jouw-neon-connection-string>
NEXTAUTH_SECRET=<genereren met: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=(optioneel)
GOOGLE_CLIENT_SECRET=(optioneel)

# Prisma setup
npx prisma generate
npx prisma db push

# Load templates in database
npm run db:seed

# Test local
npm run dev
# Ga naar http://localhost:3000
# Registreer, maak website, test!
```

## Stap 4: Deploy naar Vercel

### 4.1 Verbind Vercel met GitHub

1. Ga naar [vercel.com](https://vercel.com) en log in (of maak account)
2. Klik "Add New Project"
3. Kies "Import Git Repository"
4. Selecteer je GitHub repo

### 4.2 Configureer Project

**Environment Variables** (voeg alle toe):

```
NEON_DATABASE_URL = <neon-connection-string>
NEXTAUTH_SECRET = <self-generated-secret>
NEXTAUTH_URL = <jouw-vercel-project-url>
```

**Andere settings:**
- **Framework Preset:** Next.js
- **Root Directory:** `./` (empty)
- **Ignore:** Laat default
- **Command:** `npm run build`
- **Install command:** `npm install`

Klik "Deploy"

### 4.3 Wacht op Deploy

Vercel zal:
1. Code downloaden
2. `npm install` runnen
3. `npm run build` runnen
4. Deploy complete

## Stap 5: Post-Deploy Setup

### 5.1 Seed Database op Vercel

Since Vercel doesn't run seed scripts automatically, ik moet databases een keer seeden:

**Option 1: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Open project terminal
vercel env pull .env.local

# Seed database
npm run db:seed
```

**Option 2: Database Studio**
Gebruik Neon database studio:
1. Ga naar Neon projects → jouw project → SQL Editor
2. Run `SELECT * FROM Template;` (should be empty initially)
3. Run a one-time seed (copy from prisma/seed.ts)
4. Save

### 5.2 Test deployed website

1. Ga naar jouw Vercel project URL
2. Klik "Register"
3. Maak account aan
4. Kies template (Restaurant, etc.)
5. Vul details
6. Publish
7. Visit `/your-slug`

## Stap 6: Configureer Auth (indien Google auth)

Als je Google OAuth wilt:

1. Ga naar [Google Cloud Console](https://console.cloud.google.com)
2. Create new project of existing
3. Ga to: APIs & Services → Credentials
4. Create credentials → OAuth 2.0 Client ID
5. Configure:
   - **Authorized JavaScript origins:** jouw Vercel URL
   - **Authorized redirect URIs:**
     - `https://jouw-domein.vercel.app/api/auth/callback/google`
     - `https://jouw-domein.vercel.app`

6. Copy Client ID en Client Secret
7. Add aan Vercel environment variables:
   ```
   GOOGLE_CLIENT_ID = <client-id>
   GOOGLE_CLIENT_SECRET = <client-secret>
   ```
8. Redeploy

## Stap 7: Custom Domain (Optioneel)

Als je eigen domein wilt:

1. Buy domain (bij Voorbeeld: "mijnwebsite.nl")
2. In Vercel project → Settings → Domains
3. Add domain: `mijnwebsite.nl`
4. Vercel geeft DNS settings
5. Point DNS aan Vercel
6. Update NEXTAUTH_URL omgeving variable:
   ```
   NEXTAUTH_URL = https://mijnwebsite.nl
   ```

## Verifiëer Deployment

Check alles werkt:

```bash
# 1. Homepage laden
https://your-site.vercel.app

# 2. Registratie mogelijk
https://your-site.vercel.app/sign-up

# 3. Dashboard werkt na login
https://your-site.vercel.app/dashboard

# 4. Nieuwe project template selector werkt
https://your-site.vercel.app/projects/new

# 5. API routes werken
curl https://your-site.vercel.app/api/templates
# Should return all 17 templates

# 6. Public URL routing werkt
curl https://your-site.vercel.app/test-slug
# (als gepubliceerd)
```

## Common Issues & Solutions

### "Database connection failed"
- Check Neon connection string
- Verify database exists in Neon console
- Check Vercel environment variables

### "NEXTAUTH_SECRET required"
- Generate: `openssl rand -base64 32`
- Add to Vercel environment variables
- Redeploy

### "Template not found"
- Run `npm run db:seed` in local Vercel terminal or
- Use Neon SQL Editor to seed

### "Cannot find module bcrypt"
- Already fixed in next.config.ts with `experimental.serverComponentsExternalPackages`

### "Route not found /dashboard"
- Check auth state
- Verify user session in browser dev tools

### "/slug route returns 404"
- Verify project is published
- Check slug uniqueness
- Navigate to `/slug` directly

## Monitoring

**Vercel:**
- Check deployment logs
- Monitor performance
- View Analytics (free tier)

**Neon:**
- Monitor database usage
- Check slow queries
- View connection logs

## Performance Tips

1. **Database queries:**
   - Use Prisma `select` voor specific fields only
   - Add indexes zwaar gebruik (al in schema.prisma)

2. **Next.js:**
   - Vercel automatiseert caching
   - Static revalidatie als nodig

3. **Images:**
   - Use Next.js Image component voor optimalisatie

## Cost Estimate (Free Tier)

**Vercel (Hobby Plan):**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth
- ✅ CDN
- ✅ Git integration

**Neon (Free Tier):**
- ✅ 512MB storage
- ✅ 3 hours compute/month (verhoogbaar als groeien)

**Per maand:** $0 (betaal alleen als schalen)

## Scale Plan

Bij groei (betaalde):

1. **Vercel:** $20/month (Pro) → More bandwidth, faster builds
2. **Neon:** $19/month (Starter) → Faster database, more storage

## Production Checklist

Voordat live aan gebruikers:

- [x] Environment variables configured
- [x] Database seeded with templates
- [x] Auth flows tested (login, register, logout)
- [x] API routes tested
- [x] Public routes tested
- [x] Slug routing tested
- [x Mobile responsiveness tested
- [x ] Custom domain configured (optioneel)
- [ ] SEO metadata added (later)
- [ ] Analytics configured (later)

## Support

**Vercel Docs:** https://vercel.com/docs
**Neon Docs:** https://neon.tech/docs
**Next.js Docs:** https://nextjs.org/docs
**Prisma Docs:** https://www.prisma.io/docs

---

**Gemaakt voor:** Marciano's Website Builder MVP
**Status:** Ready for deployment ✅