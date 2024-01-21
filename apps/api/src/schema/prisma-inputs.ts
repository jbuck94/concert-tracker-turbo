import { InputObjectRef } from '@pothos/core';
import { Prisma } from '@prisma/client';
import builder from '@/src/builder';

export const UserFilter: InputObjectRef<Prisma.Prisma.UserWhereInput> =
  builder.prismaWhere('User', {
    name: 'UserFilter',
    fields: () => ({
      id: IntFilter,
      name: StringFilter,
      email: StringFilter,
      events: UserEventListFilter,
    }),
  });
export const IntFilter = builder.prismaFilter('Int', {
  name: 'IntFilter',
  ops: [
    'equals',
    'in',
    'notIn',
    'not',
    'is',
    'isNot',
    'lt',
    'lte',
    'gt',
    'gte',
  ],
});
export const StringFilter = builder.prismaFilter('String', {
  name: 'StringFilter',
  ops: [
    'equals',
    'in',
    'notIn',
    'not',
    'is',
    'isNot',
    'equals',
    'in',
    'notIn',
    'not',
    'is',
    'isNot',
    'contains',
    'startsWith',
    'endsWith',
    'mode',
    'lt',
    'lte',
    'gt',
    'gte',
  ],
});
export const UserEventFilter: InputObjectRef<Prisma.Prisma.UserEventWhereInput> =
  builder.prismaWhere('UserEvent', {
    name: 'UserEventFilter',
    fields: () => ({
      id: IntFilter,
      user: UserFilter,
      userId: IntFilter,
      event: EventFilter,
      eventId: IntFilter,
      notes: StringFilter,
    }),
  });
export const EventFilter: InputObjectRef<Prisma.Prisma.EventWhereInput> =
  builder.prismaWhere('Event', {
    name: 'EventFilter',
    fields: () => ({
      id: IntFilter,
      name: StringFilter,
      date: DateTimeFilter,
      artists: EventArtistListFilter,
      venue: VenueFilter,
      venueId: IntFilter,
      userEvents: UserEventListFilter,
    }),
  });
export const DateTimeFilter = builder.prismaFilter('DateTime', {
  name: 'DateTimeFilter',
  ops: [
    'equals',
    'in',
    'notIn',
    'not',
    'is',
    'isNot',
    'lt',
    'lte',
    'gt',
    'gte',
  ],
});
export const EventArtistFilter: InputObjectRef<Prisma.Prisma.EventArtistWhereInput> =
  builder.prismaWhere('EventArtist', {
    name: 'EventArtistFilter',
    fields: () => ({
      id: IntFilter,
      event: EventFilter,
      eventId: IntFilter,
      artist: ArtistFilter,
      artistId: IntFilter,
    }),
  });
export const ArtistFilter: InputObjectRef<Prisma.Prisma.ArtistWhereInput> =
  builder.prismaWhere('Artist', {
    name: 'ArtistFilter',
    fields: () => ({
      id: IntFilter,
      name: StringFilter,
      spotifyID: StringFilter,
      events: EventArtistListFilter,
    }),
  });
export const EventArtistListFilter = builder.prismaListFilter(
  EventArtistFilter,
  {
    name: 'EventArtistListFilter',
    ops: ['every', 'some', 'none'],
  }
);
export const VenueFilter: InputObjectRef<Prisma.Prisma.VenueWhereInput> =
  builder.prismaWhere('Venue', {
    name: 'VenueFilter',
    fields: () => ({
      id: IntFilter,
      name: StringFilter,
      address1: StringFilter,
      address2: StringFilter,
      city: StringFilter,
      state: StringFilter,
      zip: StringFilter,
      lat: FloatFilter,
      long: FloatFilter,
      googlePlacesID: StringFilter,
      events: EventListFilter,
    }),
  });
