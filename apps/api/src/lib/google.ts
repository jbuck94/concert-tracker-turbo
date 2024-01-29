import { Client } from '@googlemaps/google-maps-services-js';

export const googleClient = new Client({});

// client
//   .elevation({
//     params: {
//       locations: [{ lat: 45, lng: -110 }],
//       key: 'AIzaSyDEA_sSLLH0Y5l-56UlYXUsS_MzIWqkYsw',
//     },
//     timeout: 1000, // milliseconds
//   })
//   .then((r) => {
//     console.log(r.data.results[0].elevation);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
