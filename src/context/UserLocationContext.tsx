import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from 'react';
import {hasLocationPermission} from '../utilities/service';
import Geolocation from 'react-native-geolocation-service';
import {ALERT_TYPE, Toast, Root} from 'react-native-alert-notification';
import {AppState, Dimensions} from 'react-native';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

type UserLocationContextType = {
  currentLocation: any;
  setCurrentLocation: any;
  userCurrentLocation: Function;
  userMobileLocation: Function;
};

const UserLocationContext = createContext<UserLocationContextType>({
  currentLocation: '',
  setCurrentLocation: initialState,
  userCurrentLocation: Function,
  userMobileLocation: Function,
});

const UserLocationContextProvider = ({children}: {children: ReactNode}) => {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const appState = useRef<any>(AppState.currentState);

  const [currentLocation, setCurrentLocation] = useState<any>(initialState);
  const [appStateVisible, setAppStateVisible] = useState<any>(appState.current);

  const userCurrentLocation = async () => {
    let hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          ...currentLocation,
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      error => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Location Error',
          textBody: `Can\'t find your current location, ${error}`,
          autoClose: 1500,
        });
        setCurrentLocation(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const userMobileLocation = async () => {
    let hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          ...currentLocation,
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {
        setCurrentLocation(error);
      },
    );

    const foregroundSub = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          ...currentLocation,
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {
        setCurrentLocation(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        distanceFilter: 100,
        enableHighAccuracy: true,
        interval: 10000,
        fastestInterval: 5000,
      },
    );
    return foregroundSub;
  };

  useEffect(() => {
    let unmounted = false;
    userCurrentLocation();
    userMobileLocation();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange => {
        if (
          appState.current.match(/inactive|background/) &&
          handleAppStateChange === 'active'
        ) {
          // console.log('App has come to the foreground!');
          userCurrentLocation();
        }

        appState.current = handleAppStateChange;
        setAppStateVisible(handleAppStateChange);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [appStateVisible]);

  return (
    <Root>
      <UserLocationContext.Provider
        value={{
          currentLocation,
          setCurrentLocation,
          userMobileLocation,
          userCurrentLocation,
        }}>
        {children}
      </UserLocationContext.Provider>
    </Root>
  );
};

export default UserLocationContextProvider;

export const useUserLocationContext = () => useContext(UserLocationContext);