export const FloatFilter = builder.prismaFilter('Float', {
  name: 'FloatFilter',
  ops: [
    'equals',
    'in',
    'notIn',
    'not',
    'is',
    'isNot',
    'lt',
    'lte',
    'gt',
    'gte',
  ],
});
export const EventListFilter = builder.prismaListFilter(EventFilter, {
  name: 'EventListFilter',
  ops: ['every', 'some', 'none'],
});
export const UserEventListFilter = builder.prismaListFilter(UserEventFilter, {
  name: 'UserEventListFilter',
  ops: ['every', 'some', 'none'],
});
export const UserUniqueFilter = builder.prismaWhereUnique('User', {
  name: 'UserUniqueFilter',
  fields: () => ({
    id: 'Int',
    email: 'String',
  }),
});
export const ArtistOrderBy: InputObjectRef<Prisma.Prisma.ArtistOrderByWithRelationInput> =
  builder.prismaOrderBy('Artist', {
    name: 'ArtistOrderBy',
    fields: () => ({
      id: true,
      name: true,
      spotifyID: true,
      events: EventArtistOrderBy,
    }),
  });
export const EventArtistOrderBy: InputObjectRef<Prisma.Prisma.EventArtistOrderByWithRelationInput> =
  builder.prismaOrderBy('EventArtist', {
    name: 'EventArtistOrderBy',
    fields: () => ({
      id: true,
      event: EventOrderBy,
      eventId: true,
      artist: ArtistOrderBy,
      artistId: true,
    }),
  });
export const VenueOrderBy: InputObjectRef<Prisma.Prisma.VenueOrderByWithRelationInput> =
  builder.prismaOrderBy('Venue', {
    name: 'VenueOrderBy',
    fields: () => ({
      id: true,
      name: true,
      address1: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      lat: true,
      long: true,
      googlePlacesID: true,
      events: EventOrderBy,
    }),
  });
export const EventOrderBy: InputObjectRef<Prisma.Prisma.EventOrderByWithRelationInput> =
  builder.prismaOrderBy('Event', {
    name: 'EventOrderBy',
    fields: () => ({
      id: true,
      name: true,
      date: true,
      artists: EventArtistOrderBy,
      venue: VenueOrderBy,
      venueId: true,
      userEvents: UserEventOrderBy,
    }),
  });
export const UserEventOrderBy: InputObjectRef<Prisma.Prisma.UserEventOrderByWithRelationInput> =
  builder.prismaOrderBy('UserEvent', {
    name: 'UserEventOrderBy',
    fields: () => ({
      id: true,
      user: UserOrderBy,
      userId: true,
      event: EventOrderBy,
      eventId: true,
      notes: true,
    }),
  });
export const UserOrderBy: InputObjectRef<Prisma.Prisma.UserOrderByWithRelationInput> =
  builder.prismaOrderBy('User', {
    name: 'UserOrderBy',
    fields: () => ({
      id: true,
      name: true,
      email: true,
      events: UserEventOrderBy,
    }),
  });
export const ArtistCreateWithoutEvents: InputObjectRef<Prisma.Prisma.ArtistCreateWithoutEventsInput> =
  builder.prismaCreate('Artist', {
    name: 'ArtistCreateWithoutEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      spotifyID: 'String',
    }),
  });
export const ArtistUniqueFilter = builder.prismaWhereUnique('Artist', {
  name: 'ArtistUniqueFilter',
  fields: () => ({
    id: 'Int',
    name: 'String',
    spotifyID: 'String',
  }),
});
export const EventArtistCreateArtist = builder.prismaCreateRelation(
  'EventArtist',
  'artist',
  {
    fields: () => ({
      create: ArtistCreateWithoutEvents,
      connect: ArtistUniqueFilter,
    }),
  }
);
export const EventArtistCreateWithoutEvent: InputObjectRef<Prisma.Prisma.EventArtistCreateWithoutEventInput> =
  builder.prismaCreate('EventArtist', {
    name: 'EventArtistCreateWithoutEvent',
    fields: () => ({
      id: 'Int',
      artist: EventArtistCreateArtist,
      artistId: 'Int',
    }),
  });
