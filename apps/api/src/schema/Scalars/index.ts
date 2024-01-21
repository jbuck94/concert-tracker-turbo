import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

import builder from '@/src/builder';

builder.addScalarType('DateTime', DateTimeResolver, {});
builder.addScalarType('JSON', JSONObjectResolver, {});
