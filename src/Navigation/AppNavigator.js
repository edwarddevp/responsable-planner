import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/Home';
import { DetailsScreen } from '../Screens/Details';
import { SearchScreen } from '../Screens/Search';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath  } from "@ui-kitten/components";

const { Navigator, Screen } = createDrawerNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Details' component={DetailsScreen}/>
    <Screen name='Search' component={SearchScreen}/>
  </Navigator>
);

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title='Users' />
    <DrawerItem title='Orders' />
  </Drawer>
);

export const DrawerNavigator = () => (
  <Navigator drawerContent={props => <DrawerContent {...props}/>}>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Details' gestureEnabled={false} component={DetailsScreen}/>
    <Screen name='Search' component={SearchScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <DrawerNavigator/>
  </NavigationContainer>
);
