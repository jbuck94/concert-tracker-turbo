import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Artist = {
  __typename?: 'Artist';
  events: ArtistEventsConnection;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  spotifyID: Scalars['String']['output'];
};


export type ArtistEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtistEventsConnection = {
  __typename?: 'ArtistEventsConnection';
  edges: Array<Maybe<ArtistEventsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type ArtistEventsConnectionEdge = {
  __typename?: 'ArtistEventsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: EventArtist;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Event = {
  __typename?: 'Event';
  artists: EventArtistsConnection;
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  venue: Venue;
};


export type EventArtistsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventArtistListFilter>;
};

export type EventArtist = {
  __typename?: 'EventArtist';
  artist: Artist;
  event: Event;
  id: Scalars['ID']['output'];
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
  cursor: Scalars['String']['output'];
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
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: User;
};


export type MutationSignUpArgs = {
  avatar: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  artist?: Maybe<Artist>;
  artists: QueryArtistsConnection;
  user: User;
  users: QueryUsersConnection;
};


export type QueryArtistArgs = {
  input: QueryArtistInput;
};


export type QueryArtistsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryArtistInput = {
  id: Scalars['Int']['input'];
};

export type QueryArtistsConnection = {
  __typename?: 'QueryArtistsConnection';
  edges: Array<Maybe<QueryArtistsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryArtistsConnectionEdge = {
  __typename?: 'QueryArtistsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Artist;
};

export type QueryUsersConnection = {
  __typename?: 'QueryUsersConnection';
  edges: Array<Maybe<QueryUsersConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryUsersConnectionEdge = {
  __typename?: 'QueryUsersConnectionEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilter>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  events: UserEventsConnection;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};


export type UserEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type UserEvent = {
  __typename?: 'UserEvent';
  event: Event;
  id: Scalars['ID']['output'];
  user: User;
};

export type UserEventFilter = {
  event?: InputMaybe<EventFilter>;
  id?: InputMaybe<IntFilter>;
};

export type UserEventListFilter = {
  every?: InputMaybe<UserEventFilter>;
  none?: InputMaybe<UserEventFilter>;
  some?: InputMaybe<UserEventFilter>;
};

export type UserEventsConnection = {
  __typename?: 'UserEventsConnection';
  edges: Array<Maybe<UserEventsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type UserEventsConnectionEdge = {
  __typename?: 'UserEventsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: UserEvent;
};

export type UserFilter = {
  email?: InputMaybe<StringFilter>;
  events?: InputMaybe<UserEventListFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type Venue = {
  __typename?: 'Venue';
  address1: Scalars['String']['output'];
  address2: Scalars['String']['output'];
  city: Scalars['String']['output'];
  events: VenueEventsConnection;
  googlePlacesID: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  long: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  state: Scalars['String']['output'];
  zip: Scalars['String']['output'];
};


export type VenueEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type VenueEventsConnection = {
  __typename?: 'VenueEventsConnection';
  edges: Array<Maybe<VenueEventsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type VenueEventsConnectionEdge = {
  __typename?: 'VenueEventsConnectionEdge';
  cursor: Scalars['String']['output'];
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

export type ListArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListArtistsQuery = { __typename?: 'Query', artists: { __typename?: 'QueryArtistsConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null }, edges: Array<{ __typename?: 'QueryArtistsConnectionEdge', node: { __typename?: 'Artist', spotifyID: string, name: string, id: string } } | null> } };


export const ListArtistsDocument = gql`
    query ListArtists {
  artists {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        spotifyID
        name
        id
      }
    }
  }
}
    `;

/**
 * __useListArtistsQuery__
 *
 * To run a query within a React component, call `useListArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListArtistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListArtistsQuery(baseOptions?: Apollo.QueryHookOptions<ListArtistsQuery, ListArtistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListArtistsQuery, ListArtistsQueryVariables>(ListArtistsDocument, options);
      }
export function useListArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListArtistsQuery, ListArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListArtistsQuery, ListArtistsQueryVariables>(ListArtistsDocument, options);
        }
export function useListArtistsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListArtistsQuery, ListArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListArtistsQuery, ListArtistsQueryVariables>(ListArtistsDocument, options);
        }
export type ListArtistsQueryHookResult = ReturnType<typeof useListArtistsQuery>;
export type ListArtistsLazyQueryHookResult = ReturnType<typeof useListArtistsLazyQuery>;
export type ListArtistsSuspenseQueryHookResult = ReturnType<typeof useListArtistsSuspenseQuery>;
export type ListArtistsQueryResult = Apollo.QueryResult<ListArtistsQuery, ListArtistsQueryVariables>;