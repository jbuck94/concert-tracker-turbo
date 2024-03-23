import builder from '@/src/builder';
import { IDFilter, StringFilter } from '@/src/schema/Filters';
import { UserEventListFilter } from '@/src/schema/UserEvent';

export const UserWhere = builder.prismaWhere('User', {
  fields: (t) => ({
    id: IDFilter,
    name: StringFilter,
    email: StringFilter,
    events: UserEventListFilter,
  }),
});

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email'),
    events: t.relatedConnection('events', { cursor: 'id' }),
  }),
});
