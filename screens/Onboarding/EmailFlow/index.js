import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {AppText, CTAButton, Spacer} from '../../../global/components';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {useAuthHook} from '../../../data/database/user/auth';
import {Formik} from 'formik';
import {
  StringHelper,
  validateEmail,
} from '../../../data/extensions/stringHelper';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from '../../../data/routes';

export default () => {
  const {isBusy, validateSignin, signUpWithEmailCreds, signInWithEmailCreds} =
    useAuthHook();
  const [mailCheck, setMailCheck] = useState({
    checkPassed: false,
    isNew: false,
  });
  const navigation = useNavigation();

  const formHeight = useSharedValue(0);
  const errorAnimValues = {
    translateX: useSharedValue(0),
    borderColor: useSharedValue('#A6A6A6'),
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: formHeight.value, //change the height property of the component
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: errorAnimValues.translateX.value}],
      borderColor: errorAnimValues.borderColor.value,
    };
  });

  async function checkExistingEmail(email) {
    const result = await validateSignin({email: email});
    if (result.success) {
      if (result.data?.length <= 0) {
        setMailCheck({
          checkPassed: true,
          isNew: true,
        });
      } else {
        setMailCheck({
          checkPassed: true,
          isNew: false,
        });
      }
    } else {
      triggerErrorShake();
    }
  }

  async function performAuth(values) {
    if (!mailCheck.checkPassed) {
      checkExistingEmail(values.email);
    } else {
      if (mailCheck.isNew) {
        const result = await signUpWithEmailCreds({
          email: values.email,
          password: values.password,
          name: values.fullName,
        });
        console.log('result ??', result);
        if (result.success) {
          navigation.reset({
            index: 0,
            routes: [AppRoutes.default],
          });
        } else {
          triggerErrorShake();
        }
      } else {
        const result = await signInWithEmailCreds({
          email: values.email,
          password: values.password,
        });

        if (result.success) {
          navigation.reset({
            index: 0,
            routes: [AppRoutes.default],
          });
        } else {
          triggerErrorShake();
        }
      }
    }
  }

  useEffect(() => {
    if (mailCheck.checkPassed) {
      if (mailCheck.isNew) {
        formHeight.value = withTiming(150);
      } else {
        formHeight.value = withTiming(50);
      }
    } else {
      formHeight.value = withTiming(0);
    }
  }, [mailCheck.checkPassed, mailCheck.isNew]);

  function getButtonText() {
    if (mailCheck.checkPassed) {
      return mailCheck.isNew ? 'Create Account' : 'Log In';
    } else {
      return 'Continue';
    }
  }

  function triggerErrorShake() {
    errorAnimValues.borderColor.value = withSequence(
      withTiming('#ff2b2b', {duration: 700}),
      withTiming('#A6A6A6', {duration: 100}),
    );

    errorAnimValues.translateX.value = withSequence(
      withTiming(10, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(10, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(10, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(0, {duration: 100}),
    );
  }

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          fullName: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={values => {
          const errors = {};
          if (!validateEmail(values.email))
            errors.email = 'Invalid email address';

          if (mailCheck.checkPassed) {
            if (
              StringHelper.isPropsEmpty(
                values,
                mailCheck.isNew ? [] : ['password', 'fullName'],
              )
            ) {
              errors.all = 'Please fill in all details';
            }
          }

          if (Object.keys(errors).length > 0) {
            console.log('Found error:', errors);
            triggerErrorShake();
          }

          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          performAuth(values, setSubmitting);
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
                  paddingBottom: 5,
                },
              ]}>
              <Spacer />
              <TextInput
                placeholder="Your Email"
                style={{
                  fontSize: 18,
                  padding: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                value={values.email}
                keyboardType="email-address"
                onChangeText={val => {
                  setFieldValue('email', val);
                  mailCheck.checkPassed && setMailCheck({checkPassed: false});
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Animated.View style={[animatedStyles, {overflow: 'hidden'}]}>
                {mailCheck.checkPassed && mailCheck.isNew ? (
                  <>
                    <Spacer multiply={2} />
                    <TextInput
                      placeholder="Your Name"
                      autoFocus
                      style={{
                        fontSize: 18,
                        padding: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      value={values.fullName}
                      onChangeText={handleChange('fullName')}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Spacer multiply={2} />
                    <TextInput
                      placeholder={`${
                        mailCheck.checkPassed && mailCheck.isNew
                          ? 'Create'
                          : 'Enter'
                      } Password`}
                      style={{
                        fontSize: 18,
                        padding: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                    <Spacer multiply={2} />
                    <AppText.Xs
                      style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}>
                      You are creating a new account. Re-check your email to
                      login to existing account.
                    </AppText.Xs>
                  </>
                ) : mailCheck.checkPassed ? (
                  <>
                    <Spacer multiply={2} />
                    <TextInput
                      placeholder={`${
                        mailCheck.checkPassed && mailCheck.isNew
                          ? 'Create'
                          : 'Enter'
                      } Password`}
                      style={{
                        fontSize: 18,
                        padding: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                  </>
                ) : null}
              </Animated.View>
            </Animated.View>

            <Spacer multiply={4} />
            <CTAButton
              label={getButtonText()}
              onPress={handleSubmit}
              isLoading={isBusy}
            />
          </>
        )}
      </Formik>
    </Animated.View>
  );
};
