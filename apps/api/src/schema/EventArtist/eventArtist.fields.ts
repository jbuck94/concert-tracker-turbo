import builder from '@/src/builder';
import { IDFilter } from '@/src/schema/Filters';

export const EventArtistWhere = builder.prismaWhere('EventArtist', {
  fields: (t) => ({
    id: IDFilter,
  }),
});

export const EventArtistListFilter = builder.prismaListFilter(
  EventArtistWhere,
  {
    ops: ['every', 'some', 'none'],
  }
);

builder.prismaObject('EventArtist', {
  fields: (t) => ({
    id: t.exposeID('id'),
    artist: t.relation('artist'),
    event: t.relation('event'),
  }),
});
