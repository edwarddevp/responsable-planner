import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {SeInput} from "../../../../Shared/SeFields/SeInput";
import {StepContainer} from "../StepContainer";

const Step1Component = ({eva, control, nextPage, errors, trigger, previousPage}) => {
  const {style: styles} = eva

  const changePage = async () => {
    const validate = await trigger("name")
    if (validate) {
      nextPage()
    }
  }

  return <StepContainer
    title="Bienvenido"
    description='Lo guiaremos durante la creacion de su evento'
    changePage={changePage}
    previousPage={previousPage}
  >
    <View style={styles?.containerForm}>
      <SeInput
        name='name'
        control={control}
        errors={errors}
        label='Ingrese el nombre de su evento'
        placeholder='Nombre...'
        rightIcon='person'
        required
        maxLength={30}
      />
      <View/>
    </View>
  </StepContainer>
};

export const Step1 = withStyles(Step1Component, (theme) => ({
  containerForm: {
    flex:1,
    justifyContent: 'space-around',
  }
}));