export const EventArtistUniqueFilter = builder.prismaWhereUnique(
  'EventArtist',
  {
    name: 'EventArtistUniqueFilter',
    fields: () => ({
      id: 'Int',
    }),
  }
);
export const EventCreateArtists = builder.prismaCreateRelation(
  'Event',
  'artists',
  {
    fields: () => ({
      create: EventArtistCreateWithoutEvent,
      connect: EventArtistUniqueFilter,
    }),
  }
);
export const VenueCreateWithoutEvents: InputObjectRef<Prisma.Prisma.VenueCreateWithoutEventsInput> =
  builder.prismaCreate('Venue', {
    name: 'VenueCreateWithoutEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      address1: 'String',
      address2: 'String',
      city: 'String',
      state: 'String',
      zip: 'String',
      lat: 'Float',
      long: 'Float',
      googlePlacesID: 'String',
    }),
  });
export const VenueUniqueFilter = builder.prismaWhereUnique('Venue', {
  name: 'VenueUniqueFilter',
  fields: () => ({
    id: 'Int',
    lat: 'Float',
    long: 'Float',
    googlePlacesID: 'String',
  }),
});
export const EventCreateVenue = builder.prismaCreateRelation('Event', 'venue', {
  fields: () => ({
    create: VenueCreateWithoutEvents,
    connect: VenueUniqueFilter,
  }),
});
export const EventCreateWithoutUserEvents: InputObjectRef<Prisma.Prisma.EventCreateWithoutUserEventsInput> =
  builder.prismaCreate('Event', {
    name: 'EventCreateWithoutUserEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      artists: EventCreateArtists,
      venue: EventCreateVenue,
      venueId: 'Int',
    }),
  });
export const EventUniqueFilter = builder.prismaWhereUnique('Event', {
  name: 'EventUniqueFilter',
  fields: () => ({
    id: 'Int',
    name: 'String',
  }),
});
export const UserEventCreateEvent = builder.prismaCreateRelation(
  'UserEvent',
  'event',
  {
    fields: () => ({
      create: EventCreateWithoutUserEvents,
      connect: EventUniqueFilter,
    }),
  }
);
export const UserEventCreateWithoutUser: InputObjectRef<Prisma.Prisma.UserEventCreateWithoutUserInput> =
  builder.prismaCreate('UserEvent', {
    name: 'UserEventCreateWithoutUser',
    fields: () => ({
      id: 'Int',
      event: UserEventCreateEvent,
      eventId: 'Int',
      notes: 'String',
    }),
  });
export const UserEventUniqueFilter = builder.prismaWhereUnique('UserEvent', {
  name: 'UserEventUniqueFilter',
  fields: () => ({
    id: 'Int',
    userId_eventId: 'Int',
  }),
});
export const UserCreateEvents = builder.prismaCreateRelation('User', 'events', {
  fields: () => ({
    create: UserEventCreateWithoutUser,
    connect: UserEventUniqueFilter,
  }),
});
export const UserCreate: InputObjectRef<Prisma.Prisma.UserCreateInput> =
  builder.prismaCreate('User', {
    name: 'UserCreate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      email: 'String',
      events: UserCreateEvents,
    }),
  });
export const ArtistUpdateWithoutEvents: InputObjectRef<Prisma.Prisma.ArtistUpdateWithoutEventsInput> =
  builder.prismaUpdate('Artist', {
    name: 'ArtistUpdateWithoutEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      spotifyID: 'String',
    }),
  });
export const EventArtistUpdateArtist = builder.prismaUpdateRelation(
  'EventArtist',
  'artist',
  {
    fields: () => ({
      create: ArtistCreateWithoutEvents,
      update: ArtistUpdateWithoutEvents,
      connect: ArtistUniqueFilter,
    }),
  }
);
export const EventArtistUpdateWithoutEvent: InputObjectRef<Prisma.Prisma.EventArtistUpdateWithoutEventInput> =
  builder.prismaUpdate('EventArtist', {
    name: 'EventArtistUpdateWithoutEvent',
    fields: () => ({
      id: 'Int',
      artist: EventArtistUpdateArtist,
      artistId: 'Int',
    }),
  });
