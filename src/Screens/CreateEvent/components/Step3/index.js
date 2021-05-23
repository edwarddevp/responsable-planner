import React from 'react';
import { Text, withStyles} from "@ui-kitten/components";
import {KeyboardAvoidingView, View} from "react-native";
import {FooterButtons} from "../FooterButtons";
import {BasicInformationForm} from "./components/BasicInformationForm";

const Step3Component = ({eva, control, nextPage, errors, trigger, previousPage, getValues}) => {
  const styles = eva?.style

  const changePage = async () => {
    await trigger("name")
    if (!errors?.name) {
      nextPage()
    }
  }

  return <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-280} style={styles?.container}>
    <View style={styles?.containerTitle}>
      <Text style={styles?.h1}>{getValues('name')}</Text>
      <Text style={{...styles?.marginTop, ...styles?.h2}}>Información acerca del evento</Text>
    </View>
    <BasicInformationForm
      control={control}
      errors={errors}
      style={styles?.containerForm}
    />
    <FooterButtons
      style={styles?.containerButtons}
      leftAction={previousPage}
      rightAction={changePage}
    />
  </KeyboardAvoidingView>
};

export const Step3 = withStyles(Step3Component, (theme) => ({
  container: {
    flex: 1,
    paddingVertical: 48,
  },
  containerTitle: {
    flex: 1,
    paddingHorizontal: 24
  },
  containerForm: {
    flex: 4,
    paddingHorizontal: 24
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