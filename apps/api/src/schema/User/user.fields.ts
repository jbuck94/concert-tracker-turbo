import { UserRole } from '@prisma/client';

import builder from 'src/builder';

export const UserRoleEnum = builder.enumType(UserRole, { name: 'UserRole' });

export const User = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email'),
    totalVenueCount: t.field({
      type: 'Int',
      nullable: false,
      resolve: async (parent, args, context) => {
        const userEvents = await context.db.userEvent.findMany({
          where: { userId: parent.id },
          include: { event: { select: { venueId: true } } },
        });

        const venueIds = [
          ...new Set(userEvents.map((userEvent) => userEvent.event.venueId)),
        ];

        return venueIds.length;
      },
    }),
    totalArtistCount: t.int({
      nullable: false,
      resolve: async (parent, args, context) => {
        const userEvents = await context.db.userEvent.findMany({
          where: { userId: parent.id },
          include: {
            event: { include: { artists: { select: { artistId: true } } } },
          },
        });

        const artistIds = [
          ...new Set(
            userEvents.flatMap((userEvent) =>
              userEvent.event.artists.map((artist) => artist.artistId)
            )
          ),
        ];

        return artistIds.length;
      },
    }),
    topVenue: t.prismaField({
      type: 'Venue',
      nullable: true,
      resolve: async (query, parent, args, context) => {
        const userEvents = await context.db.userEvent.findMany({
          where: { userId: parent.id },
          include: { event: { select: { venueId: true } } },
        });

        const userVenues = userEvents.reduce<Record<string, number>>(
          (accum, curr) => {
            if (!accum[curr.event.venueId]) {
              accum[curr.event.venueId] = 0;
            }

            accum[curr.event.venueId] = accum[curr.event.venueId] + 1;
            return accum;
          },
          {}
        );

        const sortedVenues = Object.entries(userVenues).sort(
          (a, b) => b[1] - a[1]
        );

        const topVenueId = sortedVenues[0][0];

        return context.db.venue.findUnique({
          where: { id: parseInt(topVenueId) },
        });
      },
    }),
    topArtist: t.prismaField({
      type: 'Artist',
      nullable: true,
      resolve: async (query, parent, args, context) => {
        const userEvents = await context.db.userEvent.findMany({
          where: { userId: parent.id },
          include: {
            event: { include: { artists: { select: { artistId: true } } } },
          },
        });

        const userArtists = userEvents.reduce<Record<string, number>>(
          (accum, currentEvent) => {
            currentEvent.event.artists.forEach((artist) => {
              if (!accum[artist.artistId]) {
                accum[artist.artistId] = 0;
              }
              accum[artist.artistId] = accum[artist.artistId] + 1;
            });

            return accum;
          },
          {}
        );

        const sortedArtists = Object.entries(userArtists).sort(
          (a, b) => b[1] - a[1]
        );

        const topArtistId = sortedArtists[0][0];

        return context.db.artist.findUnique({
          where: { id: parseInt(topArtistId) },
        });
      },
    }),
    role: t.field({ type: UserRoleEnum, resolve: ({ role }) => role }),
    events: t.relatedConnection('events', {
      cursor: 'id',
      nodeNullable: false,
      edgesNullable: false,
      query: {
        orderBy: {
          event: {
            date: 'desc',
          },
        },
      },
    }),
  }),
});
