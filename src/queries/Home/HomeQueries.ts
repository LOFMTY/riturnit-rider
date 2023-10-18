import { gql } from '@apollo/client';

export const listRiturnitPoints = gql`
  query ListRiturnitPoints(
    $filter: ModelRiturnitPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRiturnitPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

export const getRiturnitPoint = gql`
  query GetRiturnitPoint($id: ID!) {
    getRiturnitPoint(id: $id) {
      id
      points
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const listPoints = gql`
  query ListPoints(
    $filter: ModelPointsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amount
        store_name
        store_image
        userID
        storeID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;