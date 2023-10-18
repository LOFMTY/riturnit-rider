import { gql } from '@apollo/client';

export const listStores = gql`
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        description
        expiryDays
        Points {
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
        Trips {
          items {
            id
            trip_status
            pickup_lat
            pickup_lng
            dropoff_lat
            dropoff_lng
            pickup_location_description
            dropoff_location_description
            trip_cost
            TotalQtyItems
            receipt
            duration
            distance
            store_name
            store_image
            user_name
            user_photo
            mobile_number
            driver_name
            driver_photo
            driver_rating
            driver_mobile_number
            driver_car_model
            driver_car_make
            driver_car_color
            driver_car_plate_number
            sub_total
            redeem_points
            service_fee
            delivery_fee
            delivery_discount
            sum_total
            scan_receipt_point
            scan_product_point
            userID
            storeID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            tripsDriverId
            __typename
          }
          nextToken
          startedAt
          __typename
        }
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

export const getStore = gql`
  query GetStore($id: ID!) {
    getStore(id: $id) {
      id
      name
      image
      description
      expiryDays
      Products {
        items {
          id
          name
          image
          quantity
          price
          description
          expiry_date
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
      Receipts {
        items {
          id
          image
          store_name
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

export const createProduct = gql`
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      name
      image
      quantity
      price
      description
      expiry_date
      userID
      storeID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const deleteProduct = gql`
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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

export const createRiturnitScanPoint = gql`
  mutation CreateRiturnitScanPoint(
    $input: CreateRiturnitScanPointInput!
    $condition: ModelRiturnitScanPointConditionInput
  ) {
    createRiturnitScanPoint(input: $input, condition: $condition) {
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


export const getRiturnitScanPoint = gql`
  query GetRiturnitScanPoint($id: ID!) {
    getRiturnitScanPoint(id: $id) {
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

export const listRiturnitScanPoints = gql`
  query ListRiturnitScanPoints(
    $filter: ModelRiturnitScanPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRiturnitScanPoints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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

export const createRiturnitReceiptPoint = gql`
  mutation CreateRiturnitReceiptPoint(
    $input: CreateRiturnitReceiptPointInput!
    $condition: ModelRiturnitReceiptPointConditionInput
  ) {
    createRiturnitReceiptPoint(input: $input, condition: $condition) {
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

export const listRiturnitReceiptPoints = gql`
  query ListRiturnitReceiptPoints(
    $filter: ModelRiturnitReceiptPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRiturnitReceiptPoints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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


export const getRiturnitReceiptPoint = gql`
  query GetRiturnitReceiptPoint($id: ID!) {
    getRiturnitReceiptPoint(id: $id) {
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
