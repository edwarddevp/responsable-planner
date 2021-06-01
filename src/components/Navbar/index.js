import React from "react";
import {TopNavigation, Divider, withStyles, Text} from "@ui-kitten/components";

const NavbarComponent = ({ renderLeftActions, renderRightActions, title, eva }) => {
  const styles = eva?.style;
  return (
    <>
      <TopNavigation
        title={(TextProps) => <Text style={styles?.title} category='h2'>{title}</Text>}
        // subtitle="Subtitle"
        accessoryLeft={renderLeftActions || undefined}
        accessoryRight={renderRightActions}
      />
      <Divider />
    </>
  );
};

export const Navbar = withStyles(NavbarComponent, (theme) => ({
  title:{
    fontSize: 20,
    marginLeft:8
  }
}));