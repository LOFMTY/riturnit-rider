import { gql } from '@apollo/client';

export const createTrips = gql`
  mutation CreateTrips(
    $input: CreateTripsInput!
    $condition: ModelTripsConditionInput
  ) {
    createTrips(input: $input, condition: $condition) {
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
      storeID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      tripsDriverId
    }
  }
`;


export const createPayment = gql`
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
      id
      customer_name
      email
      address
      phone_number
      total_amount
      payment_method
      payment_status
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

export const createTripCart = gql`
  mutation CreateTripCart(
    $input: CreateTripCartInput!
    $condition: ModelTripCartConditionInput
  ) {
    createTripCart(input: $input, condition: $condition) {
      id
      expiry_date
      name
      image
      quantity
      price
      description
      storeID
      userID
      tripsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const listTripCarts = gql`
  query ListTripCarts(
    $filter: ModelTripCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTripCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        expiry_date
        name
        image
        quantity
        price
        description
        storeID
        userID
        tripsID
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

export const deleteTripCart = gql`
  mutation DeleteTripCart(
    $input: DeleteTripCartInput!
    $condition: ModelTripCartConditionInput
  ) {
    deleteTripCart(input: $input, condition: $condition) {
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

export const createReceipt = gql`
  mutation CreateReceipt(
    $input: CreateReceiptInput!
    $condition: ModelReceiptConditionInput
  ) {
    createReceipt(input: $input, condition: $condition) {
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
  }
`;

export const listReceipts = gql`
  query ListReceipts(
    $filter: ModelReceiptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReceipts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;

export const listTrips = gql`
  query ListTrips(
    $filter: ModelTripsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        scan_receipt_point
      scan_product_point
        sub_total
        redeem_points
        service_fee
        delivery_fee
        delivery_discount
        sum_total
        storeID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        tripsDriverId
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

export const getTrips = gql`
  query GetTrips($id: ID!) {
    getTrips(id: $id) {
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
      storeID
      userID
      TripCarts {
        items {
          id
          expiry_date
          name
          image
          quantity
          price
          description
          TotalQtyItems
          receipt
          storeID
          userID
          tripsID
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
      tripsDriverId
      __typename
    }
  }
`;

export const updateTrips = gql`
  mutation UpdateTrips(
    $input: UpdateTripsInput!
    $condition: ModelTripsConditionInput
  ) {
    updateTrips(input: $input, condition: $condition) {
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
      storeID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      tripsDriverId
      __typename
    }
  }
`;

export const createPoints = gql`
  mutation CreatePoints(
    $input: CreatePointsInput!
    $condition: ModelPointsConditionInput
  ) {
    createPoints(input: $input, condition: $condition) {
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
  }
`;
