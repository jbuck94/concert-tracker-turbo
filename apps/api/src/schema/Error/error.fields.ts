import builder from '@/src/builder';
import {
  CustomError,
  ErrorForbidden,
  ErrorInvalidRequest,
  ErrorNotFound,
  ErrorUniqueConstraint,
} from '@/src/schema/Error/error.model';

export const BaseError = builder.interfaceType(CustomError, {
  name: 'BaseError',
  fields: (schema) => ({
    message: schema.exposeString('message'),
  }),
});

builder.objectType(ErrorForbidden, {
  name: 'ErrorForbidden',
  interfaces: [BaseError],
  isTypeOf: (obj) => obj instanceof ErrorForbidden,
});

builder.objectType(ErrorNotFound, {
  name: 'ErrorNotFound',
  interfaces: [BaseError],
  isTypeOf: (obj) => obj instanceof ErrorNotFound,
});

builder.objectType(ErrorInvalidRequest, {
  name: 'ErrorInvalidRequest',
  interfaces: [BaseError],
  isTypeOf: (obj) => obj instanceof ErrorInvalidRequest,
});

builder.objectType(ErrorUniqueConstraint, {
  name: 'ErrorUniqueConstraint',
  interfaces: [BaseError],
  isTypeOf: (obj) => obj instanceof ErrorUniqueConstraint,
});
