import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Button, Divider, Layout } from "@ui-kitten/components";
import { ThemeContext } from "../../config/theme-context";
import { Navbar } from "../../common/Navbar";

export const HomeScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);

  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Navbar title="MyApp" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>
          OPEN DETAILS
        </Button>
        <Button
          style={{ marginVertical: 4 }}
          onPress={themeContext.toggleTheme}
        >
          TOGGLE THEME
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
