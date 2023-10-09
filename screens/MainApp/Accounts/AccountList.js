import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AccountCard} from './components';
import {Mockdata} from './staticData';

const renderItem = ({item}) => {
  console.log(item);
  return (
    <AccountCard
      amount={item?.balance}
      percent={0}
      name={item.userName}
      account={item.bankName}
    />
  );
};

const AccountList = props => {
  const {bankList} = props;
  return (
    <View style={{marginTop: 0}}>
      <Text style={styles.headerTxt}>Accounts</Text>
      {bankList && <FlatList data={bankList} renderItem={renderItem} />}
    </View>
  );
};

export default AccountList;

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 15,
  },
});
