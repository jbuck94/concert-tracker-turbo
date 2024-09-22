import builder from 'src/builder';
import {
  CustomError,
  ErrorEventExists,
  ErrorForbidden,
  ErrorInvalidRequest,
  ErrorNotFound,
  ErrorUniqueConstraint,
} from 'src/schema/Error/error.model';

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

builder.objectType(ErrorEventExists, {
  name: 'ErrorEventExists',
  interfaces: [BaseError],
  isTypeOf: (obj) => obj instanceof ErrorEventExists,
  fields: (t) => ({
    possibleEvents: t.prismaConnection({
      type: 'Event',
      cursor: 'id',
      nullable: false,
      nodeNullable: false,
      edgesNullable: false,
      resolve: (_query, parentError, _, context) => {
        console.log('_query: ', _query);
        const eventIdsToLoad = parentError.events.map((event) => event.id);
        console.log('eventIdsToLoad: ', eventIdsToLoad);
        return context.db.event.findMany({
          include: { artists: true },
          where: { id: { in: eventIdsToLoad } },
        });
      },
    }),
  }),
});
