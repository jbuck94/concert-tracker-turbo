/**
 * This is a singleton class that contains a prisma client.
 * This class is used for connecting to the database.
 */

import { PrismaClient, User } from '@prisma/client';
import { getOrThrow } from 'runtime';

class DBClient {
  public prisma: PrismaClient;
  private static instance: DBClient;
  private constructor() {
    console.log('CONSTRUCTING NEW DB CLIENT');
    this.prisma = new PrismaClient({
      log: ['query', 'info'],
      datasourceUrl: getOrThrow('DATABASE_URL'),
    });
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  };
}

export const getEnhancedDB = (user?: User | null) => {
  // return enhance(db, { user: user ?? undefined });
  const db = DBClient.getInstance().prisma;
  return db;
};
