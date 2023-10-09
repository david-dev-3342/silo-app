import React, {useEffect, useState} from 'react'
import {AppText, ScreenContainer, Spacer} from '../../global/components'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation, useRoute} from '@react-navigation/native'
import {AppRoutes} from '../../data/routes'
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOut,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated'

export default () => {
  const [isBusy, setIsButy] = useState(false)
  const [otpCode, setOTPCode] = useState('')
  const navigation = useNavigation()
  const route = useRoute()

  const errorAnimValues = {
    translateX: useSharedValue(0),
    borderColor: useSharedValue('#A6A6A6'),
  }

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: errorAnimValues.translateX.value}],
      borderColor: errorAnimValues.borderColor.value,
    }
  })

  const {verificationCallback} = route.params

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (e.data.action.type != 'GO_BACK') {
        navigation.dispatch(e.data.action)
      } else {
        e.preventDefault()
      }
    })
  }, [])

  async function validateCode (code) {
    try {
      setIsButy(true)
      await verificationCallback.confirm(code)
      navigation.reset({
        index: 0,
        routes: [AppRoutes.default],
      })
    } catch (ex) {
      setOTPCode('')
      setIsButy(false)
      triggerErrorShake()
    }
  }

  function triggerErrorShake () {
    errorAnimValues.borderColor.value = withSequence(
      withTiming('#ff2b2b', {duration: 700}),
      withTiming('#A6A6A6', {duration: 100}),
    )

    errorAnimValues.translateX.value = withSequence(
      withTiming(10, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(10, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(10, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(0, {duration: 100}),
    )
  }

  return (
    <ScreenContainer isUIBusy={isBusy}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppText.Sm>
          Enter the code sent to {route.params?.data}{' '}
          {route.params?.authMethod === 'phone' && ' via SMS'}
        </AppText.Sm>
        <Spacer multiply={4} />
        <Animated.View
          style={[
            formAnimatedStyle,
            {
              maxHeight: 70,
              padding: 15,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 10,
              borderWidth: 1,
            },
          ]}>
          <OTPInputView
            pinCount={6}
            code={otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => setOTPCode(code)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={validateCode}
          />
        </Animated.View>
        <Spacer multiply={4} />
        <TouchableOpacity
          style={{flexDirection: 'row', alignContent: 'center'}}>
          <AppText.Sm>Didn't get the code?</AppText.Sm>
          <Spacer orientation='horizontal' />
          <AppText.Sm
            style={{
              fontWeight: '700',
              textDecorationLine: 'underline',
            }}>
            SEND AGAIN
          </AppText.Sm>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#000',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#000',
  },
})
