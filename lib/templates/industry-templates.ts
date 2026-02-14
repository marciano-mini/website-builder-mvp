// 15 Industry-Specific Templates for Netherlands
// Based on most common new businesses in NL

export const industryTemplates = [
  // 1. HORECA - Restaurants & Cafés
  {
    id: "restaurant",
    name: "Restaurant",
    nameNL: "Restaurant",
    description: "Complete restaurant website with menu, reservations, and location",
    descriptionNL: "Complete restaurantwebsite met menu, reserveringen en locatie",
    category: "horeca",
    structure: {
      pages: ["home", "menu", "about", "contact"],
      style: "warm-dining",
      colors: ["#c0392b", "#f39c12", "#27ae60"],
      defaultContent: {
        home: {
          hero: "Welkom bij [Restaurant Naam] — Authentiek eten, passie voor smaak",
          cta: "Reserveer nu"
        },
        menu: {
          title: "Ons Menu",
          categories: ["Voorgerechten", "Hoofdgerechten", "Nagerechten", "Dranken"]
        }
      }
    }
  },
  {
    id: "cafe",
    name: "Café / Koffiehuis",
    nameNL: "Café / Koffiehuis",
    description: "Cozy café website opening hours, menu, and atmosphere",
    descriptionNL: "Gezellig café website met openingstijden, menu en sfeer",
    category: "horeca",
    structure: {
      pages: ["home", "about", "menu", "contact"],
      style: "cozy-coffee",
      colors: ["#6d4c41", "#d7ccc8", "#8d6e63"],
      defaultContent: {
        home: {
          hero: "De beste koffie tussen werk en ontspanning",
          cta: "Bekijk menu"
        }
      }
    }
  },

  // 2. WEBWINKEL - E-commerce
  {
    id: "fashion-store",
    name: "Fashion Store",
    nameNL: "Mode Winkel",
    description: "Modern fashion e-commerce store with categories and featured products",
    descriptionNL: "Moderne mode webshop met categoriën en uitgelichte producten",
    category: "webshop",
    structure: {
      pages: ["home", "shop", "about", "contact"],
      style: "trendy-fashion",
      colors: ["#2c3e50", "#e74c3c", "#ecf0f1"],
      defaultContent: {
        home: {
          hero: "Ontdek de nieuwste mode trends",
          cta: "Shop nu"
        }
      }
    }
  },
  {
    id: "digital-products",
    name: "Digital Products Store",
    nameNL: "Digitale Producten Shop",
    description: "Sell ebooks, courses, downloads, and digital files",
    descriptionNL: "Verkoop ebooks, cursussen, downloads en digitale bestanden",
    category: "webshop",
    structure: {
      pages: ["home", "products", "about", "contact"],
      style: "clean-digital",
      colors: ["#3498db", "#ecf0f1", "#2980b9"],
      defaultContent: {
        home: {
          hero: "Premium digitale producten voor jou",
          cta: "Bekijk producten"
        }
      }
    }
  },

  // 3. BOUW - Construction
  {
    id: "bouwbedrijf",
    name: "Bouwbedrijf",
    nameNL: "Bouwbedrijf",
    description: "Construction company with portfolio of completed projects",
    descriptionNL: "Bouwbedrijf met portfolio van afgeronde projecten",
    category: "bouw",
    structure: {
      pages: ["home", "services", "portfolio", "contact"],
      style: "professional-construction",
      colors: ["#f39c12", "#2c3e50", "#ecf0f1"],
      defaultContent: {
        home: {
          hero: "Wij bouwen uw droomproject",
          cta: "Neem contact op"
        }
      }
    }
  },
  {
    id: "aannemer",
    name: "Aannemer",
    nameNL: "Aannemer",
    description: "Individual contractor for home renovation and construction",
    descriptionNL: "Zelfstandig aannemer voor woningrenovatie en bouw",
    category: "bouw",
    structure: {
      pages: ["home", "services", "about", "contact"],
      style: "builder-personal",
      colors: ["#e67e22", "#34495e", "#f5f5f5"],
      defaultContent: {
        home: {
          hero: "Betrouwbare aannemer voor uw project",
          cta: "Vraag offerte"
        }
      }
    }
  },

  // 4. SCHOONHEID - Beauty & Wellness
  {
    id: "kapper",
    name: "Kappersalon",
    nameNL: "Kappersalon",
    description: "Hair salon with services, pricing, and online booking",
    descriptionNL: "Kappersalon met diensten, prijzen en online afspraak",
    category: "beauty",
    structure: {
      pages: ["home", "services", "pricing", "contact"],
      style: "modern-salon",
      colors: ["#1a1a1a", "#ff69b4", "#f5f5f5"],
      defaultContent: {
        home: {
          hero: "Moderne kapsels voor iedereen",
          cta: "Maak afspraak"
        }
      }
    }
  },
  {
    id: "beauty-salon",
    name: "Beauty Salon",
    nameNL: "Schoonheidssalon",
    description: "Full-service beauty salon with treatments and packages",
    descriptionNL: "Volledige schoonheidssalon met behandelingen en pakketten",
    category: "beauty",
    structure: {
      pages: ["home", "services", "pricing", "contact"],
      style: "elegant-beauty",
      colors: ["#f8b500", "#1a1a1a", "#fff4e6"],
      defaultContent: {
        home: {
          hero: "Ontspannende schoonheidsbehandelingen",
          cta: "Book behandeling"
        }
      }
    }
  },

  // 5. FITNESS & GEZONDHEID
  {
    id: "gym",
    name: "Fitness / Gym",
    nameNL: "Fitness / Gym",
    description: "Gym membership with classes, personal training, and pricing",
    descriptionNL: "Fitnesscentrum met lessen, personal training en prijzen",
    category: "fitness",
    structure: {
      pages: ["home", "services", "pricing", "contact"],
      style: "energetic-fitness",
      colors: ["#1a1a1a", "#ff4500", "#00ff00"],
      defaultContent: {
        home: {
          hero: "Word de beste versie van jezelf",
          cta: "Proefles gratis"
        }
      }
    }
  },
  {
    id: "yoga-studio",
    name: "Yoga Studio",
    nameNL: "Yoga Studio",
    description: "Yoga and wellness studio with class schedule and instructors",
    descriptionNL: "Yoga en wellness studio met lessenrooster en instructeurs",
    category: "fitness",
    structure: {
      pages: ["home", "classes", "instructors", "contact"],
      style: "calm-yoga",
      colors: ["#8b4513", "#f5f5dc", "#daa520"],
      defaultContent: {
        home: {
          hero: "Vind innerlijke rust en balans",
          cta: "Probeer eerste les"
        }
      }
    }
  },

  // 6. ZAKELIJK & ADVIES
  {
    id: "advocaat",
    name: "Advocatenkantoor",
    nameNL: "Advocatenkantoor",
    description: "Law firm with practice areas and team profiles",
    descriptionNL: "Advocatenkantoor met rechtsgebieden en team profielen",
    category: "zakelijk",
    structure: {
      pages: ["home", "practice-areas", "about", "contact"],
      style: "professional-legal",
      colors: ["#1a1a1a", "#b8860b", "#f5f5f5"],
      defaultContent: {
        home: {
          hero: "Erkende juridische expertise",
          cta: "Plan consult"
        }
      }
    }
  },
  {
    id: "makelaar",
    name: "Makelaar",
    nameNL: "Makelaar",
    description: "Real estate agency with property listings and services",
    descriptionNL: "Makelaarskantoor met woningaanbod en diensten",
    category: "zakelijk",
    structure: {
      pages: ["home", "properties", "about", "contact"],
      style: "premium-estate",
      colors: ["#2c3e50", "#e74c3c", "#ecf0f1"],
      defaultContent: {
        home: {
          hero: "Vind uw droomwoning",
          cta: "Bekijk aanbod"
        }
      }
    }
  },

  // 7. DIENSTEN - ZZP & Freelance
  {
    id: "coach",
    name: "Life Coach",
    nameNL: "Life Coach",
    description: "Personal coaching with testimonials and services",
    descriptionNL: "Persoonlijke coaching met testimonials en diensten",
    category: "diensten",
    structure: {
      pages: ["home", "services", "about", "contact"],
      style: "inspiring-coach",
      colors: ["#9b59b6", "#ecf0f1", "#8e44ad"],
      defaultContent: {
        home: {
          hero: "Groeien naar je potentieel",
          cta: "Leer meer"
        }
      }
    }
  },
  {
    id: "zzp-bouw",
    name: "ZZP Bouw",
    nameNL: "ZZP Bouw",
    description: "Freelance builder and handyman services",
    descriptionNL: "Zelfstandige bouwer en klusjesdiensten",
    category: "diensten",
    structure: {
      pages: ["home", "services", "portfolio", "contact"],
      style: "reliable-worker",
      colors: ["#e67e22", "#34495e", "#f5f5f5"],
      defaultContent: {
        home: {
          hero: "Allround bouwer en klusjesman",
          cta: "Offerte aanvragen"
        }
      }
    }
  },

  // 8. SPECIALISTEN - Medische & Technisch
  {
    id: "fysiotherapeut",
    name: "Fysiotherapeut",
    nameNL: "Fysiotherapeut",
    description: "Physical therapy clinic with treatments and insurance info",
    descriptionNL: "Fysiotherapiepraktijk met behandelingen en verzekering info",
    category: "specialisten",
    structure: {
      pages: ["home", "treatments", "about", "contact"],
      style: "medical-clean",
      colors: ["#0066cc", "#ffffff", "#f0f8ff"],
      defaultContent: {
        home: {
          hero: "Expertise in revalidatie en herstel",
          cta: "Afspraak maken"
        }
      }
    }
  },
  {
    id: "garage",
    name: "Auto Garage",
    nameNL: "Auto Garage",
    description: "Auto repair shop with services, pricing, and appointment booking",
    descriptionNL: "Autoreparatie met diensten, prijzen en afspraak",
    category: "specialisten",
    structure: {
      pages: ["home", "services", "about", "contact"],
      style: "autogarage",
      colors: ["#ff6600", "#1a1a1a", "#f5f5f5"],
      defaultContent: {
        home: {
          hero: "Betrouwbare autoservice",
          cta: "Afspraak maken"
        }
      }
    }
  },
  {
    id: "it-bureau",
    name: "IT Bureau / Software",
    nameNL: "IT Bureau / Software",
    description: "IT services, software development, and technical solutions",
    descriptionNL: "IT diensten, software ontwikkeling en technische oplossingen",
    category: "specialisten",
    structure: {
      pages: ["home", "services", "portfolio", "contact"],
      style: "tech-modern",
      colors: ["#00b4d8", "#03045e", "#caf0f8"],
      defaultContent: {
        home: {
          hero: "Innovatieve IT oplossingen",
          cta: "Project bespreken"
        }
      }
    }
  }
]

