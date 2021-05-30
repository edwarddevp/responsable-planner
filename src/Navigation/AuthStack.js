import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SingUp} from '../Screens/SingUp';
import {LoginScreen} from '../Screens/Login';
import {OnBoardingScreen} from '../Screens/OnBoardingScreen';

const Stack = createStackNavigator();

const AuthStack = ({isAppFirstLaunched}) => {

  return (
    <Stack.Navigator>
      {
        isAppFirstLaunched ?
          <Stack.Screen
            name="OnBoarding"
            component={OnBoardingScreen}
            options={{header: () => null}}
          /> : null
      }
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SingUp}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
