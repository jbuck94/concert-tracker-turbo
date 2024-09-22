import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

import builder from 'src/builder';

export const DateTime = builder.addScalarType('DateTime', DateTimeResolver, {});
export const Json = builder.addScalarType('JSON', JSONObjectResolver, {});
