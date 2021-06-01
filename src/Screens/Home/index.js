import React from "react";
import {Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {EventList} from "./components/EventList";

const HomeScreen = ({navigation, eva}) => {
  const {bg} = eva?.style;

  return (
    <MainLayout navigation={navigation} title='Events'>
      <Layout style={bg} level='3'>
        <EventList navigation={navigation}/>
      </Layout>
    </MainLayout>
  );
};

export const Home = withStyles(HomeScreen, (theme) => ({
  bg: {
    flex: 1,
    // backgroundColor: theme["color-basic-300"],
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: theme["color-basic-500"],
  },
}));
