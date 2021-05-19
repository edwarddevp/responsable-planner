import React from "react";
import {Button, Divider, Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {Text, View} from "react-native";
import {EventList} from "./components/EventList";

const HomeScreen = ({navigation, eva, style}) => {
  // const themeContext = React.useContext(ThemeContext);
  const {placeholder,bg, bg2} = eva?.style;
  const navigateDetails = () => {
    navigation.navigate("DETAILS");
  };

  const navigateSearch = () => {
    navigation.navigate("SEARCH");
  };

  return (
    <MainLayout navigation={navigation}>
      <Layout style={bg}>
        <EventList />
      </Layout>
    </MainLayout>
  );
};

export const Home = withStyles(HomeScreen, (theme) => ({
  bg: {
    flex:1,
    backgroundColor: theme["color-basic-300"],
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: theme["color-basic-500"],
  },
}));