export const industryCategories = [
  { id: "horeca", name: "Horeca", nameNL: "Horeca", description: "Restaurants, cafés, catering" },
  { id: "webshop", name: "E-commerce", nameNL: "E-commerce", description: "Online winkels, digitale producten" },
  { id: "bouw", name: "Bouw", nameNL: "Bouw", description: "Bouwbedrijven, aannemers" },
  { id: "beauty", name: "Beauty & Wellness", nameNL: "Beauty & Wellness", description: "Kappers, schoonheidssalons" },
  { id: "fitness", name: "Fitness & Gezondheid", nameNL: "Fitness & Gezondheid", description: "Gyms, yoga, wellness" },
  { id: "zakelijk", name: "Zakelijk Advies", nameNL: "Zakelijk Advies", description: "Advocaten, makelaars, accountants" },
  { id: "diensten", name: "Freelance / ZZP", nameNL: "Freelance / ZZP", description: "Coaches, ZZP'ers" },
  { id: "specialisten", name: "Specialisten", nameNL: "Specialisten", description: "Medisch, auto, IT" }
]

export function getTemplatesByIndustry(category: string) {
  return industryTemplates.filter(t => t.category === category)
}

export function getIndustryTemplateById(id: string) {
  return industryTemplates.find(t => t.id === id)
}

export function getPopularTemplates() {
  // Based on most new businesses in NL 2024-2025
  return [
    industryTemplates[0],  // Restaurant
    industryTemplates[2],  // Fashion Store
    industryTemplates[4],  // Bouwbedrijf
    industryTemplates[6],  // Kapper
    industryTemplates[8],  // Gym
    industryTemplates[14] // IT Bureau
  ]
}