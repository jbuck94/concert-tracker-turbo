import axios, { Axios } from 'axios';
import { writeFile } from 'fs';

type SeatGeekMeta = {
  took: number;
  geolocation: null;
  per_page: number;
  total: number;
  page: number;
};

type SeatBaseGeekResponse = {
  meta: SeatGeekMeta;
};

type SeatGeekVenueResponse = SeatBaseGeekResponse & {
  venues: SeatGeekVenue[];
};

type SeatGeekLocation = {
  lat: number;
  lon: number;
};

type SeatGeekVenue = {
  state: string;
  name_v2: string;
  postal_code: string;
  name: string;
  links: [];
  timezone: string;
  url: string;
  score: number;
  location: SeatGeekLocation;
  address: string;
  country: string;
  has_upcoming_events: boolean;
  num_upcoming_events: number;
  city: string;
  slug: string;
  extended_address: string;
  id: number;
  popularity: number;
  access_method: null;
  metro_code: number;
  capacity: number;
  display_location: string;
};

export class SeatGeekClient {
  private client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.seatgeek.com/2',
      timeout: 1000,
      params: {
        client_id: process.env.SEATGEEK_CLIENT_ID,
      },
    });
  }

  public getVenue = async (venueId: string) => {
    const { data } = await this.client.get<SeatGeekVenue | undefined>(
      `/venues/${venueId}`
    );

    return data;
  };

  public searchVenues = async (search: string) => {
    const { data } = await this.client.get<SeatGeekVenueResponse>(
      `/venues?q=${search}`
    );

    return data.venues;
  };

  // https://api.seatgeek.com/2/events?q=boston+celtics

  public searchEvents = async (q: string) => {
    try {
      const { data } = await this.client.get('/events', {
        params: {
          q,
          'taxonomies.name': 'concert',
          sort: 'datetime_utc.desc',
          // 'datetime_utc.lte': '2024-01-01',
        },
      });

      writeFile(
        './searchResults.json',
        JSON.stringify(data, null, 2),
        () => {}
      );

      console.log('NumEvents', data.events.length);
      data.events.forEach((event: any) =>
        console.log(
          event.title,
          '@',
          event.venue.name_v2,
          'on',
          new Date(event.datetime_utc).toLocaleDateString()
        )
      );
    } catch (e) {
      console.error(e);
    }
  };
}