export const EventArtistWithoutEventFilter: InputObjectRef<Prisma.Prisma.EventArtistWhereInput> =
  builder.prismaWhere('EventArtist', {
    name: 'EventArtistWithoutEventFilter',
    fields: () => ({
      id: IntFilter,
      artist: ArtistFilter,
      artistId: IntFilter,
    }),
  });
export const EventUpdateArtists = builder.prismaUpdateRelation(
  'Event',
  'artists',
  {
    fields: () => ({
      create: EventArtistCreateWithoutEvent,
      set: EventArtistUniqueFilter,
      disconnect: EventArtistUniqueFilter,
      delete: EventArtistUniqueFilter,
      connect: EventArtistUniqueFilter,
      update: {
        where: EventArtistUniqueFilter,
        data: EventArtistUpdateWithoutEvent,
      },
      updateMany: {
        where: EventArtistWithoutEventFilter,
        data: EventArtistUpdateWithoutEvent,
      },
      deleteMany: EventArtistWithoutEventFilter,
    }),
  }
);
export const VenueUpdateWithoutEvents: InputObjectRef<Prisma.Prisma.VenueUpdateWithoutEventsInput> =
  builder.prismaUpdate('Venue', {
    name: 'VenueUpdateWithoutEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      address1: 'String',
      address2: 'String',
      city: 'String',
      state: 'String',
      zip: 'String',
      lat: 'Float',
      long: 'Float',
      googlePlacesID: 'String',
    }),
  });
export const EventUpdateVenue = builder.prismaUpdateRelation('Event', 'venue', {
  fields: () => ({
    create: VenueCreateWithoutEvents,
    update: VenueUpdateWithoutEvents,
    connect: VenueUniqueFilter,
  }),
});
export const EventUpdateWithoutUserEvents: InputObjectRef<Prisma.Prisma.EventUpdateWithoutUserEventsInput> =
  builder.prismaUpdate('Event', {
    name: 'EventUpdateWithoutUserEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      artists: EventUpdateArtists,
      venue: EventUpdateVenue,
      venueId: 'Int',
    }),
  });
export const UserEventUpdateEvent = builder.prismaUpdateRelation(
  'UserEvent',
  'event',
  {
    fields: () => ({
      create: EventCreateWithoutUserEvents,
      update: EventUpdateWithoutUserEvents,
      connect: EventUniqueFilter,
    }),
  }
);
export const UserEventUpdateWithoutUser: InputObjectRef<Prisma.Prisma.UserEventUpdateWithoutUserInput> =
  builder.prismaUpdate('UserEvent', {
    name: 'UserEventUpdateWithoutUser',
    fields: () => ({
      id: 'Int',
      event: UserEventUpdateEvent,
      eventId: 'Int',
      notes: 'String',
    }),
  });
export const UserEventWithoutUserFilter: InputObjectRef<Prisma.Prisma.UserEventWhereInput> =
  builder.prismaWhere('UserEvent', {
    name: 'UserEventWithoutUserFilter',
    fields: () => ({
      id: IntFilter,
      event: EventFilter,
      eventId: IntFilter,
      notes: StringFilter,
    }),
  });
export const UserUpdateEvents = builder.prismaUpdateRelation('User', 'events', {
  fields: () => ({
    create: UserEventCreateWithoutUser,
    set: UserEventUniqueFilter,
    disconnect: UserEventUniqueFilter,
    delete: UserEventUniqueFilter,
    connect: UserEventUniqueFilter,
    update: {
      where: UserEventUniqueFilter,
      data: UserEventUpdateWithoutUser,
    },
    updateMany: {
      where: UserEventWithoutUserFilter,
      data: UserEventUpdateWithoutUser,
    },
    deleteMany: UserEventWithoutUserFilter,
  }),
});
export const UserUpdate: InputObjectRef<Prisma.Prisma.UserUpdateInput> =
  builder.prismaUpdate('User', {
    name: 'UserUpdate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      email: 'String',
      events: UserUpdateEvents,
    }),
  });
