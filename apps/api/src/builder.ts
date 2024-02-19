import PrismaPlugin from '@pothos/plugin-prisma';
import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ErrorsPlugin from '@pothos/plugin-errors';
import WithInputPlugin from '@pothos/plugin-with-input';
import type PrismaTypes from '@pothos/plugin-prisma/generated';

import { getEnhancedDB } from './db';

import { Context } from '@/src/context';

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
    client: getEnhancedDB(),
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
