import React from 'react'
import { Drawer as KittenDrawer, DrawerItem, IndexPath  } from "@ui-kitten/components";

export const DrawerBody = ({ navigation, state }) => (
    <KittenDrawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}>
      <DrawerItem title='Users' />
      <DrawerItem title='Orders' />
    </KittenDrawer>
  );