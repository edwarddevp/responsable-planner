import React, {useContext} from 'react'
import {FlatList, StyleSheet, View} from 'react-native';
import {AuthContext} from "../../Navigation/AuthProvider";
import {Header} from "./components/Header";
import {DrawerMenuItem} from "./components/DrawerMenuItem";


export const DrawerBody = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const drawer = [
    {
      label: 'My Events',
      icon: 'home-outline',
      id:'1'
    },
    {
      label: 'Create Event',
      icon: 'plus',
      id:'2'
    },
    {
      label: 'Tareas Pendientes',
      icon: 'checkmark-square-2-outline',
      id:'3'
    },
    {
      label: 'Security Measures',
      icon: 'file-text-outline',
      id:'4'
    },
    {
      label: 'Reminders',
      icon: 'bell-outline',
      id:'5'
    },
    {
      label: 'Favorite Events',
      icon: 'heart-outline',
      id:'6'
    },
    {
      divider: true,
      id:'7',
      styles:{
        backgroundColor:'#BE923B'
      }
    },
    {
      label: 'Settings',
      icon: 'settings-outline',
      id:'8'
    },
    {
      label: 'Logout',
      icon: 'log-out-outline',
      id:'9'
    },
    {
      label: 'Share',
      icon: 'share-outline',
      id:'10'
    }]

  return <View style={{flex: 1, width: '100%', backgroundColor:'#1D1D1F'}}>
    <Header user={user}/>
    <FlatList
      data={drawer}
      renderItem={({item}) =>
        <DrawerMenuItem item={item} navigation={navigation}/>}
      keyExtractor={item => item.id}
      refreshing
    />
  </View>
};

const styles = StyleSheet.create({});