import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppText} from '../../../../global/components';

export default ({balance}) => {
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <AppText.Xs style={{color: '#999999'}}>Current Balance</AppText.Xs>
          <AppText.Xl>$ {balance || '100,452.25'}</AppText.Xl>
        </View>
        <View>
          <View
            style={{
              height: 55,
              width: 55,
              borderRadius: 55,
              backgroundColor: '#fff',
              //   borderColor: '#9c78de',
              //   borderWidth: 1,
              shadowColor: '#9c78de',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.28,
              shadowRadius: 8,
              elevation: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText.Xl style={{color: '#9c78de'}}>A</AppText.Xl>
          </View>
        </View>
      </View>
    </View>
  );
};
