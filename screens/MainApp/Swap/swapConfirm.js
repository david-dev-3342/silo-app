import React, {useEffect, useRef, useState} from 'react'
import {
  Image,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
  AppText,
  AppTextInput,
  CTAButton,
  Divider,
  ScreenContainer,
  Spacer,
} from '../../../global/components'
import Icon from 'react-native-vector-icons/Feather'
import {trimString} from '../../../data/extensions/stringHelper'
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
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import WalletContainer, {
  SingleWallet,
} from '../Wallet/components/walletContainer'
import {SwapContainer, SwapSuccess} from './components'
import {useNavigation} from '@react-navigation/native'
import {AppRoutes} from '../../../data/routes'

export default () => {
  const [isLoading, setLoading] = useState(false)
  const [swapSuccess, setSwapSuccess] = useState(false)
  const viewOpacity = useSharedValue(1)
  const navigation = useNavigation()

  function performSwap () {
    setLoading(true)
    setTimeout(() => triggerFadeOut(), 2000)
    setTimeout(() => setSwapSuccess(true), 2500)

    setTimeout(() => navigateBack(), 6000)
  }

  function navigateBack () {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: AppRoutes.Transfer.name
        }
      ]
    })
    setTimeout(() => {
      navigation.navigate(AppRoutes.Wallet.name)
    }, 1000)
  }

  useEffect(() => {
    console.log('Swap is:', swapSuccess)
  }, [swapSuccess])

  function triggerFadeOut () {
    viewOpacity.value = withTiming(0, 500)
  }

  const animatedViewStyle = useAnimatedStyle(() => ({
    opacity: viewOpacity.value,
  }))

  return (
    <ScreenContainer>
      {swapSuccess && <SwapSuccess />}
      <Animated.View style={[animatedViewStyle, {height: '100%'}]}>
        <AppText.Xl style={{textAlign: 'center'}}>
          $ {(1233.99).toLocaleString('en-US')}
        </AppText.Xl>
        <AppText.Sm style={{textAlign: 'center', paddingTop: 5}}>
          0.13224132 ETH
        </AppText.Sm>
        <Spacer multiply={4} />
        <Divider />
        <Spacer multiply={4} />
        <View style={{paddingLeft: 10, paddingRight: 10}}>
          <SingleWallet
            name='Metamask'
            accountID='hxjja.....asdjhj'
            value={'33121.23'}
            coinName='Ethereum'
            style={{
              marginBottom: 0,
            }}
          />
          <Spacer />
          <Icon
            name='arrow-down'
            size={20}
            style={{
              marginLeft: 10,
            }}
            color='#A586DD'
          />
          <Spacer />
          <SingleWallet
            name='Coinbase Pro'
            accountID='hxjja.....asdjhj'
            value={'11829.23'}
            coinName='Coin Chain'
          />
          <Spacer />
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <AppText.Sm>Network</AppText.Sm>
            <AppText.Sm>Cross-Chain</AppText.Sm>
          </View>
          <Spacer multiply={4} />
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <AppText.Sm>Network Fee</AppText.Sm>
            <View>
              <AppText.Sm style={{textAlign: 'right'}}>$1.42</AppText.Sm>
              <AppText.Sm style={{color: '#999'}}>0.0004 ETH</AppText.Sm>
            </View>
          </View>
          <Spacer multiply={4} />
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <AppText.Sm>Transaction Time</AppText.Sm>
            <AppText.Sm>Less than 1 Minute</AppText.Sm>
          </View>
          <Spacer multiply={4} />
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <AppText.Sm>Total</AppText.Sm>
            <AppText.Sm>$ {(1234.99).toLocaleString('en-US')}</AppText.Sm>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            shadowColor: '#8c8c8c',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            position: 'absolute',
            bottom: 100,
          }}>
          <CTAButton label='Swap' onPress={performSwap} isLoading={isLoading} />
        </View>
      </Animated.View>
    </ScreenContainer>
  )
}
