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
    event: t.relation('event', {
      resolve(query, parent, args, context, info) {
        console.log('parent: ', parent);
        return context.db.event.findUniqueOrThrow({
          where: { id: parent.eventId },
        });
      },
    }),
    // event: t.prismaField({
    //   type: 'Event',
    //   resolve: async (query, parent, args, context) => {
    //     console.log('parent.eventId: ', parent.eventId);
    //     return context.db.event.findUniqueOrThrow({
    //       where: { id: parent.eventId },
    //     });
    //   },
    // }),
  }),
});
