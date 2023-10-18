import {View, TextInput} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

import {FONTS, SIZES, COLORS} from '../../constants';

const CommentForm = ({appTheme, comment, setComment}: any) => {
  return (
    <View
      style={{
        margin: SIZES.padding,
      }}>
      <TextInput
        multiline={true}
        numberOfLines={3}
        maxLength={200}
        onChangeText={setComment}
        value={comment}
        returnKeyType={'done'}
        placeholder={'Please leave a comment'}
        placeholderTextColor={COLORS.gray}
        selectTextOnFocus={true}
        style={{
          borderWidth: 0.3,
          paddingTop: SIZES.radius,
          paddingLeft: 10,
          height: 100,
          ...FONTS.body2,
          color: appTheme.textColor,
          borderRadius: SIZES.base,
          borderColor: COLORS.lightGray4,
          backgroundColor: appTheme.tabBackgroundColor,
        }}
      />
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(CommentForm);
