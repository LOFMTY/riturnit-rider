import {gql} from '@apollo/client';

export const listSystemNotifications = gql`
  query ListSystemNotifications(
    $filter: ModelSystemNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSystemNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        message
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
