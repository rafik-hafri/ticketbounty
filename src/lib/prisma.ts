import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || (process.env.NODE_ENV !== 'production' && typeof window === 'undefined' ? new PrismaClient() : null);

export default prisma
if (process.env.NODE_ENV !== 'production' && typeof window === 'undefined') globalForPrisma.prisma = prisma;
