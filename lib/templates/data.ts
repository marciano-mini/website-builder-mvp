// 10 Templates for Website Builder

export const templates = [
  // INFO CATEGORY
  {
    id: "template-portfolio",
    name: "Personal Portfolio",
    nameNL: "Persoonlijk Portfolio",
    description: "Showcase your work and skills with a clean, professional portfolio",
    descriptionNL: "Presenteer je werk en vaardigheden met een schoon, professioneel portfolio",
    category: "info",
    structure: {
      pages: ["home", "about", "contact"],
      style: "minimal",
      colors: ["#1a1a1a", "#ff6b6b", "#4ecdc4"]
    }
  },
  {
    id: "template-blog",
    name: "Personal Blog",
    nameNL: "Persoonlijke Blog",
    description: "Simple, readable blog for sharing your thoughts and stories",
    descriptionNL: "Simpele, leesbare blog om je gedachten en verhalen te delen",
    category: "info",
    structure: {
      pages: ["home", "about", "contact"],
      style: "typography-focused",
      colors: ["#2d3436", "#74b9ff", "#dfe6e9"]
    }
  },

  // BUSINESS CATEGORY
  {
    id: "template-small-business",
    name: "Small Business",
    nameNL: "Klein Bedrijf",
    description: "Perfect for local businesses, restaurants, cafés, and shops",
    descriptionNL: "Perfect voor lokale bedrijven, restaurants, cafés en winkels",
    category: "business",
    structure: {
      pages: ["home", "about", "services", "contact"],
      style: "professional",
      colors: ["#2c3e50", "#3498db", "#ecf0f1"]
    }
  },
  {
    id: "template-corporate",
    name: "Corporate Business",
    nameNL: "Zakelijke Website",
    description: "Professional corporate site with services and team sections",
    descriptionNL: "Professionele zakelijke site met diensten en team secties",
    category: "business",
    structure: {
      pages: ["home", "about", "services", "contact"],
      style: "corporate",
      colors: ["#1e3a5f", "#2563eb", "#f8fafc"]
    }
  },

  // WEBSHOP CATEGORY
  {
    id: "template-simple-store",
    name: "Simple Store",
    nameNL: "Simpele Webshop",
    description: "Basic e-commerce template for selling physical products",
    descriptionNL: "Basis e-commerce template voor fysieke producten",
    category: "webshop",
    structure: {
      pages: ["home", "about", "contact", "pricing"],
      style: "clean",
      colors: ["#000000", "#ffffff", "#f89f1e"]
    }
  },
  {
    id: "template-digital-products",
    name: "Digital Products",
    nameNL: "Digitale Producten",
    description: "Sell downloads, ebooks, courses, and digital files",
    descriptionNL: "Verkoop downloads, ebooks, cursussen en digitale bestanden",
    category: "webshop",
    structure: {
      pages: ["home", "about", "pricing", "contact"],
      style: "modern",
      colors: ["#6366f1", "#ec4899", "#f3f4f6"]
    }
  },

  // LIFESTYLE CATEGORY
  {
    id: "template-event",
    name: "Event & Party",
    nameNL: "Evenement & Party",
    description: "Promote events, parties, concerts, and gatherings",
    descriptionNL: "Promoot evenementen, party's, concerten en bijeenkomsten",
    category: "lifestyle",
    structure: {
      pages: ["home", "about", "contact"],
      style: "vibrant",
      colors: ["#7c3aed", "#f59e0b", "#fef3c7"]
    }
  },
  {
    id: "template-personal-brand",
    name: "Personal Brand",
    nameNL: "Merknaam/Personal Brand",
    description: "Build your personal brand as an influencer or creator",
    descriptionNL: "Bouw je merknaam als influencer of creator",
    category: "lifestyle",
    structure: {
      pages: ["home", "about", "contact"],
      style: "trendy",
      colors: ["#ec4899", "#8b5cf6", "#faf5ff"]
    }
  },

  // CREATIVE CATEGORY
  {
    id: "template-photographer",
    name: "Photographer / Artist",
    nameNL: "Fotograaf / Artiest",
    description: "Gallery-focused template for visual artists and photographers",
    descriptionNL: "Galerie-template voor beeldend kunstenaars en fotografen",
    category: "creative",
    structure: {
      pages: ["home", "gallery", "contact"],
      style: "gallery",
      colors: ["#ffffff", "#1a1a1a", "#e5e5e5"]
    }
  },
  {
    id: "template-landing",
    name: "Product Landing Page",
    nameNL: "Product Landingspagina",
    description: "High-converting landing page for product launches",
    descriptionNL: "Landingspagina met hoge conversie voor productlanceringen",
    category: "creative",
    structure: {
      pages: ["home", "pricing", "contact"],
      style: "conversion",
      colors: ["#10b981", "#ffffff", "#e5e7eb"]
    }
  }
]

export const templateCategories = [
  { id: "info", name: "Info", nameNL: "Informatief" },
  { id: "business", name: "Business", nameNL: "Zakelijk" },
  { id: "webshop", name: "Webshop", nameNL: "Webshop" },
  { id: "lifestyle", name: "Lifestyle", nameNL: "Lifestyle" },
  { id: "creative", name: "Creative", nameNL: "Creatief" }
]

export function getTemplatesByCategory(category: string) {
  return templates.filter(t => t.category === category)
}

export function getTemplateById(id: string) {
  return templates.find(t => t.id === id)
}

export function getAvailablePageTypes() {
  return [
    { type: "home", name: "Home", nameNL: "Home" },
    { type: "about", name: "About", nameNL: "Over ons / Over mij" },
    { type: "contact", name: "Contact", nameNL: "Contact" },
    { type: "services", name: "Services", nameNL: "Diensten" },
    { type: "blog", name: "Blog", nameNL: "Blog" },
    { type: "pricing", name: "Pricing", nameNL: "Prijzen" },
    { type: "gallery", name: "Gallery/Products", nameNL: "Galerie/Producten" },
    { type: "custom", name: "Custom Page", nameNL: "Aangepaste Pagina" }
  ]
}