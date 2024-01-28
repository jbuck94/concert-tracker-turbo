import builder from '@/src/builder';
import db from '@/src/db';

builder.queryField('artist', (t) =>
  t.prismaFieldWithInput({
    type: 'Artist',
    nullable: true,
    input: {
      id: t.input.int({ required: true }),
    },
    resolve: (query, _, args) => {
      return db.artist.findUnique({
        where: {
          id: args.input.id,
        },
        ...query,
      });
    },
  })
);


builder.queryFields(t => ({
  artists: t.prismaConnection({
    type: 'Artist',
    cursor: 'id',
    resolve: query => db.artist.findMany(query)
  })
}))