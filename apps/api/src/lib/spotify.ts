import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { getOrThrow } from 'runtime';

let spotifyClient: SpotifyApi;

export const getSpotifyClient = () => {
  if (!spotifyClient) {
    spotifyClient = SpotifyApi.withClientCredentials(
      getOrThrow('SPOTIFY_CLIENT_ID'),
      getOrThrow('SPOTIFY_CLIENT_SECRET')
    );
  }

  return spotifyClient;
};
