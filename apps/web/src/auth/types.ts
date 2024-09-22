import { RedirectLoginOptions } from '@auth0/auth0-react';
import { MeQueryResult } from 'apollo/generated-types';

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type JWTContextType = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: AuthUserType;
  method: string;
  login: (email: string, password: string) => Promise<void>;
  // loginWithGoogle: () => {};
  // loginWithGithub: () => {};
  // loginWithTwitter: () => {};
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => void;
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser =
  | NonNullable<MeQueryResult['data']>['me']
  | null
  | undefined;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type Auth0ContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'auth0';
  login: (options?: RedirectLoginOptions) => Promise<void>;
  logout: VoidFunction;
};
