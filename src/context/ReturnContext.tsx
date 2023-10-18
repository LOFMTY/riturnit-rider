import React, {createContext, useContext, useState} from 'react';
import {Alert} from 'react-native';
import {useAuthContext} from './AuthContext';
import {useMutation, useQuery} from '@apollo/client';
import {v4 as uuidv4} from 'uuid';

import {
  GetUserQuery,
  GetUserQueryVariables,
  TripStatus,
  CreateTripCartMutation,
  CreateTripCartMutationVariables,
  ListTripCartsQuery,
  ListTripCartsQueryVariables,
  UpdateTripsMutation,
  UpdateTripsMutationVariables,
  CreateTripsMutation,
  CreateTripsMutationVariables,
  ListRiturnitPointsQuery,
  ListRiturnitPointsQueryVariables,
  GetRiturnitPointQueryVariables,
  GetRiturnitPointQuery,
  ListRiturnitReceiptPointsQuery,
  ListRiturnitReceiptPointsQueryVariables,
  ListRiturnitScanPointsQuery,
  ListRiturnitScanPointsQueryVariables,
  GetRiturnitReceiptPointQuery,
  GetRiturnitReceiptPointQueryVariables,
  GetRiturnitScanPointQuery,
  GetRiturnitScanPointQueryVariables,
} from '../API';
import {getUser} from '../queries/Profile/UserQueries';
import {
  createTripCart,
  createTrips,
  listTripCarts,
  updateTrips,
} from '../queries/Home/TripQueries';
import {
  getRiturnitPoint,
  listRiturnitPoints,
} from '../queries/Home/HomeQueries';
import {
  getRiturnitReceiptPoint,
  getRiturnitScanPoint,
  listRiturnitReceiptPoints,
  listRiturnitScanPoints,
} from '../queries/Home/StoreQueries';

type ReturnContextType = {
  updateNewReturn: Function;
  createNewReturn: Function;
  addItemsToTripCart: Function;
  cancelTrip: Function;
  storeID: string;
  setStoreID: any;
  receipt: string;
  setReceipt: any;
  storeName: string;
  setStoreName: any;
  cartProducts: any;
  loading: any;
  error: any;
  pickupLat: '';
  pickupLng: '';
  dropoffLat: '';
  dropoffLng: '';
  pickupDescription: '';
  dropoffDescription: '';
  setPickupLat: any;
  setPickupLng: any;
  setDropoffLat: any;
  setDropoffLng: any;
  setPickupLDescription: any;
  setDropoffDescription: any;
  totalMinutes: number;
  setTotalMinutes: any;
  totalKm: number;
  setTotalKm: any;
  userDetails: any;
  setSelectedTip: any;
  rating: any;
  setRating: any;
  comment: any;
  setComment: any;
  newSelectedTip: any;
  setTripsId: any;
  tripsId: any;
  userError: any;
  userLoad: boolean;
  setStoreImage: any;
  itemSubTotal: any;
  cartFee: any;
  setCartFee: any;
  RETURN_POINTS: any;
  RITURNIT_DISCOUNT: any;
  RETURN_SCAN_POINTS: any;
  RETURN_RECEIPT_POINTS: any;
  deliveryFee: any;
  sumTotal: any;
  storeImage: any;
};

const ReturnContext = createContext<ReturnContextType>({
  updateNewReturn: Function,
  createNewReturn: Function,
  addItemsToTripCart: Function,
  cancelTrip: Function,
  setStoreID: null,
  storeID: '',
  receipt: '',
  setReceipt: null,
  storeName: '',
  setStoreName: null,
  cartProducts: '',
  loading: undefined,
  error: undefined,
  pickupLat: '',
  pickupLng: '',
  dropoffLat: '',
  dropoffLng: '',
  pickupDescription: '',
  dropoffDescription: '',
  setPickupLat: '',
  setPickupLng: '',
  setDropoffLat: '',
  setDropoffLng: '',
  setPickupLDescription: '',
  setDropoffDescription: '',
  totalMinutes: 0,
  setTotalMinutes: '',
  totalKm: 0,
  setTotalKm: '',
  userDetails: '',
  setSelectedTip: '',
  rating: '',
  setRating: '',
  comment: '',
  setComment: '',
  newSelectedTip: '',
  setTripsId: '',
  tripsId: '',
  userError: '',
  userLoad: false,
  setStoreImage: '',
  itemSubTotal: '',
  cartFee: '',
  RETURN_POINTS: '',
  RITURNIT_DISCOUNT: '',
  RETURN_SCAN_POINTS: '',
  RETURN_RECEIPT_POINTS: '',
  setCartFee: '',
  deliveryFee: '',
  sumTotal: '',
  storeImage: '',
});

const BASE_RATE = 10.0;
const RITURNIT_DISCOUNT = 0;

