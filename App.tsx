// App.js
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Alert, Linking, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Amplify, Auth} from 'aws-amplify';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjs from 'dayjs';
dayjs.extend(relativeTime);

import reducers from './src/redux/rootReducer';
import './src/utilities/ignoreWarnings';
import config from './src/aws-exports';
import AuthContextProvider from './src/context/AuthContext';
import ReturnContextProvider from './src/context/ReturnContext';
import AppNav from './src/components/navigation/AppNav';
import Client from './src/apollo/Client';
import UserLocationContextProvider from './src/context/UserLocationContext';
// import { withAuthenticator } from '@aws-amplify/ui-react-native'
import { API } from '@aws-amplify/api'
import { StripeProvider } from '@stripe/stripe-react-native'

const store = createStore(reducers, applyMiddleware(thunk));

const stripeKey = 'pk_test_51MdxGXHzF6NKvTnp9C5pMkvEslDVtNpjfNcmA64so2uSdx9FgYLomEjWF3JuwDJ2BpZZAgyKDoPr2qw6OFzhwaX600YRCmLfGL'

// URL OPENER FOR GOOGLE & FACEBOOK AUTH
const urlOpener = async (url: string, redirectUrl: string) => {
  await InAppBrowser.isAvailable();
  const response = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (response.type === 'success') {
    Linking.openURL(response.url);
  }
};

const updateConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
};
Amplify.configure(updateConfig);
Auth.configure(updateConfig);

API.configure(updateConfig)

const App = () => {
  const [onBoarded, setOnBoarded] = useState(null);

  // HIDE SPLASH SCREEN && LOCK ORIENTATION
  useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      RNBootSplash.hide();
      Orientation.lockToPortrait();
    }, 1500);
    return () => {
      unmounted = true;
    };
  }, []);

  // ASYNC STORAGE FOR GET ITEM ONBOARDING
  const getStorage = async () => {
    try {
      const onBoarded = await AsyncStorage.getItem('ONBOARDED');
      setOnBoarded(onBoarded ? JSON.parse(onBoarded) : null);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    let unmounted = false;
    getStorage();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Client>
          <StripeProvider
            publishableKey={stripeKey}
            merchantIdentifier={'merchant.com.riturnit.appname'}
          >
            <UserLocationContextProvider>
              <ReturnContextProvider>
                <SafeAreaProvider>
                  <BottomSheetModalProvider>
                    <AppNav onBoarded={onBoarded} />
                  </BottomSheetModalProvider>
                </SafeAreaProvider>
              </ReturnContextProvider>
            </UserLocationContextProvider>
          </StripeProvider>
        </Client>
      </AuthContextProvider>
    </Provider>
  );
};

// export default withAuthenticator(App);
export default App;
