import builder from '@/src/builder';
import { SeatGeekClient } from '@/src/lib/seatGeek';

import { resolveOffsetConnection } from '@pothos/plugin-relay';

builder.queryFields((t) => ({
  venues: t.prismaConnection({
    type: 'Venue',
    cursor: 'id',
    nullable: false,
    nodeNullable: false,
    edgesNullable: false,
    resolve: (query, _parent, _args, context) =>
      context.db.venue.findMany(query),
  }),
}));

const VenueAutocompleteResult = builder.simpleObject(
  'VenueAutocompleteResult',
  {
    fields: (t) => ({
      id: t.string({
        nullable: false,
      }),
      name: t.string({
        nullable: false,
      }),
      addressString: t.string({
        nullable: false,
      }),
    }),
  }
);

const VenueAutocompleteInput = builder.inputType('VenueAutocompleteInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});

builder.queryFields((t) => ({
  venueAutocomplete: t.connection({
    type: VenueAutocompleteResult,
    args: {
      input: t.arg({ type: VenueAutocompleteInput, required: true }),
    },
    nullable: false,
    nodeNullable: false,
    edgesNullable: false,
    resolve: async (parent, args, context) => {
      return resolveOffsetConnection({ args }, async ({ limit, offset }) => {
        const client = new SeatGeekClient();

        const venues = await client.searchVenues(args.input.name);

        return venues.map((venue) => {
          return {
            id: venue.id.toString(),
            name: venue.name,
            addressString: venue.display_location,
          };
        });
      });
    },
  }),
}));
