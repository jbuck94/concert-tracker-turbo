import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const getOrThrow = (envVar: string): string => {
  console.log('process.env: ', process.env);
  if (process.env[envVar]) {
    return process.env[envVar] as string;
  } else {
    throw new Error(`Environment Variable Not Set: ${envVar}`);
  }
};

export const spotifyClient = SpotifyApi.withClientCredentials(
  'e1dd91f67d0943a9a141a5e62288f4ca',
  '9e2a1bf31d0b4a90b59293325d639104'
);
// export const spotifyClient = SpotifyApi.withClientCredentials(
//   getOrThrow('SPOTIFY_CLIENT_ID'),
//   getOrThrow('SPOTIFY_CLIENT_SECRET')
// );
