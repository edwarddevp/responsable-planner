import React from 'react';
import {Spinner, withStyles} from "@ui-kitten/components";
import {CategoriesList} from "./components/CategoriesList";
import {StepContainer} from "../StepContainer";
import Toast from "react-native-toast-message";

const Step2Component = (
  {
    eva,
    control,
    nextPage,
    previousPage,
    errors,
    trigger,
    categories,
    getValues,
    loadingCategories
  }) => {
  const {style: styles} = eva

  const changePage = async () => {
    const validate = await trigger("categoryid")
    if (validate) {
      nextPage()
    } else {
      Toast.show({
        text1: `Selecciona una categoria para el evento`,
        type: 'error'
      });
    }
  }

  return <StepContainer
    title={getValues('name')}
    description='Seleccione una categoria para su evento'
    changePage={changePage}
    previousPage={previousPage}
  >
    {
      loadingCategories ?
        <Spinner style={styles?.spinner}/> :
        <CategoriesList
          categories={categories}
          style={styles?.containerForm}
          control={control}
          errors={errors}
        />
    }

  </StepContainer>
};

export const Step2 = withStyles(Step2Component, (theme) => ({
  containerForm: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 12
  },
  spinner: {
    width: 24,
    height:24
  }
}));