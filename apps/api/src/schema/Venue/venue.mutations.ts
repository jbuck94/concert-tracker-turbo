import builder from '@/src/builder';
import { handlePrismaError } from '@/src/lib/handlePrismaError';
import { SeatGeekClient } from '@/src/lib/seatGeek';
import {
  ErrorForbidden,
  ErrorInvalidRequest,
  ErrorNotFound,
} from '@/src/schema/Error/error.model';

builder.mutationFields((t) => ({
  createVenue: t.prismaField({
    type: 'Venue',
    args: {
      seatGeekID: t.arg.string({ required: true }),
    },
    errors: {
      types: [ErrorNotFound, ErrorForbidden, ErrorInvalidRequest],
    },
    resolve: async (_query, _, args, context) => {
      const seatGeekVenue = await new SeatGeekClient().getVenue(
        args.seatGeekID
      );

      if (!seatGeekVenue.id) {
        throw new ErrorNotFound('Venue Not Found');
      }

      return context.db.venue
        .create({
          data: {
            name: seatGeekVenue.name,
            address1: seatGeekVenue.address,
            city: seatGeekVenue.city,
            state: seatGeekVenue.state,
            lat: seatGeekVenue.location.lat,
            long: seatGeekVenue.location.lon,
            googlePlacesID: seatGeekVenue.id.toString(),
          },
        })
        .catch((e) => handlePrismaError(e, 'Venue', 'create'));
    },
  }),
}));
