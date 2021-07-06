import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {StepContainer} from "../StepContainer";
import {SecurityMeasureSelect} from "./components/SecurityMeasureSelect";
import {SeSeparator} from "../../../../Shared/Separator";

const Step6Component = (
  {
    eva,
    nextPage,
    previousPage,
    getValues,
    setValue,
    loading,
    securityMeasures,
    watch,
    confirmButtonText
  }) => {
  const {style: styles, theme} = eva

  return <StepContainer
    title={getValues('name')}
    description='Seleccione las medidas de seduridad que cumple su evento'
    loading={loading}
    changePage={nextPage}
    previousPage={previousPage}
    footerButtons={{
      confirmButtonText: confirmButtonText
    }}
  >
    <View style={styles?.containerForm}>
      <SecurityMeasureSelect securityMeasure={securityMeasures?.[0]} getValues={getValues} setValue={setValue} watch={watch} />
      <SeSeparator value={2} />
      <SecurityMeasureSelect securityMeasure={securityMeasures?.[1]} getValues={getValues} setValue={setValue} watch={watch} even/>
      <SeSeparator value={2} />
      <SecurityMeasureSelect securityMeasure={securityMeasures?.[2]} getValues={getValues} setValue={setValue} watch={watch} />
    </View>
  </StepContainer>
};

export const Step6 = withStyles(Step6Component, (theme) => ({
  containerForm: {
    flex: 5,
    paddingBottom: 12,
    justifyContent: 'space-around',
  },
  twoColumnsButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: theme['color-basic-500'],
    borderColor: theme['color-basic-500'],
  },
  buttonRecommended: {
    backgroundColor: theme['color-info-500'],
    borderColor: theme['color-info-500'],
    color: 'white',
    // width: 150
  },
  description: {
    flex: 1,
    lineHeight: 24,
    fontSize: 15,
    textAlign: 'justify'
  },
}));