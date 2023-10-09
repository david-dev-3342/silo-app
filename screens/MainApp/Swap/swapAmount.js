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
} from 'react-native-reanimated'
import WalletContainer, {
  SingleWallet,
} from '../Wallet/components/walletContainer'
import {SwapContainer} from './components'
import { useNavigation } from '@react-navigation/native'
import { AppRoutes } from '../../../data/routes'

const dummyData = [
  {
    name: 'Metamask',
    accountID: 'asjdklasjdlksa',
  },
  {
    name: 'Coinbase Pro',
    accountID: 'asjdklasjdlksa',
  },
]

export default () => {
  const [sendAmount, setSendAmont] = useState('')
  const navigation = useNavigation()

  function goToConfirm(){
    navigation.navigate(AppRoutes.TransferConfirm.name)
  }
  return (
    <ScreenContainer>
      <ScrollView style={{height: '100%'}}>
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <SingleWallet
            name='Metamask'
            coinName='Ethereum'
            accountID='xxjk....ajsd'
            value='40000.34'
          />
          <Spacer multiply={2} />
          <AppText.Xs style={{color: '#999999'}}>
            Enter amount in USD
          </AppText.Xs>
          <Spacer multiply={2} />
          <AppTextInput
            inputStyle={{
              fontSize: 36,
            }}
            containerStyle={{
              padding: 15,
              paddingLeft: 15,
              paddingRight: 20,
            }}
            inputProps={{
              keyboardType: 'numeric',
            }}
            onChangeText={val => {
              ;/^\d*\.?\d*$/.test(val) && setSendAmont(val)
            }}
            value={sendAmount}
            purpose='money'
          />
          <Spacer multiply={6} />
          <Divider />
          <Spacer multiply={4} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AppText.Md
              style={{
                fontWeight: '400',
                width: '70%',
              }}>
              Recipient wallet uses a different network
            </AppText.Md>
            <TouchableOpacity
              style={{
                backgroundColor: '#F1E9FF',
                justifyContent: 'center',
                height: 30,
                width: 30,
                padding: 3,
                borderRadius: 35,
                position: 'absolute',
                right: 0,
                alignItems: 'center',
              }}>
              <Icon name='help-circle' size={23} color='#A586DD' />
            </TouchableOpacity>
          </View>
          <Spacer multiply={4} />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <AppText.Md style={{marginRight: 4}}>Silo uses</AppText.Md>
            <AppText.Md style={{marginRight: 4, color: '#AF3093'}}>
              Uniswap
            </AppText.Md>
            <AppText.Md style={{marginRight: 4}}>
              to automatically adjust.
            </AppText.Md>
            <TouchableOpacity>
              <AppText.Md style={{marginRight: 4, color: '#C1A7F0'}}>
                Learn more
              </AppText.Md>
            </TouchableOpacity>
          </View>
          <Spacer multiply={6} />
          <Divider />
          <Spacer multiply={4} />
          <CTAButton
            label='Preview'
            style={{
              height: 50,
            }}
            onPress={goToConfirm}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}
