import builder from '@/src/builder';
import { spotifyClient } from '@/src/lib/spotify';
import { resolveOffsetConnection } from '@pothos/plugin-relay';

builder.queryField('artist', (t) =>
  t.prismaFieldWithInput({
    type: 'Artist',
    nullable: true,
    input: {
      id: t.input.int({ required: true }),
    },
    resolve: (query, _parent, args, context) => {
      return context.db.artist.findUnique({
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
    totalCount: (_parent, _args, context) => context.db.artist.count(),
    resolve: (query, _parent, _args, context) =>
      context.db.artist.findMany(query),
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
    resolve: async (parent, args) => {
      return resolveOffsetConnection({ args }, async ({ limit, offset }) => {
        if (limit > 50) {
          throw new Error('Max page size is 50');
        }

        const searchResults = await spotifyClient.search(
          args.input.name,
          ['artist'],
          undefined,
          limit,
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
