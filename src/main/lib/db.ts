import { PrismaClient } from '@prisma/client'

// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to database')

    // Optional: Test query
    // const result = await prisma.$queryRaw`SELECT 1`
    // console.log('Test query successful:', result)

    return true
  } catch (error) {
    console.error('Failed to connect to database:', error)
    throw error
  }
}
