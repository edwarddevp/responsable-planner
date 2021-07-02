import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../Screens/Home';
import {useTheme} from '@ui-kitten/components';
import {CreateEvent} from "../Screens/CreateEvent";
import {EventDetailsDashboard} from "../Screens/EventDetails";
import {Guests} from "../Screens/Guests";
import {Tasks} from "../Screens/Tasks";
import {EditEvent} from "../Screens/EditEvent";
import {EventSecurityMeasures} from "../Screens/EventSecurityMeasures";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = () => {
  const theme = useTheme();
  const options = {
    statusBar: {
      visible:false
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

      <Drawer.Screen
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

      {/*<Stack.Screen*/}
      {/*    name={'DETAILS'}*/}
      {/*    component={Details}*/}
      {/*/>*/}

    </Stack.Navigator>
    // <Drawer.Navigator drawerContent={props => <DrawerBody {...props}/>}>
    //   <Drawer.Screen name="EVENT" component={EventDetailStack}/>
    //   <Drawer.Screen name="CREATE_EVENT" component={CreateEvent}/>
    //   <Drawer.Screen name="TAREAS_PENDIENTES" component={Home}/>
    //   <Drawer.Screen name="SECURITY_MEASURES" component={Home}/>
    //   <Drawer.Screen name="REMINDERS" component={Home}/>
    //   <Drawer.Screen name="FAVORITE_EVENTS" component={Home}/>
    //   <Drawer.Screen name="SETTINGS" component={Home}/>
    //   <Drawer.Screen name="LOGOUT" component={Home}/>
    //   <Drawer.Screen name="SHARE" component={Home}/>
    //
    //
    // </Drawer.Navigator>
  );
};

export default AppStack;
