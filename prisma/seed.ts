import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { industryTemplates } from '../lib/templates/industry-templates'

config({ path: '.env.local' })

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})

async function main() {
  console.log('🌱 Seeding 15 industry templates...')

  let seeded = 0

  for (const template of industryTemplates) {
    // Check if template already exists
    const existing = await prisma.template.findUnique({
      where: { id: template.id }
    })

    if (existing) {
      console.log(`⏭️  Skipping ${template.name} (already exists)`)
      continue
    }

    await prisma.template.create({
      data: {
        id: template.id,
        name: template.name,
        nameNL: template.nameNL,
        description: template.description,
        descriptionNL: template.descriptionNL,
        category: template.category,
        structure: JSON.stringify(template.structure),
        isFree: true,
        isIndustry: true,
        popularity: 0
      }
    })

    console.log(`✅ Created: ${template.name}`)
    seeded++
  }

  console.log(`\n🎉 Done! Seeded ${seeded} new templates`)
  console.log(`📊 Total templates: ${industryTemplates.length}`)
  console.log(`\n🏗️  Categories:`)

  const categories = ['horeca', 'webshop', 'bouw', 'beauty', 'fitness', 'zakelijk', 'diensten', 'specialisten']
  const categoryNamesNL = {
    horeca: 'Horeca',
    webshop: 'E-commerce',
    bouw: 'Bouw',
    beauty: 'Beauty & Wellness',
    fitness: 'Fitness',
    zakelijk: 'Zakelijk Advies',
    diensten: 'Freelance / ZZP',
    specialisten: 'Specialisten'
  }

  for (const cat of categories) {
    const count = industryTemplates.filter(t => t.category === cat).length
    console.log(`   ${categoryNamesNL[cat as keyof typeof categoryNamesNL]}: ${count} templates`)
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })