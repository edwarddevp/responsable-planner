import React from 'react'
import { Drawer as KittenDrawer, DrawerItem, IndexPath  } from "@ui-kitten/components";
import { StatusBar } from 'react-native';

export const DrawerBody = ({ navigation, state }) => (
    <KittenDrawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
      >
      <DrawerItem title='Users' />
      <DrawerItem title='Orders' />
    </KittenDrawer>
  );