# Quick Setup - SaaS Starter Kit

## 5-Minute Setup for New Project

### Step 1: Copy the Starter Kit

```bash
# From workspace root
cp -r starter-kit my-new-project
cd my-new-project
```

### Step 2: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up (it's free)
2. Click "Create a project"
3. Choose a region (Amsterdam is best for Dutch users)
4. Wait for database to be created
5. Copy the **Connection String** (it looks like `postgresql://user:pass@project-id.neon.tech/dbname?sslmode=require`)
6. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
7. Paste your Neon connection string into `.env` at `NEON_DATABASE_URL`

### Step 3: Install Dependencies & Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Neon database
npx prisma db push
```

### Step 4: Set Up NextAuth Secret

Generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and add it to `.env` at `NEXTAUTH_SECRET`

### Step 5: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

Choose default options (defaults are perfect for this setup).

### Step 6: Add UI Components

```bash
# Add components you need
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

Add whatever components you need for your specific project.

### Step 7: Customize

1. **App name:** Update `messages/en.json` and `messages/nl.json` → `"common.appName"`
2. **Database schema:** Edit `prisma/schema.prisma` if you need custom tables
3. **Run Prisma again:** After schema changes:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Step 8: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/en` or `http://localhost:3000/nl`

### Step 9: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard:
- `NEON_DATABASE_URL` (from Neon)
- `NEXTAUTH_SECRET` (generated earlier)
- `NEXTAUTH_URL` (use Vercel domain)

---

## Customization Checklist

For each new project, update these files:

- [ ] `messages/en.json` — All English text
- [ ] `messages/nl.json` — All Dutch text
- [ ] `prisma/schema.prisma` — Database tables for your domain
- [ ] `src/components/` — Custom components
- [ ] `src/app/[locale]/` — Your pages
- [ ] `README.md` — Project-specific documentation
- [ ] `package.json` — Update name and description

---

## What's Included Out of the Box

✅ **Authentication**
- Email/password login
- Session management
- Protected routes

✅ **Internationalization**
- Dutch (nl) and English (en)
- Language switcher component
- All text translatable

✅ **Database**
- Neon PostgreSQL ready
- Prisma ORM configured
- User accounts schema
- Subscription tables

✅ **Styling**
- Tailwind CSS
- shadcn/ui components
- Dark mode support

✅ **Dev Tools**
- TypeScript
- ESLint
- Pre-configured build

---

## File Structure Explained

```
my-new-project/
├── src/
│   ├── app/
│   │   └── [locale]/          # i18n routing
│   │       ├── (auth)/        # /login, /signup
│   │       ├── (dashboard)/   # /dashboard (requires login)
│   │       ├── (marketing)/   # /, /pricing (public)
│   │       ├── layout.tsx     # Root layout
│   │       └── page.tsx       # Home page
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── auth/              # Login/signup forms
│   │   ├── i18n/              # Language switcher
│   │   └── layout/            # Header, Footer
│   └── lib/
│       ├── auth.ts            # NextAuth config
│       ├── db.ts              # Prisma client
│       └── utils.ts           # Utilities
├── prisma/
│   └── schema.prisma          # Database schema
├── messages/
│   ├── en.json                # English translations
│   └── nl.json                # Dutch translations
└── .env                       # Environment variables
```

---

## Need Help?

Check these files:
- `README.md` — Full documentation
- `prisma/schema.prisma` — Database tables
- `messages/en.json` — Translation structure

Everything is TypeScript, so you'll get autocomplete and type safety!