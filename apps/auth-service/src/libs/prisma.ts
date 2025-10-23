import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient = globalThis.prismadb;

if (!prisma) {
  prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
  if (process.env.NODE_ENV === 'production') globalThis.prismadb = prisma;
}

export default prisma;
