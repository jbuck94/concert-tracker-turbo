import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  JSON: any;
};

export type Artist = {
  __typename?: 'Artist';
  events: ArtistEventsConnection;
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  spotifyID: Scalars['String'];
};


export type ArtistEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtistEventsConnection = {
  __typename?: 'ArtistEventsConnection';
  edges: Array<Maybe<ArtistEventsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type ArtistEventsConnectionEdge = {
  __typename?: 'ArtistEventsConnectionEdge';
  cursor: Scalars['String'];
  node: EventArtist;
};

export type ArtistsAutocompleteInput = {
  name: Scalars['String'];
};

export type BaseError = {
  message: Scalars['String'];
};

export type CreateUserEventInput = {
  artistSpotifyIds: Array<Scalars['String']>;
  date: Scalars['DateTime'];
  forceCreateEvent?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Scalars['String']>;
  venueSeatGeekId: Scalars['String'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
};

export type ErrorEventExists = BaseError & {
  __typename?: 'ErrorEventExists';
  message: Scalars['String'];
  possibleEvents: ErrorEventExistsPossibleEventsConnection;
};


export type ErrorEventExistsPossibleEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ErrorEventExistsPossibleEventsConnection = {
  __typename?: 'ErrorEventExistsPossibleEventsConnection';
  edges: Array<ErrorEventExistsPossibleEventsConnectionEdge>;
  pageInfo: PageInfo;
};

export type ErrorEventExistsPossibleEventsConnectionEdge = {
  __typename?: 'ErrorEventExistsPossibleEventsConnectionEdge';
  cursor: Scalars['String'];
  node: Event;
};

export type ErrorForbidden = BaseError & {
  __typename?: 'ErrorForbidden';
  message: Scalars['String'];
};

export type ErrorInvalidRequest = BaseError & {
  __typename?: 'ErrorInvalidRequest';
  message: Scalars['String'];
};

export type ErrorNotFound = BaseError & {
  __typename?: 'ErrorNotFound';
  message: Scalars['String'];
};

export type ErrorUniqueConstraint = BaseError & {
  __typename?: 'ErrorUniqueConstraint';
  message: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  artists: EventArtistsConnection;
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  venue: Venue;
};


export type EventArtistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventArtistListFilter>;
};

export type EventArtist = {
  __typename?: 'EventArtist';
  artist: Artist;
  event: Event;
  id: Scalars['ID'];
};

export type EventArtistFilter = {
  id?: InputMaybe<IntFilter>;
};

export type EventArtistListFilter = {
  every?: InputMaybe<EventArtistFilter>;
  none?: InputMaybe<EventArtistFilter>;
  some?: InputMaybe<EventArtistFilter>;
};

export type EventArtistsConnection = {
  __typename?: 'EventArtistsConnection';
  edges: Array<Maybe<EventArtistsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type EventArtistsConnectionEdge = {
  __typename?: 'EventArtistsConnectionEdge';
  cursor: Scalars['String'];
  node: EventArtist;
};

export type EventFilter = {
  date?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  venue?: InputMaybe<VenueFilter>;
};

export type EventListFilter = {
  every?: InputMaybe<EventFilter>;
  none?: InputMaybe<EventFilter>;
  some?: InputMaybe<EventFilter>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArtist: MutationCreateArtistResult;
  createEvent: MutationCreateEventResult;
  createVenue: MutationCreateVenueResult;
  signUp: User;
};


export type MutationCreateArtistArgs = {
  spotifyID: Scalars['String'];
};


export type MutationCreateEventArgs = {
  input: CreateUserEventInput;
};


export type MutationCreateVenueArgs = {
  seatGeekID: Scalars['String'];
};


export type MutationSignUpArgs = {
  avatar: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type MutationCreateArtistResult = ErrorInvalidRequest | ErrorNotFound | ErrorUniqueConstraint | MutationCreateArtistSuccess;

export type MutationCreateArtistSuccess = {
  __typename?: 'MutationCreateArtistSuccess';
  data: Artist;
};

export type MutationCreateEventResult = ErrorEventExists | ErrorInvalidRequest | ErrorNotFound | ErrorUniqueConstraint | MutationCreateEventSuccess;

export type MutationCreateEventSuccess = {
  __typename?: 'MutationCreateEventSuccess';
  data: UserEvent;
};

export type MutationCreateVenueResult = ErrorForbidden | ErrorInvalidRequest | ErrorNotFound | MutationCreateVenueSuccess;

export type MutationCreateVenueSuccess = {
  __typename?: 'MutationCreateVenueSuccess';
  data: Venue;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  artist?: Maybe<Artist>;
  artistAutocomplete: QueryArtistAutocompleteConnection;
  artists: QueryArtistsConnection;
  events: QueryEventsConnection;
  me?: Maybe<User>;
  user: User;
  users: QueryUsersConnection;
  venueAutocomplete: QueryVenueAutocompleteConnection;
  venues: QueryVenuesConnection;
};


export type QueryArtistArgs = {
  input: QueryArtistInput;
};


export type QueryArtistAutocompleteArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input: ArtistsAutocompleteInput;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryArtistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  userId: Scalars['Int'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryVenueAutocompleteArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input: VenueAutocompleteInput;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryVenuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryArtistAutocompleteConnection = {
  __typename?: 'QueryArtistAutocompleteConnection';
  edges: Array<QueryArtistAutocompleteConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryArtistAutocompleteConnectionEdge = {
  __typename?: 'QueryArtistAutocompleteConnectionEdge';
  cursor: Scalars['String'];
  node: SpotifyArtist;
};

export type QueryArtistInput = {
  id: Scalars['Int'];
};

export type QueryArtistsConnection = {
  __typename?: 'QueryArtistsConnection';
  edges: Array<QueryArtistsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryArtistsConnectionEdge = {
  __typename?: 'QueryArtistsConnectionEdge';
  cursor: Scalars['String'];
  node: Artist;
};

export type QueryEventsConnection = {
  __typename?: 'QueryEventsConnection';
  edges: Array<QueryEventsConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryEventsConnectionEdge = {
  __typename?: 'QueryEventsConnectionEdge';
  cursor: Scalars['String'];
  node: Event;
};

export type QueryUsersConnection = {
  __typename?: 'QueryUsersConnection';
  edges: Array<Maybe<QueryUsersConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryUsersConnectionEdge = {
  __typename?: 'QueryUsersConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type QueryVenueAutocompleteConnection = {
  __typename?: 'QueryVenueAutocompleteConnection';
  edges: Array<QueryVenueAutocompleteConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryVenueAutocompleteConnectionEdge = {
  __typename?: 'QueryVenueAutocompleteConnectionEdge';
  cursor: Scalars['String'];
  node: VenueAutocompleteResult;
};

export type QueryVenuesConnection = {
  __typename?: 'QueryVenuesConnection';
  edges: Array<QueryVenuesConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryVenuesConnectionEdge = {
  __typename?: 'QueryVenuesConnectionEdge';
  cursor: Scalars['String'];
  node: Venue;
};

export type SpotifyArtist = {
  __typename?: 'SpotifyArtist';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilter>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  events: UserEventsConnection;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: UserRole;
  topArtist?: Maybe<Artist>;
  topVenue?: Maybe<Venue>;
  totalArtistCount: Scalars['Int'];
  totalVenueCount: Scalars['Int'];
};


export type UserEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserEvent = {
  __typename?: 'UserEvent';
  event: Event;
  id: Scalars['ID'];
  notes: Scalars['String'];
  user: User;
};

export type UserEventsConnection = {
  __typename?: 'UserEventsConnection';
  edges: Array<UserEventsConnectionEdge>;
  pageInfo: PageInfo;
};

export type UserEventsConnectionEdge = {
  __typename?: 'UserEventsConnectionEdge';
  cursor: Scalars['String'];
  node: UserEvent;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Venue = {
  __typename?: 'Venue';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  events: VenueEventsConnection;
  googlePlacesID: Scalars['String'];
  id: Scalars['ID'];
  lat: Scalars['Float'];
  long: Scalars['Float'];
  name: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
};


export type VenueEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type VenueAutocompleteInput = {
  name: Scalars['String'];
};

export type VenueAutocompleteResult = {
  __typename?: 'VenueAutocompleteResult';
  addressString: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type VenueEventsConnection = {
  __typename?: 'VenueEventsConnection';
  edges: Array<Maybe<VenueEventsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type VenueEventsConnectionEdge = {
  __typename?: 'VenueEventsConnectionEdge';
  cursor: Scalars['String'];
  node: Event;
};

export type VenueFilter = {
  address1?: InputMaybe<StringFilter>;
  address2?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  googlePlacesID?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  state?: InputMaybe<StringFilter>;
  zip?: InputMaybe<StringFilter>;
};

export type VenueListFilter = {
  every?: InputMaybe<VenueFilter>;
  none?: InputMaybe<VenueFilter>;
  some?: InputMaybe<VenueFilter>;
};

export type ArtistFragment = { __typename?: 'Artist', id: string, spotifyID: string, name: string, image?: string | null, genres: Array<string> };

export type ArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistsQuery = { __typename?: 'Query', artists: { __typename?: 'QueryArtistsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryArtistsConnectionEdge', node: { __typename?: 'Artist', id: string, spotifyID: string, name: string, image?: string | null, genres: Array<string> } }> } };

export type SpotifyArtistFragment = { __typename?: 'SpotifyArtist', name: string, id: string };

export type ArtistAutocompleteQueryVariables = Exact<{
  input: ArtistsAutocompleteInput;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type ArtistAutocompleteQuery = { __typename?: 'Query', artistAutocomplete: { __typename?: 'QueryArtistAutocompleteConnection', edges: Array<{ __typename?: 'QueryArtistAutocompleteConnectionEdge', node: { __typename?: 'SpotifyArtist', name: string, id: string } }> } };

export type CreateArtistMutationVariables = Exact<{
  spotifyId: Scalars['String'];
}>;


export type CreateArtistMutation = { __typename?: 'Mutation', createArtist: { __typename?: 'ErrorInvalidRequest', message: string } | { __typename?: 'ErrorNotFound', message: string } | { __typename?: 'ErrorUniqueConstraint', message: string } | { __typename?: 'MutationCreateArtistSuccess', data: { __typename?: 'Artist', id: string, spotifyID: string, name: string, image?: string | null, genres: Array<string> } } };

export type EventFragment = { __typename?: 'Event', id: string, name: string, date: Date, venue: { __typename?: 'Venue', id: string, name: string, city: string, state: string }, artists: { __typename?: 'EventArtistsConnection', edges: Array<{ __typename?: 'EventArtistsConnectionEdge', node: { __typename?: 'EventArtist', id: string, artist: { __typename?: 'Artist', id: string, name: string, image?: string | null } } } | null> } };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: { __typename?: 'QueryEventsConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QueryEventsConnectionEdge', cursor: string, node: { __typename?: 'Event', id: string, name: string, date: Date, venue: { __typename?: 'Venue', id: string, name: string, city: string, state: string }, artists: { __typename?: 'EventArtistsConnection', edges: Array<{ __typename?: 'EventArtistsConnectionEdge', node: { __typename?: 'EventArtist', id: string, artist: { __typename?: 'Artist', id: string, name: string, image?: string | null } } } | null> } } }> } };

export type MyEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEventsQuery = { __typename?: 'Query', me?: { __typename?: 'User', totalVenueCount: number, totalArtistCount: number, topVenue?: { __typename?: 'Venue', id: string, name: string } | null, topArtist?: { __typename?: 'Artist', id: string, name: string } | null, events: { __typename?: 'UserEventsConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'UserEventsConnectionEdge', cursor: string, node: { __typename?: 'UserEvent', id: string, notes: string, event: { __typename?: 'Event', id: string, name: string, date: Date, venue: { __typename?: 'Venue', id: string, name: string, city: string, state: string }, artists: { __typename?: 'EventArtistsConnection', edges: Array<{ __typename?: 'EventArtistsConnectionEdge', node: { __typename?: 'EventArtist', id: string, artist: { __typename?: 'Artist', id: string, name: string, image?: string | null } } } | null> } } } }> } } | null };

export type CreateUserEventMutationVariables = Exact<{
  input: CreateUserEventInput;
}>;


export type CreateUserEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'ErrorEventExists', message: string, possibleEvents: { __typename?: 'ErrorEventExistsPossibleEventsConnection', edges: Array<{ __typename?: 'ErrorEventExistsPossibleEventsConnectionEdge', node: { __typename?: 'Event', id: string, name: string, date: Date, venue: { __typename?: 'Venue', id: string, name: string, city: string, state: string }, artists: { __typename?: 'EventArtistsConnection', edges: Array<{ __typename?: 'EventArtistsConnectionEdge', node: { __typename?: 'EventArtist', id: string, artist: { __typename?: 'Artist', id: string, name: string, image?: string | null } } } | null> } } }> } } | { __typename?: 'ErrorInvalidRequest', message: string } | { __typename?: 'ErrorNotFound', message: string } | { __typename?: 'ErrorUniqueConstraint', message: string } | { __typename?: 'MutationCreateEventSuccess', data: { __typename?: 'UserEvent', id: string, event: { __typename?: 'Event', id: string, name: string, date: Date, venue: { __typename?: 'Venue', id: string, name: string, city: string, state: string } }, user: { __typename?: 'User', id: string, events: { __typename?: 'UserEventsConnection', edges: Array<{ __typename?: 'UserEventsConnectionEdge', node: { __typename?: 'UserEvent', notes: string, event: { __typename?: 'Event', id: string, name: string, date: Date, venue: { __typename?: 'Venue', id: string, name: string, city: string, state: string }, artists: { __typename?: 'EventArtistsConnection', edges: Array<{ __typename?: 'EventArtistsConnectionEdge', node: { __typename?: 'EventArtist', id: string, artist: { __typename?: 'Artist', id: string, name: string, image?: string | null } } } | null> } } } }> } } } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: UserRole } | null };

export type VenueFragment = { __typename?: 'Venue', id: string, name: string, city: string, state: string, long: number, lat: number };

export type VenuesQueryVariables = Exact<{ [key: string]: never; }>;


export type VenuesQuery = { __typename?: 'Query', venues: { __typename?: 'QueryVenuesConnection', edges: Array<{ __typename?: 'QueryVenuesConnectionEdge', node: { __typename?: 'Venue', id: string, name: string, city: string, state: string, long: number, lat: number } }> } };

export type VenueAutocompleteResultFragment = { __typename?: 'VenueAutocompleteResult', name: string, id: string, addressString: string };

export type VenueAutocompleteQueryVariables = Exact<{
  input: VenueAutocompleteInput;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type VenueAutocompleteQuery = { __typename?: 'Query', venueAutocomplete: { __typename?: 'QueryVenueAutocompleteConnection', edges: Array<{ __typename?: 'QueryVenueAutocompleteConnectionEdge', cursor: string, node: { __typename?: 'VenueAutocompleteResult', name: string, id: string, addressString: string } }> } };

export type CreateVenueMutationVariables = Exact<{
  seatGeekId: Scalars['String'];
}>;


export type CreateVenueMutation = { __typename?: 'Mutation', createVenue: { __typename?: 'ErrorForbidden', message: string } | { __typename?: 'ErrorInvalidRequest', message: string } | { __typename?: 'ErrorNotFound', message: string } | { __typename?: 'MutationCreateVenueSuccess', data: { __typename?: 'Venue', id: string, name: string, city: string, state: string, long: number, lat: number } } };

export const ArtistFragmentDoc = gql`
    fragment Artist on Artist {
  id
  spotifyID
  name
  image
  genres
}
    `;
export const SpotifyArtistFragmentDoc = gql`
    fragment SpotifyArtist on SpotifyArtist {
  name
  id
}
    `;
export const EventFragmentDoc = gql`
    fragment Event on Event {
  id
  name
  date
  venue {
    id
    name
    city
    state
  }
  artists {
    edges {
      node {
        id
        artist {
          id
          name
          image
        }
      }
    }
  }
}
    `;
export const VenueFragmentDoc = gql`
    fragment Venue on Venue {
  id
  name
  city
  state
  long
  lat
}
    `;
export const VenueAutocompleteResultFragmentDoc = gql`
    fragment VenueAutocompleteResult on VenueAutocompleteResult {
  name
  id
  addressString
}
    `;
export const ArtistsDocument = gql`
    query Artists {
  artists {
    totalCount
    edges {
      node {
        ...Artist
      }
    }
  }
}
    ${ArtistFragmentDoc}`;

/**
 * __useArtistsQuery__
 *
 * To run a query within a React component, call `useArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useArtistsQuery(baseOptions?: Apollo.QueryHookOptions<ArtistsQuery, ArtistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, options);
      }
export function useArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistsQuery, ArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, options);
        }
export type ArtistsQueryHookResult = ReturnType<typeof useArtistsQuery>;
export type ArtistsLazyQueryHookResult = ReturnType<typeof useArtistsLazyQuery>;
export type ArtistsQueryResult = Apollo.QueryResult<ArtistsQuery, ArtistsQueryVariables>;
export const ArtistAutocompleteDocument = gql`
    query ArtistAutocomplete($input: ArtistsAutocompleteInput!, $first: Int) {
  artistAutocomplete(input: $input, first: $first) {
    edges {
      node {
        ...SpotifyArtist
      }
    }
  }
}
    ${SpotifyArtistFragmentDoc}`;

/**
 * __useArtistAutocompleteQuery__
 *
 * To run a query within a React component, call `useArtistAutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistAutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistAutocompleteQuery({
 *   variables: {
 *      input: // value for 'input'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useArtistAutocompleteQuery(baseOptions: Apollo.QueryHookOptions<ArtistAutocompleteQuery, ArtistAutocompleteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistAutocompleteQuery, ArtistAutocompleteQueryVariables>(ArtistAutocompleteDocument, options);
      }
export function useArtistAutocompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistAutocompleteQuery, ArtistAutocompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistAutocompleteQuery, ArtistAutocompleteQueryVariables>(ArtistAutocompleteDocument, options);
        }
export type ArtistAutocompleteQueryHookResult = ReturnType<typeof useArtistAutocompleteQuery>;
export type ArtistAutocompleteLazyQueryHookResult = ReturnType<typeof useArtistAutocompleteLazyQuery>;
export type ArtistAutocompleteQueryResult = Apollo.QueryResult<ArtistAutocompleteQuery, ArtistAutocompleteQueryVariables>;
export const CreateArtistDocument = gql`
    mutation CreateArtist($spotifyId: String!) {
  createArtist(spotifyID: $spotifyId) {
    ... on MutationCreateArtistSuccess {
      data {
        ...Artist
      }
    }
    ... on ErrorNotFound {
      message
    }
    ... on ErrorUniqueConstraint {
      message
    }
    ... on ErrorInvalidRequest {
      message
    }
  }
}
    ${ArtistFragmentDoc}`;
export type CreateArtistMutationFn = Apollo.MutationFunction<CreateArtistMutation, CreateArtistMutationVariables>;

/**
 * __useCreateArtistMutation__
 *
 * To run a mutation, you first call `useCreateArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArtistMutation, { data, loading, error }] = useCreateArtistMutation({
 *   variables: {
 *      spotifyId: // value for 'spotifyId'
 *   },
 * });
 */
export function useCreateArtistMutation(baseOptions?: Apollo.MutationHookOptions<CreateArtistMutation, CreateArtistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArtistMutation, CreateArtistMutationVariables>(CreateArtistDocument, options);
      }
export type CreateArtistMutationHookResult = ReturnType<typeof useCreateArtistMutation>;
export type CreateArtistMutationResult = Apollo.MutationResult<CreateArtistMutation>;
export type CreateArtistMutationOptions = Apollo.BaseMutationOptions<CreateArtistMutation, CreateArtistMutationVariables>;
export const EventsDocument = gql`
    query Events {
  events {
    pageInfo {
      startCursor
      hasPreviousPage
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...Event
      }
    }
  }
}
    ${EventFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const MyEventsDocument = gql`
    query MyEvents {
  me {
    totalVenueCount
    totalArtistCount
    topVenue {
      id
      name
    }
    topArtist {
      id
      name
    }
    events {
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          event {
            ...Event
          }
          notes
        }
      }
    }
  }
}
    ${EventFragmentDoc}`;

/**
 * __useMyEventsQuery__
 *
 * To run a query within a React component, call `useMyEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEventsQuery(baseOptions?: Apollo.QueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
      }
export function useMyEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
        }
export type MyEventsQueryHookResult = ReturnType<typeof useMyEventsQuery>;
export type MyEventsLazyQueryHookResult = ReturnType<typeof useMyEventsLazyQuery>;
export type MyEventsQueryResult = Apollo.QueryResult<MyEventsQuery, MyEventsQueryVariables>;
export const CreateUserEventDocument = gql`
    mutation CreateUserEvent($input: CreateUserEventInput!) {
  createEvent(input: $input) {
    ... on ErrorInvalidRequest {
      message
    }
    ... on ErrorNotFound {
      message
    }
    ... on ErrorUniqueConstraint {
      message
    }
    ... on ErrorEventExists {
      message
      possibleEvents {
        edges {
          node {
            ...Event
          }
        }
      }
    }
    ... on MutationCreateEventSuccess {
      data {
        id
        event {
          id
          name
          date
          venue {
            id
            name
            city
            state
          }
        }
        user {
          id
          events {
            edges {
              node {
                event {
                  ...Event
                }
                notes
              }
            }
          }
        }
      }
    }
  }
}
    ${EventFragmentDoc}`;
export type CreateUserEventMutationFn = Apollo.MutationFunction<CreateUserEventMutation, CreateUserEventMutationVariables>;

/**
 * __useCreateUserEventMutation__
 *
 * To run a mutation, you first call `useCreateUserEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserEventMutation, { data, loading, error }] = useCreateUserEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserEventMutation, CreateUserEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserEventMutation, CreateUserEventMutationVariables>(CreateUserEventDocument, options);
      }
export type CreateUserEventMutationHookResult = ReturnType<typeof useCreateUserEventMutation>;
export type CreateUserEventMutationResult = Apollo.MutationResult<CreateUserEventMutation>;
export type CreateUserEventMutationOptions = Apollo.BaseMutationOptions<CreateUserEventMutation, CreateUserEventMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const VenuesDocument = gql`
    query Venues {
  venues {
    edges {
      node {
        ...Venue
      }
    }
  }
}
    ${VenueFragmentDoc}`;

/**
 * __useVenuesQuery__
 *
 * To run a query within a React component, call `useVenuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useVenuesQuery(baseOptions?: Apollo.QueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
      }
export function useVenuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
        }
export type VenuesQueryHookResult = ReturnType<typeof useVenuesQuery>;
export type VenuesLazyQueryHookResult = ReturnType<typeof useVenuesLazyQuery>;
export type VenuesQueryResult = Apollo.QueryResult<VenuesQuery, VenuesQueryVariables>;
export const VenueAutocompleteDocument = gql`
    query VenueAutocomplete($input: VenueAutocompleteInput!, $first: Int) {
  venueAutocomplete(input: $input, first: $first) {
    edges {
      cursor
      node {
        ...VenueAutocompleteResult
      }
    }
  }
}
    ${VenueAutocompleteResultFragmentDoc}`;

/**
 * __useVenueAutocompleteQuery__
 *
 * To run a query within a React component, call `useVenueAutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenueAutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenueAutocompleteQuery({
 *   variables: {
 *      input: // value for 'input'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useVenueAutocompleteQuery(baseOptions: Apollo.QueryHookOptions<VenueAutocompleteQuery, VenueAutocompleteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenueAutocompleteQuery, VenueAutocompleteQueryVariables>(VenueAutocompleteDocument, options);
      }
export function useVenueAutocompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenueAutocompleteQuery, VenueAutocompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenueAutocompleteQuery, VenueAutocompleteQueryVariables>(VenueAutocompleteDocument, options);
        }
export type VenueAutocompleteQueryHookResult = ReturnType<typeof useVenueAutocompleteQuery>;
export type VenueAutocompleteLazyQueryHookResult = ReturnType<typeof useVenueAutocompleteLazyQuery>;
export type VenueAutocompleteQueryResult = Apollo.QueryResult<VenueAutocompleteQuery, VenueAutocompleteQueryVariables>;
export const CreateVenueDocument = gql`
    mutation CreateVenue($seatGeekId: String!) {
  createVenue(seatGeekID: $seatGeekId) {
    ... on MutationCreateVenueSuccess {
      data {
        ...Venue
      }
    }
    ... on ErrorNotFound {
      message
    }
    ... on ErrorForbidden {
      message
    }
    ... on ErrorInvalidRequest {
      message
    }
  }
}
    ${VenueFragmentDoc}`;
export type CreateVenueMutationFn = Apollo.MutationFunction<CreateVenueMutation, CreateVenueMutationVariables>;

/**
 * __useCreateVenueMutation__
 *
 * To run a mutation, you first call `useCreateVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVenueMutation, { data, loading, error }] = useCreateVenueMutation({
 *   variables: {
 *      seatGeekId: // value for 'seatGeekId'
 *   },
 * });
 */
export function useCreateVenueMutation(baseOptions?: Apollo.MutationHookOptions<CreateVenueMutation, CreateVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVenueMutation, CreateVenueMutationVariables>(CreateVenueDocument, options);
      }
export type CreateVenueMutationHookResult = ReturnType<typeof useCreateVenueMutation>;
export type CreateVenueMutationResult = Apollo.MutationResult<CreateVenueMutation>;
export type CreateVenueMutationOptions = Apollo.BaseMutationOptions<CreateVenueMutation, CreateVenueMutationVariables>;