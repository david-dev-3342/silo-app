import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ScreenContainer, Spacer} from '../../global/components';
import {AuthProvider, OrDivider} from './components';
import EmailFlow from './EmailFlow';
import PhoneFlow from './PhoneFlow';
import auth from '@react-native-firebase/auth';
import {useAuthHook} from '../../data/database/user/auth';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from '../../data/routes';

export const OnboardingFlow = () => {
  const {signInWithGoogle} = useAuthHook();
  const navigation = useNavigation();
  const [socialAuthStates, setSocialAuthBusy] = useState({
    Google: false,
    Apple: false,
  });
  const [authFlow, setAuthFlow] = useState('Phone');

  function changeFlow() {
    setAuthFlow(prev => (prev === 'Phone' ? 'Email' : 'Phone'));
  }

  async function performGoogleAuth() {
    setSocialAuthBusy(prev => ({...prev, Google: true}));
    const result = await signInWithGoogle();
    console.log('result ??? ', result);
    
    result.success &&
      navigation.reset({
        index: 0,
        routes: [AppRoutes.default],
      });
    setSocialAuthBusy(prev => ({...prev, Google: false}));
    // Sign-in the user with the credential
  }

  return (
    <ScreenContainer
      isUIBusy={socialAuthStates.Apple || socialAuthStates.Google}>
      {authFlow === 'Phone' ? <PhoneFlow /> : <EmailFlow />}
      <Spacer multiply={5} />
      <OrDivider />
      <Spacer multiply={5} />
      <View>
        <AuthProvider
          type={authFlow === 'Phone' ? 'Email' : 'Phone'}
          onPress={changeFlow}
        />
        <AuthProvider
          type="Google"
          onPress={performGoogleAuth}
          isLoading={socialAuthStates.Google}
        />
        <AuthProvider type="Apple" />
      </View>
    </ScreenContainer>
  );
};
