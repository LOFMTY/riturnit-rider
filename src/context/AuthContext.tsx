import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {HubCallback} from '@aws-amplify/core';
import {CognitoUser} from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = CognitoUser | null | undefined;

type AuthContextType = {
  authUser: UserType;
  userID: string;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  authUser: undefined,
  userID: '',
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = async () => {
    try {
      setIsLoading(true);
      const userToken = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setAuthUser(userToken);
    } catch (error) {
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let unmounted = false;
    isAuthenticated();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setAuthUser(null);
      }
      if (event === 'signIn') {
        isAuthenticated();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  const setStripeKey = async () => {
    const id = await AsyncStorage.getItem('stripe_id')
    if (!id) {
      const res = await fetch('https://wrm646oi52lgkg4sncf3a5vte40daxhl.lambda-url.us-east-1.on.aws/customers', {
          method: 'POST',
          headers: {
            "x-api-key": "4L1FPSYjVH1ijKSNEZ9S31RraORx5tdH9a60tE5z"
          },
          body: JSON.stringify({
            "email": authUser.attributes.email,
            "name": authUser.attributes.name,
            "phone": authUser.attributes.phone_number
          })
        })
        const data = await res.json()
        await AsyncStorage.setItem('stripe_id', data.data)
      }
  }

  if (authUser) {
    setStripeKey()
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        authUser,
        userID: authUser?.attributes?.sub || '',
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);