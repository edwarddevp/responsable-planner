import React from "react";
import { Button, Divider,Layout, withStyles } from "@ui-kitten/components";
import { MainLayout } from "../../Layout/MainLayout";
import { Text, View } from "react-native";

const HomeScreen = ({ navigation, eva, style }) => {
  // const themeContext = React.useContext(ThemeContext);
  const { placeholder } = eva?.style;
  const navigateDetails = () => {
    navigation.navigate("DETAILS");
  };

  const navigateSearch = () => {
    navigation.navigate("SEARCH");
  };

  return (
    <MainLayout navigation={navigation}>
      <Layout style={{ flex: 1 }}>
        <View style={placeholder}>
          <Text>assdsadsa</Text>
        </View>
      </Layout>
    </MainLayout>
  );
};

export const Home = withStyles(HomeScreen, (theme) => ({
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: theme["color-basic-500"],
  },
}));
