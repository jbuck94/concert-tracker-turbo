import builder from 'src/builder';

// export const UserEventWhere = builder.prismaWhere('UserEvent', {
//   fields: (t) => ({
//     id: IDFilter,
//     // user: UserWhere,
//     event: EventWhere,
//   }),
// });

// export const UserEventListFilter = builder.prismaListFilter(UserEventWhere, {
//   ops: ['every', 'some', 'none'],
// });

builder.prismaObject('UserEvent', {
  fields: (t) => ({
    id: t.exposeID('id'),
    user: t.relation('user'),
    event: t.relation('event'),
  }),
});
