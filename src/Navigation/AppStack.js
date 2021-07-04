import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../Screens/Home';
import {CreateEvent} from "../Screens/CreateEvent";
import {EventDetailsDashboard} from "../Screens/EventDetails";
import {Guests} from "../Screens/Guests";
import {Tasks} from "../Screens/Tasks";
import {EditEvent} from "../Screens/EditEvent";
import {EventSecurityMeasures} from "../Screens/EventSecurityMeasures";
import {UserSettings} from "../Screens/UserSettings";
import {OnBoardingScreen} from "../Screens/OnBoardingScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  const options = {
    statusBar: {
      visible: false
    },
  };

  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="HOME"
        component={Home}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="CREATE_EVENT"
        component={CreateEvent}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="DASHBOARD"
        component={EventDetailsDashboard}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="GUESTS"
        component={Guests}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="TASKS"
        component={Tasks}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="EDIT_EVENT"
        component={EditEvent}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="EVENT_SECURITY_MEASURES"
        component={EventSecurityMeasures}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="USER_SETTINGS"
        component={UserSettings}
        options={options}
        headerStatusBarHeight={0}
      />

      <Stack.Screen
        name="ONBOARDING_REPEAT"
        options={options}
        headerStatusBarHeight={0}
      >
        {(props) =>
          <OnBoardingScreen isRepeat {...props} />}
      </Stack.Screen>

    </Stack.Navigator>
  );
};

export default AppStack;
