import { PrismaClient, User } from '@prisma/client';

export type Context = {
  user: User | null;
  db: PrismaClient;
};
