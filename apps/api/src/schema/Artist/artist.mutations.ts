import builder from 'src/builder';
import { getSpotifyClient } from 'src/lib/spotify';
import {
  ErrorInvalidRequest,
  ErrorNotFound,
  ErrorUniqueConstraint,
} from 'src/schema/Error/error.model';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

builder.mutationFields((t) => ({
  createArtist: t.prismaField({
    type: 'Artist',
    args: {
      spotifyID: t.arg.string({ required: true }),
    },
    errors: {
      types: [ErrorNotFound, ErrorUniqueConstraint, ErrorInvalidRequest],
    },
    resolve: async (_query, _, args, context) => {
      const spotifyArtist = await getSpotifyClient().artists.get(
        args.spotifyID
      );

      if (!spotifyArtist) {
        throw new ErrorNotFound(`Could not find artist: ${args.spotifyID}`);
      }

      return context.db.artist
        .create({
          data: {
            spotifyID: spotifyArtist.id,
            name: spotifyArtist.name,
          },
        })
        .catch((e: unknown) => {
          if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
              throw new ErrorUniqueConstraint('Artist already exists');
            }
          }
          throw new ErrorInvalidRequest('Uknown error creating Artist');
        });
    },
  }),
}));
