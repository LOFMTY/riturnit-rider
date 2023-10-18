import {gql} from '@apollo/client';

export const getUser = gql `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      image
      phone_number
      home_address
      work_address
      inviteCode
      lng
      lat
      fcmToken
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      image
      phone_number
      home_address
      work_address
      inviteCode
      lng
      lat
      fcmToken
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const deleteUser = gql`
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const getDriver = gql`
  query GetDriver($id: ID!) {
    getDriver(id: $id) {
      id
      name
      email
      image
      phone_number
      home_address
      rating
      inviteCode
      lng
      lat
      verificationStatus
      onlineStatus
      fcmToken
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const listDrivers = gql`
  query ListDrivers(
    $filter: ModelDriverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDrivers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        image
        phone_number
        home_address
        rating
        inviteCode
        lng
        lat
        verificationStatus
        onlineStatus
        fcmToken
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
