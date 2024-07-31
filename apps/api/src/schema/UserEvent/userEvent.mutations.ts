import builder from '@/src/builder';
import { SeatGeekClient } from '@/src/lib/seatGeek';

import { getSpotifyClient } from '@/src/lib/spotify';
import {
  ErrorEventExists,
  ErrorInvalidRequest,
  ErrorNotFound,
  ErrorUniqueConstraint,
} from '@/src/schema/Error/error.model';

const CreateUserEventInput = builder.inputType('CreateUserEventInput', {
  fields: (t) => ({
    venueSeatGeekId: t.string({ required: true }),
    artistSpotifyIds: t.field({ type: ['String'], required: true }),
    date: t.field({ type: 'DateTime', required: true }),
    forceCreateEvent: t.boolean({ required: false, defaultValue: false }),
  }),
});

builder.mutationFields((t) => ({
  createEvent: t.prismaField({
    type: 'UserEvent',
    args: {
      input: t.arg({ type: CreateUserEventInput, required: true }),
    },
    errors: {
      types: [
        ErrorNotFound,
        ErrorUniqueConstraint,
        ErrorInvalidRequest,
        ErrorEventExists,
      ],
    },
    resolve: async (_query, _, args, context) => {
      if (!context?.user?.id) {
        throw new Error('Must be logged in');
      }

      const seatGeekClient = new SeatGeekClient();

      const seatGeekVenue = await seatGeekClient.getVenue(
        args.input.venueSeatGeekId
      );

      if (!seatGeekVenue) {
        throw new ErrorInvalidRequest('Venue not found', {
          venueSeatGeekId: args.input.venueSeatGeekId,
        });
      }

      const venue = await context.db.venue.upsert({
        where: {
          googlePlacesID: seatGeekVenue.id.toString(),
        },
        create: {
          name: seatGeekVenue.name,
          address1: seatGeekVenue.address,
          city: seatGeekVenue.city,
          state: seatGeekVenue.state,
          zip: seatGeekVenue.postal_code,
          lat: seatGeekVenue.location.lat,
          long: seatGeekVenue.location.lon,
          googlePlacesID: seatGeekVenue.id.toString(),
        },
        update: {
          name: seatGeekVenue.name,
          address1: seatGeekVenue.address,
          city: seatGeekVenue.city,
          state: seatGeekVenue.state,
          zip: seatGeekVenue.postal_code,
          lat: seatGeekVenue.location.lat,
          long: seatGeekVenue.location.lon,
          googlePlacesID: seatGeekVenue.id.toString(),
        },
      });

      const artists = await Promise.all(
        args.input.artistSpotifyIds.map(async (artistSpotifyId) => {
          const spotifyArtist =
            await getSpotifyClient().artists.get(artistSpotifyId);

          return context.db.artist.upsert({
            where: {
              spotifyID: artistSpotifyId,
            },
            create: {
              name: spotifyArtist.name,
              spotifyID: artistSpotifyId,
            },
            update: {
              name: spotifyArtist.name,
              spotifyID: artistSpotifyId,
            },
          });
        })
      );

      const existingEvents = await context.db.event.findMany({
        where: {
          date: {
            // TODO: change this to a wide range around the input date
            equals: args.input.date,
          },
          venueId: {
            equals: venue.id,
          },
          artists: {
            every: {
              artistId: {
                in: artists.map((artist) => artist.id),
              },
            },
          },
        },
      });

      if (existingEvents.length && !args.input.forceCreateEvent) {
        throw new ErrorEventExists(
          `Found ${existingEvents.length} similar events`,
          existingEvents
        );
      }

      const event = await context.db.event.create({
        data: {
          name: `${artists.map((artist) => artist.name).join(', ')} at ${venue.name} on ${args.input.date.toLocaleDateString()}`,
          date: new Date(args.input.date),
          venue: {
            connect: {
              id: venue.id,
            },
          },
          artists: {
            create: artists.map((artist) => ({
              artistId: artist.id,
            })),
          },
        },
      });

      const result = await context.db.userEvent.upsert({
        where: {
          userId_eventId: {
            eventId: event.id,
            userId: context.user.id || 0,
          },
        },
        create: {
          userId: context.user.id,
          eventId: event.id,
        },
        update: {},
      });

      return result;
    },
  }),
}));
