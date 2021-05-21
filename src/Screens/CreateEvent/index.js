import React, {useEffect} from "react";
import {Button, Input, Layout, Text, ViewPager, withStyles} from "@ui-kitten/components";
import {StatusBarBackground} from "../../Shared/StatusBarBackground";
import {Dimensions, ImageBackground, View} from "react-native";
import splash from './../../../assets/splash.png';
import {Controller, useForm} from "react-hook-form";
import {PersonIcon} from "../../Shared/icons";
import {useIsFocused} from "@react-navigation/native";
import {DarkerImageBackground} from "../../Shared/DarkerImageBackground";
import {Step1Component} from "./components/Step1";

const {height, width} = Dimensions.get('window');

const CreateEventScreen = ({navigation, eva}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const styles = eva?.style;
  // check if screen is focused
  const isFocused = useIsFocused();

  // listen for isFocused, if useFocused changes
  // call the function that you use to mount the component.

  useEffect(() => {
    setSelectedIndex(0)
  }, [isFocused]);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      "name": "name", //required
      "description": "description",
      "guestlimit": 20,
      "direction": "Calle falsa 123",
      "startdate": "2005/05/05", //required
      "enddate": "2005/05/07", //required
      "categoryid": 8,
      "securityMeasureIds": [],
    },
  });

  const nextPage = () => {
    setSelectedIndex(index => index + 1)
  }

  return (
    <>
      <StatusBarBackground/>
      <Layout level='2' style={{backgroundColor: 'white'}}>
        <ViewPager
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          swipeEnabled={false}
        >
          <DarkerImageBackground style={styles.tab} source={splash}>
            <Step1Component
              control={control}
              nextPage={nextPage}
              errors={errors}
            />
          </DarkerImageBackground>
          <DarkerImageBackground style={styles.tab} source={splash}>
            <View>
              <Text>Page 2</Text>
            </View>
          </DarkerImageBackground>
          <DarkerImageBackground style={styles.tab} source={splash}>
            <View>
              <Text>Page 3</Text>
            </View>
          </DarkerImageBackground>
        </ViewPager>
      </Layout>
    </>
  );
};

export const CreateEvent = withStyles(CreateEventScreen, (theme) => ({
  tab: {
    height: height,
  },
}));
