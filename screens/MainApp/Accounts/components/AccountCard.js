import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const AccountCard = props => {
  const {amount, percent, account, name} = props;

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../../assets/images/AccountsImages/pic1.png')}
          style={styles.logo_img}
        />
      </View>

      <View style={styles.second_section}>
        <Text style={styles.txt1}>{account}</Text>
        <Text style={[styles.txt2, {color: '#999999'}]}>{name}</Text>
      </View>

      <View style={styles.third_section}>
        <Text style={styles.txt1}>$ {amount}</Text>
        <Text style={[styles.txt2, {color: '#3FBFA0'}]}>{percent}</Text>
      </View>
    </View>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo_img: {
    height: 30,
    width: 30,
  },
  second_section: {
    marginLeft: 10,
    width: '57%',
  },
  third_section: {
    alignItems: 'flex-end',
    width: '30%',
  },
  txt1: {
    fontSize: 16,
    fontWeight: '500',
  },
  txt2: {
    fontSize: 10,
    fontWeight: '700',
  },
});
