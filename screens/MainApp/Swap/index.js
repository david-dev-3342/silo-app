import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppText,
  CTAButton,
  Divider,
  ScreenContainer,
  Spacer,
} from '../../../global/components';
import Icon from 'react-native-vector-icons/Feather';
import {trimString} from '../../../data/extensions/stringHelper';
import Animated, {
  Transition,
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideInDown,
  Transitioning,
  BounceOut,
  SlideOutLeft,
  SlideInLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import WalletContainer from '../Wallet/components/walletContainer';
import {SwapContainer} from './components';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from '../../../data/routes';

const dummyData = [
  {
    name: 'Metamask',
    accountID: 'asjdklasjdlksa',
  },
  {
    name: 'Coinbase Pro',
    accountID: 'asjdklasjdlksa',
  },
];

export default () => {
  const [swapData, setSwapData] = useState([]);
  const navigation = useNavigation();
  function goToAmount() {
    navigation.navigate(AppRoutes.TransferAmount.name);
  }
  return (
    <ScreenContainer>
      <View>
        {swapData && swapData?.length > 0 && (
          <SwapContainer
            data={swapData}
            onRemove={() => setSwapData([])}
            onSwitch={() =>
              setSwapData(prev => {
                const spread = [...prev];
                return spread.reverse();
              })
            }
          />
        )}
        <ScrollView style={{height: '100%'}}>
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            {swapData && swapData?.length > 0 && (
              <>
                <Spacer multiply={2} />
                <Divider />
                <Spacer multiply={2} />
              </>
            )}
            <AppText.Sm>Select A Wallet</AppText.Sm>
            <Spacer multiply={2} />
            <WalletContainer
              showAddButton={false}
              onWalletPress={data => {
                if (
                  swapData.length < 2 &&
                  !swapData.find(x => x.name === data.name)
                )
                  setSwapData(prev => [...prev, data]);
              }}
            />
            <Spacer multiply={4} />
            <TouchableOpacity>
              <AppText.Md style={{color: '#9F87D8', textAlign: 'center'}}>
                Import New
              </AppText.Md>
            </TouchableOpacity>
            <Spacer multiply={4} />
            <Divider />
            <Spacer multiply={4} />
            {swapData.length > 1 && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <CTAButton
                  label="Continue To Transfer"
                  style={{
                    height: 50,
                  }}
                  onPress={goToAmount}
                />
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
