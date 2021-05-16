import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SingUp} from '../Screens/SingUp';
import {LoginScreen} from '../Screens/Login';
import {OnBoardingScreen} from '../Screens/OnBoardingScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isAlreadyLaunched, setIsAlreadyLaunched] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value) {
        setIsAlreadyLaunched(true);
      } else {
        setIsAlreadyLaunched(false);
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {
        isAlreadyLaunched ?
          <>
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
          </> :
          <Stack.Screen
            name="OnBoarding"
            component={OnBoardingScreen}
            options={{header: () => null}}
          />
      }
    </Stack.Navigator>
  );
};

export default AuthStack;
