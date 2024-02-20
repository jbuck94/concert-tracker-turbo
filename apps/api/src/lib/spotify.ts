import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const getOrThrow = (envVar: string): string => {
  if (process.env[envVar]) {
    return process.env[envVar] as string;
  } else {
    throw new Error(`Environment Variable Not Set: ${envVar}`);
  }
};

export const spotifyClient = SpotifyApi.withClientCredentials(
  getOrThrow('SPOTIFY_CLIENT_ID'),
  getOrThrow('SPOTIFY_CLIENT_SECRET')
);
