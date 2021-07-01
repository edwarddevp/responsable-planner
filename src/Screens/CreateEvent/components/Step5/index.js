import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {StepContainer} from "../StepContainer";
import {SeSeparator} from "../../../../Shared/Separator";
import {SeImageWithCaption} from "../../../../Shared/SeImageWithCaption";
import {getImageSecurityCredits} from "../../../../lib/helper";

const Step5Component = (
  {
    eva,
    nextPage,
    previousPage,
    getValues,
    setValue,
    loading
  }) => {
  const {style: styles, theme} = eva

  const leftAction = async () => {
    const securityMeasuresValues = getValues('securityMeasureIds')?.includes("6")
    if (securityMeasuresValues) {
      setValue("securityMeasureIds", getValues('securityMeasureIds').filter(measure => measure !== "6"))
    }
    nextPage()
  }

  const rightAction = async () => {
    const securityMeasuresValues = getValues('securityMeasureIds')?.includes("6")
    if (!securityMeasuresValues) {
      setValue("securityMeasureIds", [...getValues('securityMeasureIds'), "6"])
    }
    nextPage()
  }

  const footerButtons = {
    leftAction,
    rightAction,
    loadingLeftAction: loading,
    leftButtonText: 'Saltar',
    confirmButtonText: 'Usar de mascarilla',
    gap: 1
  }

  return <StepContainer
    title={getValues('name')}
    description='El uso de mascarilla'
    loading={loading}
    previousPage={previousPage}
    footerButtons={footerButtons}
  >
    <SeSeparator value={2}/>
    <View style={styles?.containerForm}>
      <SeImageWithCaption
        source={require('./../../../../../assets/images/covid/covid-6.jpg')}
        {...getImageSecurityCredits(2)}
      />
      <SeSeparator value={2}/>
      <Text style={styles?.description}>
        Debería usar mascarilla, incluso si no se siente enfermo. Esto se debe a que múltiples estudios han demostrado
        que las personas con COVID-19 que nunca presentan síntomas (asintomáticas) y aquellas que aún no presentan
        síntomas (presintomáticas) también pueden propagar el virus a otras personas.
      </Text>
      <View/>
    </View>
  </StepContainer>
};

export const Step5 = withStyles(Step5Component, (theme) => ({
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