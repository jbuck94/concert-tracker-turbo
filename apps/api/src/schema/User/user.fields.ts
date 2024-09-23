import { UserRole } from '@prisma/client';

import builder from 'src/builder';

// export const UserWhere = builder.prismaWhere('User', {
//   fields: (t) => ({
//     id: IDFilter,
//     name: StringFilter,
//     email: StringFilter,
//     events: UserEventListFilter,
//   }),
// });

export const UserRoleEnum = builder.enumType(UserRole, { name: 'UserRole' });

export const User = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email'),
    role: t.field({ type: UserRoleEnum, resolve: ({ role }) => role }),
    events: t.relatedConnection('events', {
      cursor: 'id',
      nodeNullable: false,
      edgesNullable: false,
    }),
  }),
});
