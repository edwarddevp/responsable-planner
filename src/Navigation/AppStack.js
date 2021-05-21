import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../Screens/Home';
// import {Details} from './../Screens/Details';
// import {AuthContext} from './AuthProvider';
import { useTheme } from '@ui-kitten/components';
import { DrawerBody } from '../Shared/DrawerBody';
import {CreateEvent} from "../Screens/CreateEvent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const HomeStack = ({navigation}) => {
    // const {logout} = useContext(AuthContext);
    // const theme = useTheme();
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen
                name={'HOME'}
                component={Home}
            />

            {/*<Stack.Screen*/}
            {/*    name={'DETAILS'}*/}
            {/*    component={Details}*/}
            {/*/>*/}

        </Stack.Navigator>
    );
};

const ProfileStack = ({navigation}) => {

    return (
        <Stack.Navigator>
            {/* <Stack.Screen
                name={'PROFILE'}
                component={Profile}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: theme['color-basic-100'],,
                        fontSize: 18,
                    },
                    headerStyle: {
                        backgroundColor:theme['color-primary-500'],
                        elevation: 0
                    },
                    headerRight: () => (
                        <View style={{marginRight: 10}}>
                            <MaterialCommunityIcons
                                name="logout"
                                size={30}
                                color={theme['color-basic-100'],}
                                onPress={() => logout()}
                            />
                        </View>
                    )
                }}
            /> */}

        </Stack.Navigator>
    );
}

const AppStack = () => {
    const theme = useTheme();

    return (
        <Drawer.Navigator drawerContent={props => <DrawerBody {...props}/>}>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Create Event" component={CreateEvent}/>
            <Drawer.Screen name="Tareas Pendientes" component={HomeStack}/>
            <Drawer.Screen name="Security Measures" component={HomeStack}/>
            <Drawer.Screen name="Reminders" component={HomeStack}/>
            <Drawer.Screen name="Favorite Events" component={HomeStack}/>
            <Drawer.Screen name="Settings" component={HomeStack}/>
            <Drawer.Screen name="Logout" component={HomeStack}/>
            <Drawer.Screen name="Share" component={HomeStack}/>
            {/*<Drawer.Screen*/}
            {/*    name="Profile"*/}
            {/*    component={ProfileStack}*/}
            {/*    options={{*/}
            {/*        tabBarIcon: ({color, size}) => (*/}
            {/*            <MaterialCommunityIcons*/}
            {/*                name="account-outline"*/}
            {/*                color={color}*/}
            {/*                size={size}*/}
            {/*            />*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
        </Drawer.Navigator>
    );
};

export default AppStack;
