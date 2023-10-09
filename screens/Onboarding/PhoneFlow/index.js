import React, {useEffect, useRef, useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import RNPIckerSelect from 'react-native-picker-select'
import PhoneCodes from '../../../assets/phoneCodes.json'
import Icon from 'react-native-vector-icons/Feather'
import {AppText, CTAButton, Picker, Spacer} from '../../../global/components'
import {OrDivider} from '../components'
import {useNavigation} from '@react-navigation/native'
import {AuthRoutes} from '../../../data/routes'
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
import {useAuthHook} from '../../../data/database/user/auth'
import {Formik} from 'formik'
import {
  StringHelper,
  validateEmail,
} from '../../../data/extensions/stringHelper'

export default () => {
  const navigation = useNavigation()
  const {signInWithPhone, isBusy} = useAuthHook()
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

  const getPhoneCodes = PhoneCodes.map(x => ({
    label: `${x.name} (${x.dial_code})`,
    value: `${x.name} (${x.dial_code})`,
  }))

  function gotoVerify (phoneNumber, callback) {
    navigation.navigate(AuthRoutes.AuthVerify.name, {
      authMethod: 'phone',
      data: phoneNumber,
      verificationCallback: callback,
    })
  }

  const getDefaultPhoneCode = () => {
    const defaultCode = PhoneCodes.find(x => x.code === 'US')
    return `${defaultCode.name} (${defaultCode.dial_code})`
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

  async function performAuth (values) {
    const phoneNumber = `${values.code.match(/\(([^)]+)\)/)[1]}${values.number}`
    const result = await signInWithPhone(phoneNumber)

    if (result.success) {
      gotoVerify(phoneNumber, result.data)
    }
  }

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <Formik
        initialValues={{
          code: getDefaultPhoneCode(),
          number: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={values => {
          const errors = {}
          if (
            !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
              values.number,
            )
          ) {
            errors.phone = 'Invalid phone number'
          }

          if (Object.keys(errors).length > 0) {
            console.log('Found error:', errors)
            triggerErrorShake()
          }

          return errors
        }}
        onSubmit={(values, {setSubmitting}) => {
          performAuth(values, setSubmitting)
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          errors,
          isValid,
        }) => (
          <>
            <Animated.View
              style={[
                formAnimatedStyle,
                {
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#A6A6A6',
                  paddingBottom: 5,
                },
              ]}>
              <Picker
                options={getPhoneCodes}
                value={values.code}
                onValueChange={handleChange('code')}
                title='Country/Region'
                style={{
                  borderRadius: 10,
                  // borderColor: '#000000',
                  // borderWidth: 1,
                  padding: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              />
              <Spacer />
              <TextInput
                placeholder='Phone Number'
                style={{
                  fontSize: 18,
                  padding: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                keyboardType='number-pad'
                value={values.number}
                onChangeText={val =>
                  /^\d*\.?\d*$/.test(val) && setFieldValue('number', val)
                }
              />
            </Animated.View>
            <Spacer multiply={2} />
            <AppText.Xs>
              We’ll send you a text to confirm your number. Standard message and
              data rates apply.
            </AppText.Xs>
            <Spacer multiply={4} />
            <CTAButton
              label='Continue'
              onPress={handleSubmit}
              isLoading={isBusy}
            />
          </>
        )}
      </Formik>
    </Animated.View>
  )
}
