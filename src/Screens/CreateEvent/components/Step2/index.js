import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {KeyboardAvoidingView, View} from "react-native";
import {FooterButtons} from "../FooterButtons";
import {CategoriesList} from "./components/CategoriesList";

const Step2Component = ({eva, control, nextPage, previousPage, errors, trigger, categories, getValues}) => {
  const {style: styles} = eva

  const changePage = async () => {
    const validate = await trigger("categoryId")
    if (validate) {
      nextPage()
    }
  }

  return <>
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
  </>
};

export const Step2 = withStyles(Step2Component, (theme) => ({
  container:{
    flex:1
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
  h1: {
    fontSize: 32
  },
  h2: {
    fontSize: 18
  },
}));