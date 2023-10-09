import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppText} from '../../../../global/components';
import Feather from 'react-native-vector-icons/Feather';

const NetWorthBox = props => {
  const {netWorth} = props;

  return (
    <View style={styles.container}>
      <View>
        <AppText.Xs style={{color: '#999999'}}>Net Worth</AppText.Xs>
        <AppText.Xl>$ {netWorth}</AppText.Xl>
      </View>

      <Feather name="pie-chart" size={25} />
    </View>
  );
};

export default NetWorthBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
