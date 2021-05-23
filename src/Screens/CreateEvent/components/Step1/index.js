import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {KeyboardAvoidingView, View} from "react-native";
import {PersonIcon} from "../../../../Shared/icons";
import {FooterButtons} from "../FooterButtons";
import {SeInput} from "../../../../Shared/SeFields/SeInput";

const Step1Component = ({eva, control, nextPage, errors, trigger, navigation}) => {
  const {style: styles} = eva

  const changePage = async () => {
    await trigger("name")
    if (!errors?.name) {
      nextPage()
    }
  }

  return <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-150} style={styles?.container}>
    <View style={styles?.containerTitle}>
      <Text style={styles?.h1}>Bienvenido</Text>
      <Text style={{...styles?.marginTop, ...styles?.h2}}>Lo guiaremos durante la creacion de su evento</Text>
    </View>
    <View style={styles?.containerForm}>
      <SeInput
        name='name'
        control={control}
        errors={errors}
        label='Ingrese el nombre de su evento'
        rightIcon='person'
      />
      <View/>
    </View>
    <FooterButtons
      style={styles?.containerButtons}
      leftAction={navigation?.goBack}
      rightAction={changePage}
    />
  </KeyboardAvoidingView>
};

export const Step1 = withStyles(Step1Component, (theme) => ({
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
  h1: {
    fontSize: 32
  },
  h2: {
    fontSize: 18
  },
}));