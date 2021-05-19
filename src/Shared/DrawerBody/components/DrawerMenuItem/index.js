import React from 'react';
import {Pressable, StyleSheet, View} from "react-native";
import {ForwardIcon} from "../../../icons";
import {Divider, DrawerItem, Icon, Text} from "@ui-kitten/components";

export const DrawerMenuItem = ({item, navigation}) => {
  return item?.divider ?
    <Divider style={styles?.divider}/> :
    <DrawerItem
      title={({style}) => <Text  style={[style[0],style[1],styles?.textLabel]}>{item?.label}</Text>}
      accessoryLeft={({style}) => <Icon  fill='#BE923B' style={[style[0],style[1],styles?.icon]} name={item?.icon ? item?.icon : 'bell-outline'}/>}
      accessoryRight={({style}) => <ForwardIcon   fill='#BE923B' style={[style[0],style[1],styles?.icon]}/>}
      style={styles?.drawerMenuItem}
    />
};

const styles = StyleSheet.create({
  divider: {
  },
  drawerMenuItem: {
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 18,
  },
  textLabel: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
})