import builder from 'src/builder';

builder.queryFields((t) => ({
  events: t.prismaConnection({
    type: 'Event',
    nullable: false,
    nodeNullable: false,
    edgesNullable: false,
    cursor: 'id',
    resolve: (query, _parent, _args, context) =>
      context.db.event.findMany(query),
  }),
}));
