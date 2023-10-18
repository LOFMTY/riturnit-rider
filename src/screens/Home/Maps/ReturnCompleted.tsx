import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {v4 as uuidv4} from 'uuid';
import {useMutation, useQuery} from '@apollo/client';

import {COLORS, SIZES, FONTS} from '../../../constants';
import {
  Header,
  TextButton,
  ReturnComplete,
  CommentForm,
} from '../../../components';
import {
  HomeStackNavigatorParamList,
  ReturnCompletedRouteProp,
} from '../../../type/navigation';
import {
  CreateRatingMutation,
  CreateRatingMutationVariables,
  CreateReceiptMutation,
  CreateReceiptMutationVariables,
  GetRiturnitPointQuery,
  GetRiturnitPointQueryVariables,
  ListRiturnitPointsQuery,
  ListRiturnitPointsQueryVariables,
  CreatePointsMutation,
  CreatePointsMutationVariables,
} from '../../../API';
import {createRating} from '../../../queries/Home/RatingQueries';
import {useReturnContext} from '../../../context/ReturnContext';
import {createReceipt, createPoints} from '../../../queries/Home/TripQueries';
import {
  getRiturnitPoint,
  listRiturnitPoints,
} from '../../../queries/Home/HomeQueries';
import {useAuthContext} from '../../../context/AuthContext';

const ReturnCompleted = ({appTheme}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<ReturnCompletedRouteProp>();

  const {userID} = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const dateobj = dayjs().format('MMMM DD, YYYY - hh:mm A');

  const {rating, setComment, comment, setTripsId, setRating} =
    useReturnContext();

  const returnCompleteInfo = route?.params.trip;
  // console.log('returnCompleteInfo', returnCompleteInfo);

  function ratingCompleted(rating: number) {
    setRating(rating);
  }

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

  // CREATE USER POINTS
  const [doCreatePoints] = useMutation<
    CreatePointsMutation,
    CreatePointsMutationVariables
  >(createPoints);

  const createUserPoints = async () => {
    try {
      const res = await doCreatePoints({
        variables: {
          input: {
            amount: RETURN_POINTS,
            store_name: returnCompleteInfo?.store_name,
            store_image: returnCompleteInfo?.store_image,
            storeID: returnCompleteInfo?.storeID,
            userID: userID,
          },
        },
      });
      // console.log('CREATED USER POINTS', res);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  // CREATE RECEIPTS
  const [doCreateReceipt] = useMutation<
    CreateReceiptMutation,
    CreateReceiptMutationVariables
  >(createReceipt);

  const createStoreReceipt = async () => {
    try {
      const res = await doCreateReceipt({
        variables: {
          input: {
            image: returnCompleteInfo?.receipt,
            store_name: returnCompleteInfo?.store_name,
            userID: userID,
            storeID: returnCompleteInfo?.storeID,
          },
        },
      });
      // console.log('receipt created', res);
    } catch (error) {
      Alert.alert('Failed to create receipt', (error as Error).message);
    }
  };

  // CREATE DRIVER RATINGS
  const [doCreateRating] = useMutation<
    CreateRatingMutation,
    CreateRatingMutationVariables
  >(createRating);

  const storeRatings = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await doCreateRating({
        variables: {
          input: {
            rating: rating,
            comment: comment,
            customer_name: returnCompleteInfo?.user_name,
            customer_image: returnCompleteInfo?.user_photo,
            driver_image: returnCompleteInfo?.driver_image,
            driver_name: returnCompleteInfo?.driver_name,
            driverID: returnCompleteInfo?.tripsDriverId,
            tripsID: returnCompleteInfo.id,
            userID: userID,
          },
        },
      });
      // console.log('Rating completed', response);
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // USER RATING
  const rateReturn = async () => {
    if (rating.length - 1) {
      Alert.alert('Please rate your experience');
      return;
    }
    await storeRatings();
    await resetNav();
  };

  // RESET NAV STATE
  const resetNav = async () => {
    setTripsId(uuidv4());
    await createStoreReceipt();
    await createUserPoints();
    setComment('');
    setRating(0);

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Header
        type={true}
        nav={true}
        title="Return completed"
        onPress={resetNav}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      <Spinner
        visible={isLoading}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraHeight={300}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <ReturnComplete
          rating={rating}
          dateObj={dateobj}
          ratingCompleted={ratingCompleted}
          driverImage={returnCompleteInfo?.driver_photo}
          driverName={returnCompleteInfo?.driver_name}
        />

        {/* add return comment */}
        <CommentForm setComment={setComment} comment={comment} />

        {/* go to Home screen */}
        <TextButton
          disabled={!comment || !rating}
          label={isLoading ? 'Rating...' : 'Rate driver'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            height: 45,
            width: 300,
            marginBottom: SIZES.padding,
            backgroundColor:
              !comment || !rating ? COLORS.gray : COLORS.gradient2,
          }}
          onPress={rateReturn}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ReturnCompleted);
