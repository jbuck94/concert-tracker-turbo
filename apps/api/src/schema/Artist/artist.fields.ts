import builder from '@/src/builder';
import { spotifyClient } from '@/src/lib/spotify';

export const ArtistFields = builder.prismaObject('Artist', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    spotifyID: t.exposeString('spotifyID'),
    events: t.relatedConnection('events', { cursor: 'id' }),
    genres: t.field({
      type: ['String'],
      nullable: false,
      resolve: async (artist) => {
        const spotifyArtist = await spotifyClient.artists.get(artist.spotifyID);

        return spotifyArtist.genres;
      },
    }),
    image: t.field({
      type: 'String',
      nullable: false,
      resolve: async (artist) => {
        const spotifyArtist = await spotifyClient.artists.get(artist.spotifyID);
        return spotifyArtist.images[0].url;
      },
    }),
  }),
});
