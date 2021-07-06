import React, {useState} from "react";
import {Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {EventList} from "./components/EventList";
import {FloatingActionButton} from "../../Shared/FloatingActionButton";
import {useScreenFocused} from "../../hooks/useScreenFocused";

const HomeScreen = ({navigation, eva}) => {
  const [isNavigating, setIsNavigating] = useState(false)
  useScreenFocused(() => setIsNavigating(false))
  const {bg} = eva?.style;

  return (
    <MainLayout navigation={navigation} title='Safe Event Planner'>
      <Layout style={bg} level='3'>
        <EventList navigation={navigation}/>
        <FloatingActionButton
          onPress={() => {
            if (!isNavigating) {
              navigation?.push('CREATE_EVENT')
              setIsNavigating(true)
            }
          }}
        />
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
