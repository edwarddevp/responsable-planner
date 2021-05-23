import React, {useEffect} from "react";
import {Layout, Text, ViewPager, withStyles} from "@ui-kitten/components";
import {StatusBarBackground} from "../../Shared/StatusBarBackground";
import {Dimensions, View} from "react-native";
import splash from './../../../assets/splash.png';
import {useForm} from "react-hook-form";
import {useIsFocused} from "@react-navigation/native";
import {DarkerImageBackground} from "../../Shared/DarkerImageBackground";
import {useCreateEventSlider} from "../../hooks/useCreateEventSlider";
import {Step1} from "./components/Step1";
import {Step2} from "./components/Step2";
import {Step3} from "./components/Step3";

const {height} = Dimensions.get('window');

const CreateEventScreen = ({navigation, eva}) => {
  const styles = eva?.style;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {categories} = useCreateEventSlider();
  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    // listen for isFocused, if useFocused changes
    // call the function that you use to mount the component.
    setSelectedIndex(0)
    reset({
      "name": "Test 1",
      "categoryId": 2
    })
  }, [isFocused]);

  const {control, handleSubmit, trigger, reset, getValues, formState: {errors}} = useForm({
    defaultValues: {
      "name": "Test 1",
      "categoryId": 2
    },
  });

  console.log('%c getValues', 'background: #222; color: #bada55',getValues())

  const nextPage = () => {
    setSelectedIndex(index => index + 1)
  }

  const previousPage = () => {
    setSelectedIndex(index => index - 1)
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
            <Step1
              control={control}
              trigger={trigger}
              errors={errors}
              nextPage={nextPage}
              navigation={navigation}
            />
          </DarkerImageBackground>
          <DarkerImageBackground style={styles.tab} source={splash}>
            <Step2
              control={control}
              trigger={trigger}
              errors={errors}
              nextPage={nextPage}
              previousPage={previousPage}
              navigation={navigation}
              categories={categories}
              getValues={getValues}
            />
          </DarkerImageBackground>
          <DarkerImageBackground style={styles.tab} source={splash}>
            <Step3
              control={control}
              trigger={trigger}
              errors={errors}
              nextPage={nextPage}
              previousPage={previousPage}
              navigation={navigation}
              categories={categories}
              getValues={getValues}
            />
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
