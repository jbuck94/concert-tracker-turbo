/**
 * This is a singleton class that contains a prisma client.
 * This class is used for connecting to the database.
 */

import { PrismaClient, User } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';

class DBClient {
  public prisma: PrismaClient;
  private static instance: DBClient;
  private constructor() {
    this.prisma = new PrismaClient({ log: ['info'] });
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  };
}

const db = DBClient.getInstance().prisma;

export default db;

export const getEnhancedDB = (user?: User | null) => {
  return enhance(db, { user: user ?? undefined });
};
