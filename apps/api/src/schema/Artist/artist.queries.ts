import builder from '@/src/builder';
import db from '@/src/db';
import { spotifyClient } from '@/src/lib/spotify';
import { resolveOffsetConnection } from '@pothos/plugin-relay';
import { MaxInt } from '@spotify/web-api-ts-sdk';

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

builder.queryFields((t) => ({
  artists: t.prismaConnection({
    type: 'Artist',
    cursor: 'id',
    nullable: false,
    nodeNullable: false,
    edgesNullable: false,
    resolve: (query) => db.artist.findMany(query),
  }),
}));

const SpotifyArtist = builder.simpleObject('SpotifyArtist', {
  fields: (t) => ({
    id: t.string({
      nullable: false,
    }),
    name: t.string({
      nullable: false,
    }),
  }),
});

const ArtistsAutocompleteInput = builder.inputType('ArtistsAutocompleteInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});

builder.queryFields((t) => ({
  artistAutocomplete: t.connection({
    type: SpotifyArtist,
    args: {
      input: t.arg({ type: ArtistsAutocompleteInput, required: true }),
    },
    nullable: false,
    nodeNullable: false,
    edgesNullable: false,
    resolve: async (parent, args, context) => {
      return resolveOffsetConnection({ args }, async ({ limit, offset }) => {
        if (limit > 50) {
          throw new Error('Max page size is 50');
        }

        const searchResults = await spotifyClient.search(
          args.input.name,
          ['artist'],
          undefined,
          limit as MaxInt<50>,
          offset
        );

        return searchResults.artists.items.map((item) => ({
          id: item.id,
          name: item.name,
        }));
      });
    },
  }),
}));
