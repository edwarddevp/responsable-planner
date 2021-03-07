import React from "react";
import {
  OverflowMenu,
  MenuItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { BackIcon, EditIcon, MenuIcon, InfoIcon, LogoutIcon } from "./../Icons";

const BackAction = () => <TopNavigationAction icon={BackIcon} />;

export const Navbar = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <TopNavigation
      alignment="center"
      title="Eva Application"
      subtitle="Subtitle"
      accessoryLeft={renderBackAction}
      accessoryRight={renderRightActions}
    />
  );
};

const TopNavigationStyling = () => (
  <TopNavigation
    title={(evaProps) => <Text {...evaProps}>Title</Text>}
    subtitle={(evaProps) => <Text {...evaProps}>Subtitle</Text>}
  />
);
