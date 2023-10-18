import {gql} from '@apollo/client';

export const createRating = gql`
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
      id
      rating
      comment
      driver_image
      driver_name
      customer_name
      customer_image
      tripsID
      driverID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const getRating = gql`
  query GetRating($id: ID!) {
    getRating(id: $id) {
      id
      rating
      comment
      driver_image
      driver_name
      customer_name
      customer_image
      userID
      tripsID
      driverID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