export const UserCreateWithoutEvents: InputObjectRef<Prisma.Prisma.UserCreateWithoutEventsInput> =
  builder.prismaCreate('User', {
    name: 'UserCreateWithoutEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      email: 'String',
    }),
  });
export const UserEventCreateUser = builder.prismaCreateRelation(
  'UserEvent',
  'user',
  {
    fields: () => ({
      create: UserCreateWithoutEvents,
      connect: UserUniqueFilter,
    }),
  }
);
export const UserEventCreateWithoutEvent: InputObjectRef<Prisma.Prisma.UserEventCreateWithoutEventInput> =
  builder.prismaCreate('UserEvent', {
    name: 'UserEventCreateWithoutEvent',
    fields: () => ({
      id: 'Int',
      user: UserEventCreateUser,
      userId: 'Int',
      notes: 'String',
    }),
  });
export const EventCreateUserEvents = builder.prismaCreateRelation(
  'Event',
  'userEvents',
  {
    fields: () => ({
      create: UserEventCreateWithoutEvent,
      connect: UserEventUniqueFilter,
    }),
  }
);
export const EventCreateWithoutArtists: InputObjectRef<Prisma.Prisma.EventCreateWithoutArtistsInput> =
  builder.prismaCreate('Event', {
    name: 'EventCreateWithoutArtists',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      venue: EventCreateVenue,
      venueId: 'Int',
      userEvents: EventCreateUserEvents,
    }),
  });
export const EventArtistCreateEvent = builder.prismaCreateRelation(
  'EventArtist',
  'event',
  {
    fields: () => ({
      create: EventCreateWithoutArtists,
      connect: EventUniqueFilter,
    }),
  }
);
export const EventArtistCreateWithoutArtist: InputObjectRef<Prisma.Prisma.EventArtistCreateWithoutArtistInput> =
  builder.prismaCreate('EventArtist', {
    name: 'EventArtistCreateWithoutArtist',
    fields: () => ({
      id: 'Int',
      event: EventArtistCreateEvent,
      eventId: 'Int',
    }),
  });
export const ArtistCreateEvents = builder.prismaCreateRelation(
  'Artist',
  'events',
  {
    fields: () => ({
      create: EventArtistCreateWithoutArtist,
      connect: EventArtistUniqueFilter,
    }),
  }
);
export const ArtistCreate: InputObjectRef<Prisma.Prisma.ArtistCreateInput> =
  builder.prismaCreate('Artist', {
    name: 'ArtistCreate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      spotifyID: 'String',
      events: ArtistCreateEvents,
    }),
  });
export const UserUpdateWithoutEvents: InputObjectRef<Prisma.Prisma.UserUpdateWithoutEventsInput> =
  builder.prismaUpdate('User', {
    name: 'UserUpdateWithoutEvents',
    fields: () => ({
      id: 'Int',
      name: 'String',
      email: 'String',
    }),
  });
export const UserEventUpdateUser = builder.prismaUpdateRelation(
  'UserEvent',
  'user',
  {
    fields: () => ({
      create: UserCreateWithoutEvents,
      update: UserUpdateWithoutEvents,
      connect: UserUniqueFilter,
    }),
  }
);
export const UserEventUpdateWithoutEvent: InputObjectRef<Prisma.Prisma.UserEventUpdateWithoutEventInput> =
  builder.prismaUpdate('UserEvent', {
    name: 'UserEventUpdateWithoutEvent',
    fields: () => ({
      id: 'Int',
      user: UserEventUpdateUser,
      userId: 'Int',
      notes: 'String',
    }),
  });
export const UserEventWithoutEventFilter: InputObjectRef<Prisma.Prisma.UserEventWhereInput> =
  builder.prismaWhere('UserEvent', {
    name: 'UserEventWithoutEventFilter',
    fields: () => ({
      id: IntFilter,
      user: UserFilter,
      userId: IntFilter,
      notes: StringFilter,
    }),
  });
export const EventUpdateUserEvents = builder.prismaUpdateRelation(
  'Event',
  'userEvents',
  {
    fields: () => ({
      create: UserEventCreateWithoutEvent,
      set: UserEventUniqueFilter,
      disconnect: UserEventUniqueFilter,
      delete: UserEventUniqueFilter,
      connect: UserEventUniqueFilter,
      update: {
        where: UserEventUniqueFilter,
        data: UserEventUpdateWithoutEvent,
      },
      updateMany: {
        where: UserEventWithoutEventFilter,
        data: UserEventUpdateWithoutEvent,
      },
      deleteMany: UserEventWithoutEventFilter,
    }),
  }
);
export const EventUpdateWithoutArtists: InputObjectRef<Prisma.Prisma.EventUpdateWithoutArtistsInput> =
  builder.prismaUpdate('Event', {
    name: 'EventUpdateWithoutArtists',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      venue: EventUpdateVenue,
      venueId: 'Int',
      userEvents: EventUpdateUserEvents,
    }),
  });
export const EventArtistUpdateEvent = builder.prismaUpdateRelation(
  'EventArtist',
  'event',
  {
    fields: () => ({
      create: EventCreateWithoutArtists,
      update: EventUpdateWithoutArtists,
      connect: EventUniqueFilter,
    }),
  }
);
export const EventArtistUpdateWithoutArtist: InputObjectRef<Prisma.Prisma.EventArtistUpdateWithoutArtistInput> =
  builder.prismaUpdate('EventArtist', {
    name: 'EventArtistUpdateWithoutArtist',
    fields: () => ({
      id: 'Int',
      event: EventArtistUpdateEvent,
      eventId: 'Int',
    }),
  });
export const EventArtistWithoutArtistFilter: InputObjectRef<Prisma.Prisma.EventArtistWhereInput> =
  builder.prismaWhere('EventArtist', {
    name: 'EventArtistWithoutArtistFilter',
    fields: () => ({
      id: IntFilter,
      event: EventFilter,
      eventId: IntFilter,
    }),
  });
export const ArtistUpdateEvents = builder.prismaUpdateRelation(
  'Artist',
  'events',
  {
    fields: () => ({
      create: EventArtistCreateWithoutArtist,
      set: EventArtistUniqueFilter,
      disconnect: EventArtistUniqueFilter,
      delete: EventArtistUniqueFilter,
      connect: EventArtistUniqueFilter,
      update: {
        where: EventArtistUniqueFilter,
        data: EventArtistUpdateWithoutArtist,
      },
      updateMany: {
        where: EventArtistWithoutArtistFilter,
        data: EventArtistUpdateWithoutArtist,
      },
      deleteMany: EventArtistWithoutArtistFilter,
    }),
  }
);
export const ArtistUpdate: InputObjectRef<Prisma.Prisma.ArtistUpdateInput> =
  builder.prismaUpdate('Artist', {
    name: 'ArtistUpdate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      spotifyID: 'String',
      events: ArtistUpdateEvents,
    }),
  });
export const EventCreateWithoutVenue: InputObjectRef<Prisma.Prisma.EventCreateWithoutVenueInput> =
  builder.prismaCreate('Event', {
    name: 'EventCreateWithoutVenue',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      artists: EventCreateArtists,
      userEvents: EventCreateUserEvents,
    }),
  });
export const VenueCreateEvents = builder.prismaCreateRelation(
  'Venue',
  'events',
  {
    fields: () => ({
      create: EventCreateWithoutVenue,
      connect: EventUniqueFilter,
    }),
  }
);
export const VenueCreate: InputObjectRef<Prisma.Prisma.VenueCreateInput> =
  builder.prismaCreate('Venue', {
    name: 'VenueCreate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      address1: 'String',
      address2: 'String',
      city: 'String',
      state: 'String',
      zip: 'String',
      lat: 'Float',
      long: 'Float',
      googlePlacesID: 'String',
      events: VenueCreateEvents,
    }),
  });
