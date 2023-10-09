import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {AppRoutes, AuthRoutes, getDedicatedRoutes} from './data/routes';
import OnboardingScreens from './screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Lottie from 'lottie-react-native';
import {CustomTabBar} from './global/components';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/Store';
const AuthNav = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={headerOptions}>
      <AuthStack.Screen
        name={AuthRoutes.init.name}
        component={OnboardingScreens.Init}
      />
      <AuthStack.Screen
        name={AuthRoutes.AuthFlow.name}
        component={OnboardingScreens.FlowScreen}
      />
      <AuthStack.Screen
        name={AuthRoutes.AuthVerify.name}
        component={OnboardingScreens.VerifyScreen}
        // options={{gestureEnabled: false}}
      />
    </AuthStack.Navigator>
  );
};

const SwapNav = () => {
  const SwapStack = createNativeStackNavigator();

  return (
    <SwapStack.Navigator
      screenOptions={headerOptions}
      initialRouteName={AppRoutes.Transfer.name}>
      <SwapStack.Group>
        <SwapStack.Screen {...AppRoutes.Transfer} />
        <SwapStack.Screen {...AppRoutes.TransferAmount} />
      </SwapStack.Group>
      <SwapStack.Group screenOptions={{presentation: 'modal'}}>
        <SwapStack.Screen {...AppRoutes.TransferConfirm} />
      </SwapStack.Group>
    </SwapStack.Navigator>
  );
};

const AppNav = () => {
  const AppStack = createBottomTabNavigator();
  const app_routes = getDedicatedRoutes().AppRoutes;
  return (
    <AppStack.Navigator
      screenOptions={headerOptions}
      tabBar={props => <CustomTabBar {...props} specialTabIndex={1} />}>
      <AppStack.Screen {...AppRoutes.Wallet} />
      <AppStack.Screen {...AppRoutes.TransferInit} component={SwapNav} />
      <AppStack.Screen {...AppRoutes.Accounts} />
    </AppStack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const ParentStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{height: '100%', width: '100%'}}>
          <NavigationContainer>
            <ParentStack.Navigator screenOptions={headerOptions}>
              <ParentStack.Screen
                name={AuthRoutes.default.name}
                component={AuthNav}
              />
              <ParentStack.Screen
                name={AppRoutes.default.name}
                component={AppNav}
              />
            </ParentStack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};
export default App;

const headerOptions = {
  headerShown: false,
};
