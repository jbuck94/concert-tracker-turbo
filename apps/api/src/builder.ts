import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import RelayPlugin from '@pothos/plugin-relay';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import WithInputPlugin from '@pothos/plugin-with-input';
import { Prisma, PrismaClient } from '@prisma/client';

import { Context } from 'src/context';
import { getEnhancedDB } from 'src/db';

const client = (): PrismaClient => {
  return getEnhancedDB();
};

const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: JSON;
      Output: JSON;
    };
  };
}>({
  plugins: [
    ErrorsPlugin,
    SimpleObjectsPlugin,
    PrismaPlugin,
    RelayPlugin,
    PrismaUtils,
    WithInputPlugin,
  ],
  prisma: {
    client,
    dmmf: Prisma.dmmf,
    defaultConnectionSize: 200,
    filterConnectionTotalCount: true,
  },
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: 'omit',
    cursorType: 'String',
  },
  withInput: {
    typeOptions: {
      // default options for Input object types created by this plugin
    },
    argOptions: {
      // set required: false to override default behavior
    },
  },
});

builder.queryType();
builder.mutationType();

export default builder;
