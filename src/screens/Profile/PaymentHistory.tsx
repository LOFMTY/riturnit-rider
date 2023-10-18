import {View, FlatList} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {PaymentTab, Header} from '../../components';
import {SIZES, dummyData, COLORS} from '../../constants';

const PaymentHistory = ({appTheme}: any) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Header
        title="Payment History"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      <FlatList
        data={dummyData.paymentHistory}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={<View style={{marginTop: SIZES.base}} />}
        renderItem={({item, index}) => {
          return (
            <PaymentTab
            key={index}
              title={item.title}
              amount={item.amount}
              body={item.body}
              colorType={item.type === 'credit' ? COLORS.caribbeanGreen : COLORS.red}
              time={item.time}
            />
          );
        }}
      />
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(PaymentHistory);
