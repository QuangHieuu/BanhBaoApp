import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/loginScreen/LoginScreen';
import SplashScreen from '../screen/splashScreen/SplashScreen';

const AppStack = createStackNavigator();

export const AppRouter = () => {
  return (
    <AppStack.Navigator headerMode={'none'} initialRouteName={'Splash'}>
      <AppStack.Screen name={'Splash'} component={SplashScreen} />
      <AppStack.Screen name={'Login'} component={LoginScreen} />
    </AppStack.Navigator>
  );
};
