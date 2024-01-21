import builder from '@/src/builder';

builder.prismaObject('Artist', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    spotifyID: t.exposeString('spotifyID'),
    events: t.relatedConnection('events', { cursor: 'id' }),
  }),
});
