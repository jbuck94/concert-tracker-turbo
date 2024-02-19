import builder from '@/src/builder';
import db from '@/src/db';
import { googleClient } from '@/src/lib/google';
import {
  Client,
  PlaceInputType,
  ResponseData,
} from '@googlemaps/google-maps-services-js';
import { resolveOffsetConnection } from '@pothos/plugin-relay';

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
        const searchResults = await googleClient.textSearch({
          params: {
            query: args.input.name,
            key: 'AIzaSyDEA_sSLLH0Y5l-56UlYXUsS_MzIWqkYsw',
          },
        });

        // const allPlaces = await Promise.allSettled(
        //   searchResults.data.candidates.map((candidate) =>
        //     googleClient.placeDetails({
        //       params: {
        //         place_id: candidate.place_id || '',
        //         key: 'AIzaSyDEA_sSLLH0Y5l-56UlYXUsS_MzIWqkYsw',
        //       },
        //     })
        //   )
        // );

        // allPlaces.forEach(
        //   (res) =>
        //     res.status === 'fulfilled' &&
        //     console.log(JSON.stringify(res.value.data, null, 2))
        // );

        return searchResults.data.results.map((candidate) => {
          console.log('candidate: ', candidate);
          return {
            id: candidate?.place_id || '',
            name: candidate?.name || '',
            addressString: candidate?.formatted_address || '',
          };
        });
      });
    },
  }),
}));
