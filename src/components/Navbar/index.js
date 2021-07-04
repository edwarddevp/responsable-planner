import React from "react";
import {TopNavigation, Divider, withStyles, Text} from "@ui-kitten/components";
import Constants from "expo-constants";

const NavbarComponent = ({ renderLeftActions, renderRightActions, title, backButton, eva }) => {
  const styles = eva?.style;
  return (
    <>
      <TopNavigation
        style={{ paddingTop: Constants.statusBarHeight * 1.5}}
        title={(TextProps) => <Text style={styles?.title(backButton)} category='h2'>{title}</Text>}
        // subtitle="Subtitle"
        accessoryLeft={renderLeftActions || undefined}
        accessoryRight={renderRightActions}
      />
      <Divider />
    </>
  );
};

export const Navbar = withStyles(NavbarComponent, (theme) => ({
  title: (backButton) => ({
    fontSize: 19,
    marginVertical: 4,
    marginLeft: backButton? 0 : 12
  })
}));