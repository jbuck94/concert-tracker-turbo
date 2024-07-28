import builder from '@/src/builder';
import { IDFilter } from '../Filters';

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

export const EventArtistFields = builder.prismaObject('EventArtist', {
  fields: (t) => ({
    id: t.exposeID('id'),
    artist: t.relation('artist', {
      resolve: (query, parent, args, context) => {
        return context.db.artist.findUniqueOrThrow({
          where: { id: parent.artistId },
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
