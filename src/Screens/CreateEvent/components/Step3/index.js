import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {FooterButtons} from "../FooterButtons";
import {BasicInformationForm} from "./components/BasicInformationForm";


const Step3Component = ({eva, control, nextPage, errors, trigger, previousPage, getValues, watch, setValue, loading}) => {
  const styles = eva?.style

  const changePage = async () => {
    const validate = await trigger(["startdate","enddate"])
    if (validate) {
      nextPage()
    }
  }

  return <>
    <View style={styles?.containerTitle}>
      <Text style={styles?.h1}>{getValues('name')}</Text>
      <Text style={{...styles?.marginTop, ...styles?.h2}}>Información acerca del evento</Text>
    </View>
    <BasicInformationForm
      control={control}
      errors={errors}
      style={styles?.containerForm}
      getValues={getValues}
      watch={watch}
      setValue={setValue}
    />
    <FooterButtons
      buttonWidth={120}
      style={styles?.containerButtons}
      leftAction={previousPage}
      rightAction={changePage}
      loading={loading}
    />
  </>
};

export const Step3 = withStyles(Step3Component, (theme) => ({
  containerTitle: {
    flex: 1,
    paddingHorizontal: 24
  },
  containerForm: {
    flex: 4,
    paddingHorizontal: 24,
    paddingBottom:12
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingHorizontal: 36
  },
  marginTop: {
    marginTop: 12
  },
  errorMessage: {
    marginTop: 8
  },
  borderColorRed: {
    borderColor: theme['color-danger-500']
  },
  h1: {
    fontSize: 32
  },
  h2: {
    fontSize: 18
  },
}));