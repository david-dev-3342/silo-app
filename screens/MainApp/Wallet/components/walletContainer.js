import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText, Spacer} from '../../../../global/components';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const dummyAssets = [
  {
    name: 'Metamask',
    accountID: 'x89123...asdjkl',
    value: 40000.21,
    coinName: 'Solana',
  },
  {
    name: 'Stocks',
    accountID: 'Robinhood',
    value: 28090.51,
    coinName: 'Ethereum',
  },
  {
    name: 'BTC',
    accountID: 'Bitcoin',
    value: 1350.21,
    coinName: 'Cross-Chain',
  },
  {
    name: 'ALGO Wallet',
    accountID: 'Flat Currency',
    value: 40000.21,
    coinName: 'ALGO Coin',
  },
];

/**
 *
 * @param {Object} props
 * @param {Object} props.iconSource The source of the icon
 * @param {string} props.name Name of asset
 * @param {string} props.accountID accountID of asset
 * @param {number} props.value accountID of asset
 * @param {''} props.coinName accountID of asset
 * @param {() => {}} props.onPress
 * @param {import('react-native').ViewStyle} props.style
 * @param {import('react-native').TextStyle} props.textStyle
 * @returns
 */
export const SingleWallet = ({
  iconSource,
  name,
  accountID,
  value,
  coinName,
  onPress,
  style,
  textStyle,
}) => {
  const colors = ['#4B3AB4', '#3FC3CB', '#BF7C3F'];

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        ...style,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            backgroundColor: '#e4e4e4',
          }}
          source={iconSource || ''}
        />
        <View style={{paddingLeft: 10, justifyContent: 'center'}}>
          <AppText.Md style={textStyle}>{name}</AppText.Md>
          <AppText.Xs style={{color: '#999999', ...textStyle}}>
            {accountID}
          </AppText.Xs>
        </View>
      </View>
      {value && (
        <View>
          <AppText.Md style={textStyle}>
            $ {Number(value).toLocaleString('en-US')}
          </AppText.Md>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <AppText.Xs
              style={{
                textAlign: 'right',
                color: colors[Math.floor(Math.random() * colors.length)],
                ...textStyle,
              }}>
              {coinName}
            </AppText.Xs>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const AddAsset_Button = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '100%',
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    }}>
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          borderColor: '#A586DD',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderStyle: 'dashed',
        }}>
        <Icon name="plus" color={'#A586DD'} size={24} />
      </View>
      <View style={{paddingLeft: 10, justifyContent: 'center'}}>
        <AppText.Md style={{color: '#4f2994'}}>Add Wallet</AppText.Md>
        <AppText.Xs style={{color: '#999999'}}>
          Tap to connect new wallet
        </AppText.Xs>
      </View>
    </View>
  </TouchableOpacity>
);

const ShowAll_Button = ({onPress, isExpanded}) => (
  <TouchableOpacity style={styles.ShowButton} onPress={onPress}>
    <LinearGradient
      colors={['#F7F4FB00', '#F7F4FB']}
      start={{x: 0, y: 0}}
      end={{
        x: 0,
        y: 1,
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingRight: 25,
        paddingLeft: 25,
        borderRadius: 10,
      }}>
      <Icon name={`arrow-${isExpanded ? 'up' : 'down'}`} size={18} />
      <AppText.Md style={{textAlign: 'center', paddingLeft: 5}}>
        {isExpanded ? 'Hide' : 'Show All'}
      </AppText.Md>
    </LinearGradient>
  </TouchableOpacity>
);

export default ({
  showAddButton = true,
  showExpandButton = true,
  onWalletPress,
  expanded,
}) => {
  const [isExpanded, setExpanded] = useState(expanded);
  const item_height = 75;

  const animatedStyles = {
    height: useSharedValue(item_height * (dummyAssets.length - 1)),
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: animatedStyles.height.value,
    };
  });

  function expandOrCollapse() {
    if (!isExpanded) {
      animatedStyles.height.value = withSpring(
        dummyAssets.length * item_height,
        500,
      );
    } else {
      animatedStyles.height.value = withSpring(
        item_height * (dummyAssets.length / 2),
        500,
      );
    }
    setExpanded(prev => !prev);
  }

  return (
    <Animated.View style={[containerStyle, {overflow: 'hidden'}]}>
      {showAddButton && <AddAsset_Button />}
      {dummyAssets.map(x => (
        <SingleWallet key={x.name} {...x} onPress={() => onWalletPress(x)} />
      ))}
      {showExpandButton && (
        <ShowAll_Button onPress={expandOrCollapse} isExpanded={isExpanded} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ShowButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
