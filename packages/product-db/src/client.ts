import { PrismaClient } from '../generated/prisma/client.js';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// @ts-ignore
prisma.$on('query', (e: any) => {
  if (e.params && Object.keys(e.params).length > 0) {
    console.log(`Params: ${e.params} - Duration: ${e.duration} ms`);
  } else {
    console.log(`Duration: ${e.duration} ms`);
  }
});
