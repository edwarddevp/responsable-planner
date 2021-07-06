import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SingUp} from '../Screens/SingUp';
import {LoginScreen} from '../Screens/Login';
import {OnBoardingScreen} from '../Screens/OnBoardingScreen';

const Stack = createStackNavigator();

const AuthStack = ({isAppFirstLaunched, setIsAppFirstLaunched}) => {
  const options = {
    statusBar: {
      visible:false
    },
  };

  return (
    <Stack.Navigator headerMode='none'>
      {
        isAppFirstLaunched ?
          <Stack.Screen
            name="OnBoarding"
            options={options}
            headerStatusBarHeight={0}
          >
            {(props) =>
              <OnBoardingScreen setIsAppFirstLaunched={setIsAppFirstLaunched} {...props} />}
          </Stack.Screen> : <></>
      }
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={options}
        headerStatusBarHeight={0}
      />
      <Stack.Screen
        name="Signup"
        component={SingUp}
        options={options}
        headerStatusBarHeight={0}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
