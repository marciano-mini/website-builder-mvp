import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL

  let client: PrismaClient

  if (process.env.NODE_ENV === "production" && !connectionString) {
    throw new Error("DATABASE_URL or NEON_DATABASE_URL must be set in production")
  }

  if (!connectionString) {
    // Fallback for development without database
    client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })
  } else {
    const adapter = new PrismaNeon({
      connectionString
    })

    client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })
  }

  return client
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma