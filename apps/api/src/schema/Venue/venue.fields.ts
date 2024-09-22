import builder from 'src/builder';
import { IDFilter, StringFilter } from 'src/schema/Filters';

export const VenueWhere = builder.prismaWhere('Venue', {
  fields: (t) => ({
    id: IDFilter,
    name: StringFilter,
    address1: StringFilter,
    address2: StringFilter,
    city: StringFilter,
    state: StringFilter,
    zip: StringFilter,
    googlePlacesID: StringFilter,
  }),
});

export const VenueListFilter = builder.prismaListFilter(VenueWhere, {
  ops: ['every', 'some', 'none'],
});

builder.prismaObject('Venue', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    address1: t.exposeString('address1'),
    address2: t.exposeString('address2'),
    city: t.exposeString('city'),
    state: t.exposeString('state'),
    zip: t.exposeString('zip'),
    lat: t.exposeFloat('lat'),
    long: t.exposeFloat('long'),
    googlePlacesID: t.exposeString('googlePlacesID'),
    events: t.relatedConnection('events', { cursor: 'id' }),
  }),
});
