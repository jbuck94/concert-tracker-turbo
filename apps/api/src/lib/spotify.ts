import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { getOrThrow } from 'runtime';

export const spotifyClient = SpotifyApi.withClientCredentials(
  getOrThrow('SPOTIFY_CLIENT_ID'),
  getOrThrow('SPOTIFY_CLIENT_SECRET')
);
