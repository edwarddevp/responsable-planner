import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {KeyboardAvoidingView, View} from "react-native";
import {FooterButtons} from "../FooterButtons";
import {CategoriesList} from "./components/CategoriesList";

const Step2Component = ({eva, control, nextPage, previousPage, errors, trigger, categories, getValues}) => {
  const {style: styles} = eva
  // console.log('%c categories', 'background: #222; color: #bada55',categories)
  const changePage = async () => {
    await trigger("categoryId")
    if (!errors?.categoryId) {
      nextPage()
    }
  }

  return <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-150} style={styles?.container}>
    <View style={styles?.containerTitle}>
      <Text style={styles?.h1}>{getValues('name')}</Text>
      <Text style={{...styles?.marginTop, ...styles?.h2}}>Seleccione el tipo de evento</Text>
    </View>
    <CategoriesList
      categories={categories}
      style={styles?.containerForm}
      control={control}
      errors={errors}
    />
    <FooterButtons
      style={styles?.containerButtons}
      leftAction={previousPage}
      rightAction={changePage}
    />
  </KeyboardAvoidingView>
};

export const Step2 = withStyles(Step2Component, (theme) => ({
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
    justifyContent: 'space-around',
    // paddingHorizontal: 24
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