import React from "react";
import { TopNavigation, Divider } from "@ui-kitten/components";

export const Navbar = ({ renderLeftActions, renderRightActions }) => {
  return (
    <>
      <TopNavigation
        alignment="center"
        title="Eva Application"
        subtitle="Subtitle"
        accessoryLeft={renderLeftActions || undefined}
        accessoryRight={renderRightActions}
      />
      <Divider />
    </>
  );
};
