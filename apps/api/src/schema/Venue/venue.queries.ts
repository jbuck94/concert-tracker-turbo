import builder from '@/src/builder';
import db from '@/src/db';

builder.queryFields((t) => ({
  venues: t.prismaConnection({
    type: 'Venue',
    cursor: 'id',
    nullable: false,
    nodeNullable: false,
    edgesNullable: false,
    resolve: (query) => db.venue.findMany(query),
  }),
}));
