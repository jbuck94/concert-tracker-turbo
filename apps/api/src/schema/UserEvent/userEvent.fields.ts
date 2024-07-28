import builder from '@/src/builder';

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
    user: t.relation('user', {
      resolve: (query, parent, args, context) => {
        return context.db.user.findUniqueOrThrow({
          where: { id: parent.userId },
        });
      },
    }),
    event: t.relation('event', {
      resolve: (query, parent, args, context) => {
        return context.db.event.findUniqueOrThrow({
          where: { id: parent.eventId },
        });
      },
    }),
  }),
});
