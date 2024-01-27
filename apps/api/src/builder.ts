import PrismaPlugin from '@pothos/plugin-prisma';
import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';

import type PrismaTypes from '@pothos/plugin-prisma/generated';

import db from './db';

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Objects: {
    ArticlesResponse: {
      nextCursor: string;
      prevCursor: string;
      totalCount: number;
      results: PrismaTypes['Article']['Shape'][];
    };
  };
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: JSON;
      Output: JSON;
    };
  };
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: {
    client: db,
    filterConnectionTotalCount: true,
  },
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: 'omit',
    cursorType: 'String',
  },
});

export default builder;