export const EventUpdateWithoutVenue: InputObjectRef<Prisma.Prisma.EventUpdateWithoutVenueInput> =
  builder.prismaUpdate('Event', {
    name: 'EventUpdateWithoutVenue',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      artists: EventUpdateArtists,
      userEvents: EventUpdateUserEvents,
    }),
  });
export const EventWithoutVenueFilter: InputObjectRef<Prisma.Prisma.EventWhereInput> =
  builder.prismaWhere('Event', {
    name: 'EventWithoutVenueFilter',
    fields: () => ({
      id: IntFilter,
      name: StringFilter,
      date: DateTimeFilter,
      artists: EventArtistListFilter,
      userEvents: UserEventListFilter,
    }),
  });
export const VenueUpdateEvents = builder.prismaUpdateRelation(
  'Venue',
  'events',
  {
    fields: () => ({
      create: EventCreateWithoutVenue,
      set: EventUniqueFilter,
      disconnect: EventUniqueFilter,
      delete: EventUniqueFilter,
      connect: EventUniqueFilter,
      update: {
        where: EventUniqueFilter,
        data: EventUpdateWithoutVenue,
      },
      updateMany: {
        where: EventWithoutVenueFilter,
        data: EventUpdateWithoutVenue,
      },
      deleteMany: EventWithoutVenueFilter,
    }),
  }
);
export const VenueUpdate: InputObjectRef<Prisma.Prisma.VenueUpdateInput> =
  builder.prismaUpdate('Venue', {
    name: 'VenueUpdate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      address1: 'String',
      address2: 'String',
      city: 'String',
      state: 'String',
      zip: 'String',
      lat: 'Float',
      long: 'Float',
      googlePlacesID: 'String',
      events: VenueUpdateEvents,
    }),
  });
export const EventCreate: InputObjectRef<Prisma.Prisma.EventCreateInput> =
  builder.prismaCreate('Event', {
    name: 'EventCreate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      artists: EventCreateArtists,
      venue: EventCreateVenue,
      venueId: 'Int',
      userEvents: EventCreateUserEvents,
    }),
  });
export const EventUpdate: InputObjectRef<Prisma.Prisma.EventUpdateInput> =
  builder.prismaUpdate('Event', {
    name: 'EventUpdate',
    fields: () => ({
      id: 'Int',
      name: 'String',
      date: 'DateTime',
      artists: EventUpdateArtists,
      venue: EventUpdateVenue,
      venueId: 'Int',
      userEvents: EventUpdateUserEvents,
    }),
  });
export const EventArtistCreate: InputObjectRef<Prisma.Prisma.EventArtistCreateInput> =
  builder.prismaCreate('EventArtist', {
    name: 'EventArtistCreate',
    fields: () => ({
      id: 'Int',
      event: EventArtistCreateEvent,
      eventId: 'Int',
      artist: EventArtistCreateArtist,
      artistId: 'Int',
    }),
  });
export const EventArtistUpdate: InputObjectRef<Prisma.Prisma.EventArtistUpdateInput> =
  builder.prismaUpdate('EventArtist', {
    name: 'EventArtistUpdate',
    fields: () => ({
      id: 'Int',
      event: EventArtistUpdateEvent,
      eventId: 'Int',
      artist: EventArtistUpdateArtist,
      artistId: 'Int',
    }),
  });
export const UserEventCreate: InputObjectRef<Prisma.Prisma.UserEventCreateInput> =
  builder.prismaCreate('UserEvent', {
    name: 'UserEventCreate',
    fields: () => ({
      id: 'Int',
      user: UserEventCreateUser,
      userId: 'Int',
      event: UserEventCreateEvent,
      eventId: 'Int',
      notes: 'String',
    }),
  });
export const UserEventUpdate: InputObjectRef<Prisma.Prisma.UserEventUpdateInput> =
  builder.prismaUpdate('UserEvent', {
    name: 'UserEventUpdate',
    fields: () => ({
      id: 'Int',
      user: UserEventUpdateUser,
      userId: 'Int',
      event: UserEventUpdateEvent,
      eventId: 'Int',
      notes: 'String',
    }),
  });
