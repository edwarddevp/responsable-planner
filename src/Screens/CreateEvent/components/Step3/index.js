import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {BasicInformationForm} from "./components/BasicInformationForm";
import {StepContainer} from "../StepContainer";


const Step3Component = (
  {
    eva,
    control,
    nextPage,
    errors,
    trigger,
    previousPage,
    getValues,
    watch,
    setValue
  }) => {
  const styles = eva?.style

  const changePage = async () => {
    const validate = await trigger(["startdate", "enddate"])
    if (validate) {
      nextPage()
    }
  }

  return <StepContainer
    title={getValues('name')}
    description='Información acerca del evento'
    changePage={changePage}
    previousPage={previousPage}
  >
    <BasicInformationForm
      control={control}
      errors={errors}
      style={styles?.containerForm}
      getValues={getValues}
      watch={watch}
      setValue={setValue}
    />
  </StepContainer>
};

export const Step3 = withStyles(Step3Component, (theme) => ({
  containerForm: {
    flex: 5,
    paddingBottom: 12,
    marginTop: 12,
    justifyContent: 'space-around'
  }
}));