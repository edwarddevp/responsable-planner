import React, {useEffect} from "react";
import {Layout, ViewPager, withStyles} from "@ui-kitten/components";
import {StatusBarBackground} from "../../Shared/StatusBarBackground";
import splash from './../../../assets/splash.png';
import {useForm} from "react-hook-form";
import {useIsFocused} from "@react-navigation/native";
import {TabContainer} from "./components/TabContainer";
import {useCreateEventSlider} from "../../hooks/useCreateEventSlider";
import {Step1} from "./components/Step1";
import {Step2} from "./components/Step2";
import {Step3} from "./components/Step3";
import {Dimensions} from "react-native";
import {DEBUG} from "@env"
import {addDays} from "date-fns";

const {height} = Dimensions.get('window');

const CreateEventScreen = ({navigation, eva}) => {
  const styles = eva?.style;
  const {control, handleSubmit, watch, trigger, reset, setValue, getValues, formState: {errors}} = useForm({
    defaultValues: DEBUG ?{
      name: 'Test 1',
      description: '',
      guestlimit: 5,
      direction: 'Avenida Falsa',
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
      categoryid: 8,
      // securityMeasureIds: '',
    } : {
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
    }
  });

  const {
    data,
    nextPage,
    previousPage,
    onSubmit,
    selectedIndex,
    setSelectedIndex,
    loading,
  } = useCreateEventSlider({reset, navigation});

  const {categories} = data

  return (
    <>
      <StatusBarBackground/>
      <Layout level='2' style={{backgroundColor: 'white'}}>
        <ViewPager
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          swipeEnabled={false}
        >
          <TabContainer style={styles.tab} source={splash}>
            <Step1
              control={control}
              trigger={trigger}
              errors={errors}
              nextPage={nextPage}
              navigation={navigation}
            />
          </TabContainer>
          <TabContainer style={styles.tab} source={splash}>
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
          </TabContainer>
          <TabContainer style={styles.tab} source={splash}>
            <Step3
              control={control}
              trigger={trigger}
              errors={errors}
              nextPage={handleSubmit(onSubmit)}
              previousPage={previousPage}
              navigation={navigation}
              categories={categories}
              getValues={getValues}
              watch={watch}
              setValue={setValue}
              loading={loading}
            />
          </TabContainer>
        </ViewPager>
      </Layout>
    </>
  );
};

export const CreateEvent = withStyles(CreateEventScreen, (theme) => ({
  tab: {
    height: height,
  },
  container: {
    flex: 1,
    paddingVertical: 48,
  },
}));