const ReturnContextProvider = ({children}: any) => {
  const {userID} = useAuthContext();

  const [receipt, setReceipt] = useState<any>('');
  const [storeName, setStoreName] = useState<any>('');
  const [storeImage, setStoreImage] = useState<number | any>(0);
  const [storeID, setStoreID] = useState<any>('');
  const [cartFee, setCartFee] = useState<any>('');
  const [storeItems, setStoreItems] = useState<any>('');
  const [tripsId, setTripsId] = useState<any>(uuidv4());
  const [totalMinutes, setTotalMinutes] = useState<number | any>(0);
  const [totalKm, setTotalKm] = useState<number | any>(0);
  const [pickupLat, setPickupLat] = useState<any>('');
  const [pickupLng, setPickupLng] = useState<any>('');
  const [dropoffLat, setDropoffLat] = useState<any>('');
  const [dropoffLng, setDropoffLng] = useState<any>('');
  const [pickupDescription, setPickupLDescription] = useState<any>('');
  const [dropoffDescription, setDropoffDescription] = useState<any>('');
  const [rating, setRating] = useState<any>('');
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [comment, setComment] = useState<any>('');

  // LIST TRIP CARTS PRODUCTS
  const {
    loading,
    error,
    data: tripCartData,
  } = useQuery<ListTripCartsQuery, ListTripCartsQueryVariables>(listTripCarts, {
    pollInterval: 100,
  });
  const cartProducts: any =
    tripCartData?.listTripCarts?.items
      .filter(sti => sti?.storeID === storeID)
      .filter(usr => usr?.userID === userID)
      .filter(item => !item?._deleted) || [];

  // CREATE TRIP CART
  const [doCreateTripCart] = useMutation<
    CreateTripCartMutation,
    CreateTripCartMutationVariables
  >(createTripCart);

  const addItemsToTripCart = async (item: any) => {
    try {
      const response = await doCreateTripCart({
        variables: {
          input: {
            userID: userID,
            storeID: storeID,
            name: item?.name,
            image: item?.image,
            price: item?.price,
            quantity: item?.quantity,
            expiry_date: item?.expiry_date,
            description: item?.description,
            tripsID: tripsId,
          },
        },
      });
      setStoreItems([response, ...storeItems]);
      // console.log('store items added to trip cart', response);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  // GET USER DETAILS
  const {
    data,
    loading: userLoad,
    error: userError,
  } = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {id: userID},
  });
  const userDetails: any = data?.getUser;

  // CONVERT TIP TO FLOAT
  const newSelectedTip = Math.floor(selectedTip * 100);

  // LIST RITURNIT_POINTS
  const {data: dataLoad} = useQuery<
    ListRiturnitPointsQuery,
    ListRiturnitPointsQueryVariables
  >(listRiturnitPoints, {pollInterval: 30});
  const pointsID =
    dataLoad?.listRiturnitPoints?.items
      .filter(pointID => pointID?.id)
      .filter(item => !item?._deleted)
      .map((item: any) => item.id)
      .at(0) || [];

  // GET RITURNIT_POINTS
  const {data: newData} = useQuery<
    GetRiturnitPointQuery,
    GetRiturnitPointQueryVariables
  >(getRiturnitPoint, {
    variables: {
      id: pointsID,
    },
  });
  // GET RITURNIT POINT
  const RETURN_POINTS: any = newData?.getRiturnitPoint?.points;

  // LIST RITURNIT RECEIPT _POINTS
  const {data: onLoad} = useQuery<
    ListRiturnitReceiptPointsQuery,
    ListRiturnitReceiptPointsQueryVariables
  >(listRiturnitReceiptPoints, {pollInterval: 30});
  const receiptPoint =
    onLoad?.listRiturnitReceiptPoints?.items
      .filter(pointID => pointID?.id)
      .filter(item => !item?._deleted)
      .map((item: any) => item.id)
      .at(0) || [];

  // GET RITURNIT_POINTS
  const {data: freshData} = useQuery<
    GetRiturnitReceiptPointQuery,
    GetRiturnitReceiptPointQueryVariables
  >(getRiturnitReceiptPoint, {
    variables: {
      id: receiptPoint,
    },
  });

  // GET RECEIPT POINT
  const RETURN_SCAN_POINTS: any = freshData?.getRiturnitReceiptPoint?.points;

  // LIST RITURNIT SCAN PRODUCT _POINTS
  const {data: nowData} = useQuery<
    ListRiturnitScanPointsQuery,
    ListRiturnitScanPointsQueryVariables
  >(listRiturnitScanPoints, {pollInterval: 30});
  const scanPoints =
    nowData?.listRiturnitScanPoints?.items
      .filter(pointID => pointID?.id)
      .filter(item => !item?._deleted)
      .map((item: any) => item.id)
      .at(0) || [];

  // GET RITURNIT_POINTS
  const {data: softData} = useQuery<
    GetRiturnitScanPointQuery,
    GetRiturnitScanPointQueryVariables
  >(getRiturnitScanPoint, {
    variables: {
      id: scanPoints,
    },
  });

  // GET PRODUCT POINT
  const RETURN_RECEIPT_POINTS: any = softData?.getRiturnitScanPoint?.points;

  // UPDATE TRIP
  const [doCreateTrips] = useMutation<
    CreateTripsMutation,
    CreateTripsMutationVariables
  >(createTrips);

  // TOTAL CART PRODUCTS COST
  const itemSubTotal = cartProducts.reduce(function (acc: any, obj: any) {
    return acc + obj.price * obj?.quantity;
  }, 0);

  // TOTAL CART QTY
  const cartQty = cartProducts.reduce(function (acc: any, obj: any) {
    return acc + obj?.quantity;
  }, 0);

  //DELIVERY FEE
  const deliveryFee: any = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(totalKm * BASE_RATE || 0.0);

  // SUM TOTAL OF TRIP COST
  const sumTotal: any =
    totalKm * BASE_RATE + cartFee - RITURNIT_DISCOUNT || 0.0;

  // CREATE RETURN TRIP - CREATE CURRENT TRIP
  const createNewReturn = async () => {
    try {
      const res = await doCreateTrips({
        variables: {
          input: {
            id: tripsId,
            store_image: storeImage,
            store_name: storeName,
            sub_total: itemSubTotal,
            redeem_points: RETURN_POINTS * cartProducts.length,
            receipt: receipt,
            delivery_fee: cartFee,
            TotalQtyItems: cartQty,
            userID: userID,
            storeID: storeID,
          },
        },
      });
      // console.log('NEW TRIP CREATED', res);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  // UPDATE TRIP
  const [doUpdateTrips] = useMutation<
    UpdateTripsMutation,
    UpdateTripsMutationVariables
  >(updateTrips);

  // UPDATE RETURN TRIP
  const updateNewReturn = async () => {
    try {
      const res = await doUpdateTrips({
        variables: {
          input: {
            id: tripsId,
            trip_status: TripStatus.NEW,
            pickup_lat: pickupLat,
            pickup_lng: pickupLng,
            dropoff_lat: dropoffLat,
            dropoff_lng: dropoffLng,
            pickup_location_description: pickupDescription,
            dropoff_location_description: dropoffDescription,
            trip_cost: sumTotal,
            duration: totalMinutes,
            distance: totalKm,
            user_name: userDetails?.name,
            user_photo: userDetails?.image,
            mobile_number: userDetails?.phone_number,
            scan_product_point: RETURN_SCAN_POINTS,
            scan_receipt_point: RETURN_RECEIPT_POINTS,
            _version: tripsId?._version,
          },
        },
      });
      setTripsId(res);
      // console.log('----TRIP UPDATED___ ', res);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  // UPDATE RETURN TRIP - CANCELED
  const cancelTrip = async () => {
    if (!tripsId) {
      return;
    }
    try {
      const res = await doUpdateTrips({
        variables: {
          input: {
            id: tripsId?.id,
            trip_status: TripStatus.CANCELED,
            tripsDriverId: userID,
            _version: tripsId?._version,
          },
        },
      });
      // console.log('UPDATE TRIP CANCELED', res);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  return (
    <ReturnContext.Provider
      value={{
        storeImage,
        updateNewReturn,
        createNewReturn,
        pickupLat,
        pickupLng,
        dropoffLat,
        cancelTrip,
        dropoffLng,
        pickupDescription,
        dropoffDescription,
        setPickupLat,
        setPickupLng,
        setDropoffLat,
        setDropoffLng,
        setPickupLDescription,
        setDropoffDescription,
        totalMinutes,
        setTotalMinutes,
        totalKm,
        setTotalKm,
        userDetails,
        setSelectedTip,
        rating,
        setRating,
        comment,
        setComment,
        newSelectedTip,
        addItemsToTripCart,
        setStoreName,
        storeID,
        setStoreID,
        receipt,
        setReceipt,
        cartProducts,
        storeName,
        loading,
        setCartFee,
        error,
        setTripsId,
        tripsId,
        userError,
        userLoad,
        setStoreImage,
        itemSubTotal,
        cartFee,
        RETURN_POINTS,
        deliveryFee,
        RITURNIT_DISCOUNT,
        sumTotal,
        RETURN_SCAN_POINTS,
        RETURN_RECEIPT_POINTS,
      }}>
      {children}
    </ReturnContext.Provider>
  );
};

export default ReturnContextProvider;

export const useReturnContext = () => useContext(ReturnContext);
