import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {ForwardIcon} from "../../../icons";
import {Divider, Icon} from "@ui-kitten/components";

export const DrawerMenuItem = ({item, navigation}) => {
  return item?.divider ?
    <Divider style={styles?.divider(item?.styles)}/> :
    <Pressable
      onPress={() => navigation.navigate(item?.route || 'Home')}
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? 'rgb(210, 230, 255)'
            : 'transparent'
        }
      ]}>
      {() => (
        <View style={styles?.drawerMenuItem}>
          <View style={styles?.drawerMenuItemLeft}>
            <Icon fill='#BE923B' style={styles?.icon} name={item?.icon? item?.icon : 'bell-outline'}/>
            <Text style={{...styles?.spacing, ...styles?.textLabel}}>{item?.label}</Text>
          </View>
          <View style={styles?.drawerMenuItemRight}>
            <ForwardIcon fill='#BE923B' style={styles?.icon}/>
          </View>
        </View>
      )}
    </Pressable>
};

const styles = StyleSheet.create({
  divider: (itemStyles) => itemStyles,
  drawerMenuItem: {
    paddingLeft: 24,
    paddingRight: 36,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  drawerMenuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerMenuItemLeft: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabel: {
    flex: 1,
    fontSize: 18,
    color: '#F2F2F2'
  },
  spacing: {
    marginLeft: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
})