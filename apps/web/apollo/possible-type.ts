export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    BaseError: [
      'ErrorEventExists',
      'ErrorForbidden',
      'ErrorInvalidRequest',
      'ErrorNotFound',
      'ErrorUniqueConstraint',
    ],
    MutationCreateArtistResult: [
      'ErrorInvalidRequest',
      'ErrorNotFound',
      'ErrorUniqueConstraint',
      'MutationCreateArtistSuccess',
    ],
    MutationCreateEventResult: [
      'ErrorEventExists',
      'ErrorInvalidRequest',
      'ErrorNotFound',
      'ErrorUniqueConstraint',
      'MutationCreateEventSuccess',
    ],
    MutationCreateVenueResult: [
      'ErrorForbidden',
      'ErrorInvalidRequest',
      'ErrorNotFound',
      'MutationCreateVenueSuccess',
    ],
  },
};
export default result;
