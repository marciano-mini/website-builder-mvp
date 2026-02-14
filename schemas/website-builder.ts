// Website Builder Database Schema Extension

/*
SCHEMA OVERVIEW:
- User (bestaat al in starter-kit)
- Project (een website die een gebruiker aanmaakt)
- Page (pagina's binnen een project)
- Template (beschikbare templates)

PROJECT STRUCT:
- id, userId, name, slug, status (draft/published), templateId
- createdAt, updatedAt

PAGE STRUCT:
- id, projectId, title, slug, type (home/about/contact/product/etc)
- content (JSON met paginainhoud)
- order (volgorde in navigatie)
- isPublished
- createdAt, updatedAt

TEMPLATE STRUCT:
- id, name, description, category (info/business/webshop), previewImage
- structure (JSON met template layout)
- isFree (boolean, future premium feature)
- createdAt

10 TEMPLATES (5 categorieën × 2 templates):
INFO:
1. Portfolio (personal portfolio / cv)
2. Blog (simpel blog)

BUSINESS:
3. Small Business (restaurant/café/lokaal bedrijf)
4. Corporate (bedrijfssite met services)

WEBSHOP:
5. Simple Store (basis webshop met producten)
6. Digital Products (downloads/ebooks)

LIFESTYLE:
7. Event/Party (evenementen/party site)
8. Personal Brand (influencer/creator site)

CREATIVE:
9. Photographer/Artist (galerie)
10. Landing Page (product launch/announcement)

PAGE TYPES DIE WORDEN ONDERSTEUND:
- home (homepagina)
- about (over ons/over mij)
- contact (contactpagina)
- services (diensten pagina)
- blog (blog overzicht)
- pricing (prijzen pagina)
- gallery (galerie/producten)
- custom (custom pagina)
*/