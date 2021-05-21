import React, {useContext} from 'react'
import {StyleSheet} from 'react-native';
import {AuthContext} from "../../Navigation/AuthProvider";
import {Header} from "./components/Header";
import {Drawer, IndexPath, DrawerItem, Text, Icon, Divider, Layout} from "@ui-kitten/components";
import {ForwardIcon} from "../icons";


export const DrawerBody = ({navigation,state}) => {
  const {user} = useContext(AuthContext);

  return <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}
    appearance='noDivider'
    header={() => <Header user={user}/>}
  >
    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>My Events</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='home-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Create Event</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='plus'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Tareas Pendientes</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='checkmark-square-2-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Security Measures</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='file-text-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Reminders</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='bell-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Favorite Events</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='heart-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <Divider style={styles?.divider}/>

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Settings</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='settings-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Logout</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='log-out-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />

    <DrawerItem
      title={({style}) => <Text style={[style[0],style[1],styles?.textLabel]}>Share</Text>}
      accessoryLeft={({style}) => <Icon fill='#BE923B' style={[style[0],style[1],styles?.icon]} name='share-outline'/>}
      accessoryRight={({style}) => <ForwardIcon fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />
  </Drawer>
};

const styles = StyleSheet.create({
  divider: {
  },
  drawerMenuItem: {
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 14,
  },
  textLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  icon: {
    width: 20,
    height: 20,
  },
})