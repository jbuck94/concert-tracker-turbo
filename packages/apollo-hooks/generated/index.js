import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export const ArtistFragmentDoc = gql `
    fragment Artist on Artist {
  id
  spotifyID
  name
  image
  genres
}
    `;
export const SpotifyArtistFragmentDoc = gql `
    fragment SpotifyArtist on SpotifyArtist {
  name
  id
}
    `;
export const EventFragmentDoc = gql `
    fragment Event on Event {
  id
  name
  venue {
    id
    name
    city
    state
  }
  date
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
export const VenueFragmentDoc = gql `
    fragment Venue on Venue {
  id
  name
  city
  state
  long
  lat
}
    `;
export const VenueAutocompleteResultFragmentDoc = gql `
    fragment VenueAutocompleteResult on VenueAutocompleteResult {
  name
  id
  addressString
}
    `;
export const ArtistsDocument = gql `
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
export function useArtistsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(ArtistsDocument, options);
}
export function useArtistsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(ArtistsDocument, options);
}
export function useArtistsSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(ArtistsDocument, options);
}
export const ArtistAutocompleteDocument = gql `
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
export function useArtistAutocompleteQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(ArtistAutocompleteDocument, options);
}
export function useArtistAutocompleteLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(ArtistAutocompleteDocument, options);
}
export function useArtistAutocompleteSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(ArtistAutocompleteDocument, options);
}
export const CreateArtistDocument = gql `
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
export function useCreateArtistMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateArtistDocument, options);
}
export const EventsDocument = gql `
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
export function useEventsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(EventsDocument, options);
}
export function useEventsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(EventsDocument, options);
}
export function useEventsSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(EventsDocument, options);
}
export const CreateUserEventDocument = gql `
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
              }
            }
          }
        }
      }
    }
  }
}
    ${EventFragmentDoc}`;
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
export function useCreateUserEventMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateUserEventDocument, options);
}
export const MeDocument = gql `
    query Me {
  me {
    id
    firstName
    lastName
    email
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
export function useMeQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(MeDocument, options);
}
export function useMeLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(MeDocument, options);
}
export function useMeSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(MeDocument, options);
}
export const VenuesDocument = gql `
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
export function useVenuesQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(VenuesDocument, options);
}
export function useVenuesLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(VenuesDocument, options);
}
export function useVenuesSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(VenuesDocument, options);
}
export const VenueAutocompleteDocument = gql `
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
export function useVenueAutocompleteQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(VenueAutocompleteDocument, options);
}
export function useVenueAutocompleteLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(VenueAutocompleteDocument, options);
}
export function useVenueAutocompleteSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(VenueAutocompleteDocument, options);
}
export const CreateVenueDocument = gql `
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
export function useCreateVenueMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateVenueDocument, options);
}
