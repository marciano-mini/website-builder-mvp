# Website Builder - 15 Industrie-Specifieke Templates

Maak je professionele website in minuten met branche-specifieke templates voor Nederlandse bedrijven.

## 🚀 Professionele Websites voor NL Bedrijven

Gebruikers kunnen:
- ✅ **Snel account aanmaken** — < 2 minuten
- ✅ **Kies uit 15 professionele templates** — Per branche
- ✅ **Upload eigen informatie** — Tekst, afbeeldingen, contact
- ✅ **Website live als /**`slug`** — `jouw-domein.nl/mijn-restaurant`
- ✅ **Bewerk pagina's** — Verander content naar wens

## 🏭 De 15 Industrie Templates

### HORECA (2 templates)
1. 🍽️ **Restaurant** — Volledige restaurant website met menu, reserveringen, locatie
2. ☕ **Café / Koffiehuis** — Gezellig café met openingstijden, menu, sfeer

### E-COMMERCE (2 templates)
3. 👗 **Fashion Store** — Moderne mode webshop met categoriën & producten
4. 💻 **Digital Products Store** — Ebooks, cursussen, downloads

### BOUW (2 templates)
5. 🏗️ **Bouwbedrijf** — Bouwbedrijf met project portfolio
6. 🏠 **Aannemer** — Zelfstandige aannemer voor woningrenovatie

### BEAUTY & WELLNESS (2 templates)
7. 💇‍♀️ **Kappersalon** — Kapsel, diensten, prijzen, afspraak
8. 💅 **Schoonheidssalon** — Volledige schoonheidssalon met behandelingen

### FITNESS & GEZONDHEID (2 templates)
9. 🏋️ **Fitness / Gym** — Fitnesscentrum met lessen, prijzen
10. 🧘 **Yoga Studio** — Yoga & wellness met lessenrooster

### ZAKELIJK ADVIES (2 templates)
11. 👔 **Advocatenkantoor** — Rechtsgebieden, team profielen
12. 🏢 **Makelaar** — Woningaanbod, diensten

### FREELANCE / ZZP (2 templates)
13. 🌟 **Life Coach** — Persoonlijke coaching, testimonials
14. 🔧 **ZZP Bouw** — Bouwer en klusjesman, portfolio

### SPECIALISTEN (3 templates)
15. 🩺 **Fysiotherapeut** — Behandelingen, verzekering info
16. 🚗 **Auto Garage** — Diensten, prijzen, afspraak maken
17. 💻 **IT Bureau / Software** — IT diensten, software oplossingen

## 🎯 User Flow (2 minuten)

**Stap 1: Account aanmaken** (30 seconden)
```
Naam
Email
Wachtwoord
→ Account aangemaakt
```

**Stap 2: Selecteer branche** (15 seconden)
```
Kies: Restaurant, Café, Webshop, Bouw, Kapper, etc.
→ Juiste template geselecteerd
```

**Stap 3: Vul je informatie in** (45 seconden)
```
Bedrijfsnaam: "De Gezellige Eetkamer"
Beschrijving: "Authentiek Italiaans restaurant..."
Contact: adres, email, telefoon
Openingstijden / menu / prijzen
→ Website live!
```

**Stap 4: Publiceren** (10 seconden)
```
Klik op "Publiceren"
→ Website beschikbaar op:
https://jouw-domein.nl/de-gezellige-eetkamer
```

## 🌐 Website URL Structuur

Alle websites hebben een unieke **slug**:
```
https://mijnwebsite.nl/[slug]

Voorbeelden:
→ https://mijnwebsite.nl/het-rosse-cafe
→ https://mijnwebsite.nl/builders-nederland
→ https://mijnwebsite.nl/fysio-kracht
```

**Slug generatie:**
- Automatisch van bedrijfsnaam
- `"De Top Kapper"` → `"de-top-kapper"`
- Uniek (nummers bij duplicaten)
- URL-vriendelijk (lowercase, letters/nummers/-)

## 📁 Tech Stack

- **Backend:** Next.js 14 API routes
- **Database:** Neon PostgreSQL
- **ORM:** Prisma
- **i18n:** Nederlands + Engels
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js v5

## 🗄️ Database Schema

```typescript
Template {
  id, name, nameNL
  category: horeca|webshop|bouw|beauty|fitness|zakelijk|diensten|specialisten
  structure: JSON
}

Project {
  id, userId, name, slug, status: draft|published
  templateId
}

Page {
  id, projectId, title, slug, type
  content: JSON
  isPublished
}
```

## 🔧 Quick Start

```bash
cd website-builder

# 1. Database setup
cp .env.example .env
# Add Neon Database URL

# 2. Prisma + seed templates
npx prisma generate
npx prisma db push
npm run db:seed

# 3. Start
npm run dev
```

## 📊 API Routes

**Templates:**
- `GET /api/templates` — Alle 15 templates
- `GET /api/templates?category=horeca` — Per categorie
- `GET /api/templates?categories=true` — Categorie lijst

**Projecten:** (Nog te bouwen)
- `POST /api/projects` — Maak project + slug
- `GET /api/projects` — Lijst projecten
- `PUT /api/projects/[id]` — Update project
- `DELETE /api/projects/[id]` — Verwijder project

**Pagina's:** (Nog te bouwen)
- `POST /api/projects/[id]/pages` — Maak pagina
- `PUT /api/projects/[id]/pages/[pageId]` — Update pagina
- `DELETE /api/projects/[id]/pages/[pageId]` — Verwijder pagina

**Publicatie:** (Nog te bouwen)
- `POST /api/projects/[id]/publish` — Publiceer
- `POST /api/projects/[id]/unpublish` — Depubliceer

## 🎨 Template Content

Elke template heeft **pre-gevulde content** die gebruikers kunnen aanpassen:

**Restaurant template:**
```json
{
  "home": {
    "hero": "Welkom bij [Restaurant Naam] — Authentiek eten",
    "cta": "Reserveer nu",
    "tagline": "Passie voor smaak"
  },
  "menu": {
    "title": "Ons Menu",
    "categories": ["Voorgerechten", "Hoofdgerechten", "Nagerechten"]
  }
}
```

**Gym template:**
```json
{
  "home": {
    "hero": "Word de beste versie van jezelf",
    "cta": "Proefles gratis"
  }
}
```

Gebruikers bewerken deze content in de editor.

## 🚀 Public Flow

**1. Gebruiker maakt account**
```
POST /api/auth/signup
→ User aangemaakt
```

**2. Gebruiker kiest template**
```
GET /api/templates?category=horeca
→ "Restaurant" template geselecteerd
```

**3. Gebruiker vult informatie in**
```
POST /api/projects
{
  "name": "Pizzeria Napoli",
  "description": "Authentiek Italiaans",
  "templateId": "restaurant"
}
→ Project aangemaakt
→ Slug: "pizzeria-napoli"
→ Pages created from template structure
```

**4. Gebruiker past pagina's aan**
```
PUT /api/projects/[id]/pages/[pageId]/content
{
  "hero": "De beste pizza's van Amsterdam",
  "cta": "Nu bestellen"
}
→ Content bijgewerkt
```

**5. Gebruiker publiceert**
```
POST /api/projects/[id]/publish
→ status = "published"
→ Website live: /pizzeria-napoli
```

**6. Bezoekers kunnen bekijken**
```
GET /pizzeria-napoli
→ Public homepage wordt loaded
→ Gepubliceerde pagina's available
```

## 🔑 Belangrijke Features

**Slug System:**
✅ Uniek per project
✅ URL-vriendelijk
✅ Validatie op invoer
✅ Dubbele slugs met nummers (`naam-2`)

**Template Content:**
✅ Pre-gevuld industrie-specifieke content
✅ Customizable door gebruiker
✅ JSON structuur - makkelijk editen

**Categorieën:**
✅ 8 categorieën
✅ Per 2+ templates
✅ Groepering makkelijk maken

**Publicatie:**
✅ Draft vs Published status
✅ Preview functionaliteit
✅ Een klik live

## 📚 Industry Categorieën

```typescript
const categories = [
  { horeca: "Restaurants, cafés, catering" },
  { webshop: "E-commerce, digitale producten" },
  { bouw: "Bouwbedrijven, aannemers" },
  { beauty: "Kappers, schoonheidssalons" },
  { fitness: "Gyms, yoga, wellness" },
  { zakelijk: "Advocaten, makelaars" },
  { diensten: "Coaches, ZZP'ers" },
  { specialisten: "Medisch, auto, IT" }
]
```

## 🎯 Voorbeeld URLs

```
https://website-builder.nl/de-gezellige-eetkamer        (Restaurant)
https://website-builder.nl/bouwmeesters               (Bouwbedrijf)
https://website-builder.nl/pure-hair-studio            (Kapper)
https://website-builder.nl/amsterdam-yoga              (Yoga Studio)
https://website-builder.nl/build-it-nl                 (IT Bureau)
```

## 📝 Nog te bouwen

**API Routes:** ✅ Templates done
- [ ] POST /api/projects
- [ ] GET /api/projects
- [ ] PUT /api/projects/[id]
- [ ] DELETE /api/projects/[id]
- [ ] POST /api/projects/[id]/pages
- [ ] PUT /api/projects/[id]/pages/[pageId]
- [ ] DELETE /api/projects/[id]/pages/[pageId]
- [ ] POST /api/projects/[id]/publish

**Frontend:** ⭐ Volgende stap
- [ ] Dashboard met projecten
- [ ] Template selector UI
- [ ] Nieuw project formulier
- [ ] Page editor
- [ ] Publish button

**Project URL Routing:** ✅ /slug layout done
- [ ] Individual page routing (/slug/page)
- [ ] Navigation menu per project

---

**Status:** Database schema + 15 templates + API routes + slug routing = Ready for frontend!