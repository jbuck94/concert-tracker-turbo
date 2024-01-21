import builder from '@/src/builder';
import { EventArtistListFilter } from '@/src/schema/EventArtist';
import { DateTimeFilter, IDFilter, StringFilter } from '@/src/schema/Filters';
import { VenueWhere } from '@/src/schema/Venue';

export const EventWhere = builder.prismaWhere('Event', {
  fields: (r) => ({
    id: IDFilter,
    name: StringFilter,
    date: DateTimeFilter,
    venue: VenueWhere,
  }),
});

export const EventListFilter = builder.prismaListFilter(EventWhere, {
  ops: ['every', 'some', 'none'],
});

builder.prismaObject('Event', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    date: t.field({
      type: 'DateTime',
      resolve: (event) => event.date,
    }),
    venue: t.relation('venue'),
    artists: t.relatedConnection('artists', {
      cursor: 'id',
      args: {
        where: t.arg({ type: EventArtistListFilter }),
      },
    }),
  }),
});
