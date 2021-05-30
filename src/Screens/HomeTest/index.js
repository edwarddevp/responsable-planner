import React from "react";
import { Button, Divider, Layout } from "@ui-kitten/components";
import { ThemeContext } from "../../config/theme-context";
import { MainLayout } from "../../Layout/MainLayout";

export const HomeTest = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);

  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  const navigateSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <MainLayout navigation={navigation}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>
          OPEN DETAILS
        </Button>
        <Button style={{ marginVertical: 4 }} onPress={navigateSearch}>
          Search
        </Button>
        <Button style={{ marginVertical: 4 }} onPress={navigation.toggleDrawer}>
          Drawer
        </Button>
        <Button
          style={{ marginVertical: 4 }}
          onPress={themeContext.toggleTheme}
        >
          TOGGLE THEME
        </Button>
      </Layout>
    </MainLayout>
  );
};
