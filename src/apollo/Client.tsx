// import {
//   ApolloClient,
//   ApolloLink,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
//   TypePolicies,
// } from '@apollo/client';
// import React, {useMemo} from 'react';
// import {createAuthLink, AuthOptions, AUTH_TYPE} from 'aws-appsync-auth-link';
// import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';

// import config from '../aws-exports';
// import {useAuthContext} from '../context/AuthContext';

// interface IClient {
//   children: React.ReactNode;
// }

// const url = config.aws_appsync_graphqlEndpoint;
// const region = config.aws_appsync_region;
// const httpLink = createHttpLink({uri: url});

// const mergeList = (existing = {items: []}, incoming = {items: []}) => {
//   return {
//     ...incoming,
//     items: [...(existing?.items || []), ...incoming.items],
//   };
// };

// const typePolicies: TypePolicies = {
//   RiturnitRide: {
//     keyFields: ['label', 'multiplier', 'image'],
//   },
//   User: {
//     keyFields: [
//       'name',
//       'email',
//       'image',
//       'mobile_number',
//       'home_address',
//       'work_address',
//     ],
//   },
//   Store: {
//     keyFields: ['name', 'image', 'description'],
//   },
//   Points: {
//     keyFields: ['amount', 'store_name', 'store_image'],
//   },
//   Trips: {
//     keyFields: ['id'],
//   },
//   Query: {
//     fields: {
//       Trips: {
//         keyArgs: ['filter'],
//         merge: mergeList,
//       },
//     },
//   },
// };

// const Client = ({children}: IClient) => {
//   const {authUser} = useAuthContext();

//   const client = useMemo(() => {
//     const jwtToken =
//       authUser?.getSignInUserSession()?.getAccessToken().getJwtToken() || '';
//     // console.log(jwtToken);

//     const auth: AuthOptions = {
//       type: config.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
//       jwtToken,
//     };

//     const link = ApolloLink.from([
//       createAuthLink({url, region, auth}),
//       createSubscriptionHandshakeLink({url, region, auth}, httpLink),
//     ]);
//     return new ApolloClient({
//       link,
//       cache: new InMemoryCache({typePolicies}),
//     });
//   }, [authUser]);

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

// export default Client;

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  TypePolicies,
} from '@apollo/client';
import React, {useMemo} from 'react';
import {createAuthLink, AuthOptions, AUTH_TYPE} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';

import config from '../aws-exports';
import {useAuthContext} from '../context/AuthContext';

interface IClient {
  children: React.ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;

const auth: AuthOptions = {
  type: config.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
  apiKey: config.aws_appsync_apiKey,
};

const httpLink = createHttpLink({uri: url});

const link = ApolloLink.from([
  createAuthLink({url, region, auth}),
  createSubscriptionHandshakeLink({url, region, auth}, httpLink),
]);

const mergeList = (existing = {items: []}, incoming = {items: []}) => {
  return {
    ...incoming,
    items: [...(existing?.items || []), ...incoming.items],
  };
};

const typePolicies: TypePolicies = {
  RiturnitRide: {
    keyFields: ['label', 'multiplier', 'image'],
  },
  User: {
    keyFields: [
      'name',
      'email',
      'image',
      'phone_number',
      'home_address',
      'work_address',
    ],
  },
  Store: {
    keyFields: ['id','name', 'image', 'description', 'expiryDays'],
  },
  Points: {
    keyFields: ['amount', 'store_name', 'store_image'],
  },
  Trips: {
    keyFields: ['id'],
  },
  Query: {
    fields: {
      Trips: {
        keyArgs: ['filter'],
        merge: mergeList,
      },
    },
  },
};

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({typePolicies}),
});

const Client = ({children}: IClient) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
