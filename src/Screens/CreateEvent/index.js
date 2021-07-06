import React from "react";
import {Layout, ViewPager, withStyles} from "@ui-kitten/components";
import step1 from './../../../assets/images/steps/step1.png';
import step2 from './../../../assets/images/steps/step2.png';
import step3 from './../../../assets/images/steps/step3.png';
import step4 from './../../../assets/images/steps/step4.png';
import step5 from './../../../assets/images/steps/step5.png';
import step6 from './../../../assets/images/steps/step6.png';
import step7 from './../../../assets/images/steps/step7.png';
import {useForm} from "react-hook-form";
import {TabContainer} from "./components/TabContainer";
import {useCreateEventSlider} from "../../hooks/useCreateEventSlider";
import {Step1} from "./components/Step1";
import {Step2} from "./components/Step2";
import {Step3} from "./components/Step3";
import {Step4} from "./components/Step4";
import {Step5} from "./components/Step5";
import {Dimensions} from "react-native";
import {DEBUG} from "@env"
import {addDays} from "date-fns";
import {useBackButtonAction} from "../../hooks/useBackButtonAction";
import {Step6} from "./components/Step6";
import {SeAnimation} from "../../Shared/SeAnimation";
import {StatusBar} from "expo-status-bar";

const {height} = Dimensions.get('window');

const CreateEventScreen = ({navigation, eva}) => {
  const styles = eva?.style;
  const {control, handleSubmit, watch, trigger, reset, setValue, getValues, formState: {errors}} = useForm({
    defaultValues: DEBUG ? {
      name: 'Test 1',
      description: '',
      guestlimit: "50",
      direction: '',
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
      categoryid: undefined,
      securityMeasureIds: [],
    } : {
      name: '',
      description: '',
      guestlimit: "50",
      direction: '',
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
      categoryid: undefined,
      securityMeasureIds: [],
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

  useBackButtonAction(previousPage, selectedIndex)

  const {categories, loadingCategories, securityMeasures, loadingSecurityMeasures} = data

  const securityMeasuresFiltered = securityMeasures?.filter(item => !(item?.id === 2 || item?.id === 6))

  const shouldLoadComponent = (index) =>
    index === selectedIndex || selectedIndex === (index - 1) || selectedIndex === (index + 1);

  return (
    <>
      <StatusBar style="light"/>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        swipeEnabled={false}
        shouldLoadComponent={shouldLoadComponent}
      >
        <TabContainer style={styles.tab} source={step1}>
          {
            loadingCategories || loadingSecurityMeasures ?
              <SeAnimation src={require('../../../assets/animations/loading.json')}/> :
              <Step1
                control={control}
                trigger={trigger}
                errors={errors}
                previousPage={previousPage}
                nextPage={nextPage}
              />
          }
        </TabContainer>
        <TabContainer style={styles.tab} source={step2}>
          <Step2
            control={control}
            trigger={trigger}
            errors={errors}
            nextPage={nextPage}
            previousPage={previousPage}
            navigation={navigation}
            categories={categories}
            loadingCategories={loadingCategories}
            getValues={getValues}
          />
        </TabContainer>
        <TabContainer style={styles.tab} source={step3}>
          <Step3
            control={control}
            trigger={trigger}
            errors={errors}
            nextPage={nextPage}
            previousPage={previousPage}
            navigation={navigation}
            categories={categories}
            getValues={getValues}
            watch={watch}
            setValue={setValue}
            loading={loading}
          />
        </TabContainer>
        <TabContainer style={styles.tab} source={step4}>
          <Step4
            control={control}
            trigger={trigger}
            errors={errors}
            nextPage={nextPage}
            previousPage={previousPage}
            navigation={navigation}
            categories={categories}
            getValues={getValues}
            watch={watch}
            setValue={setValue}
            loading={loading}
          />
        </TabContainer>
        <TabContainer style={styles.tab} source={step5}>
          <Step5
            control={control}
            trigger={trigger}
            errors={errors}
            nextPage={nextPage}
            previousPage={previousPage}
            navigation={navigation}
            categories={categories}
            getValues={getValues}
            watch={watch}
            setValue={setValue}
            loading={loading}
            securityMeasure={securityMeasures?.filter(measure => measure?.id === 6)?.[0]}
          />
        </TabContainer>
        <TabContainer style={styles.tab} source={step6}>
          <Step6
            control={control}
            trigger={trigger}
            errors={errors}
            nextPage={nextPage}
            previousPage={previousPage}
            navigation={navigation}
            categories={categories}
            getValues={getValues}
            watch={watch}
            setValue={setValue}
            loading={loading}
            securityMeasures={securityMeasuresFiltered?.slice(0, 3)}
          />
        </TabContainer>
        <TabContainer style={styles.tab} source={step7}>
          <Step6
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
            securityMeasures={securityMeasuresFiltered?.slice(3, 7)}
            confirmButtonText='Guardar Evento'
          />
        </TabContainer>
      </ViewPager>
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
