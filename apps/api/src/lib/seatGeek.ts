import axios, { Axios } from 'axios';

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
    const { data } = await this.client.get<SeatGeekVenue>(`/venues/${venueId}`);
    console.log('data: ', data);

    return data;
  };

  public searchVenues = async (search: string) => {
    const { data } = await this.client.get<SeatGeekVenueResponse>(
      `/venues?q=${search}`
    );
    console.log('data: ', JSON.stringify(data, null, 2));

    return data.venues;
  };
}
