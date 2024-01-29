import builder from '@/src/builder';
import db from '@/src/db';

builder.queryFields((t) => ({
  events: t.prismaConnection({
    type: 'Event',
    nullable: false,
    nodeNullable: false,
    edgesNullable: false,
    cursor: 'id',
    resolve: (query) => db.event.findMany(query),
  }),
}));
