import React from 'react';
import {Button, Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {StepContainer} from "../StepContainer";
import {SeInput} from "../../../../Shared/SeFields/SeInput";
import {SeSeparator} from "../../../../Shared/Separator";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {SeLinePercentage} from "../../../../Shared/SeLinePercentage";

const numberFormat = (num) => num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

const Step4Component = (
  {
    eva,
    control,
    nextPage,
    errors,
    trigger,
    previousPage,
    getValues,
    watch,
    setValue,
    loading
  }) => {
  const {style: styles, theme} = eva

  const leftAction = async () => {
    const validate = await trigger(["guestlimit"])
    if (validate) {
      const securityMeasuresValues = getValues('securityMeasureIds')?.includes("2")
      if(securityMeasuresValues){
        setValue("securityMeasureIds", getValues('securityMeasureIds').filter(measure => measure !== "2" ))
      }
      nextPage()
    }
  }

  const rightAction = async () => {
    const validate = await trigger(["guestlimit"])
    if (validate) {
      const securityMeasuresValues = getValues('securityMeasureIds')?.includes("2")
      if(!securityMeasuresValues){
        setValue("securityMeasureIds", [...getValues('securityMeasureIds'),"2"])
      }
      nextPage()
    }
  }

  const footerButtons = {
    leftAction,
    rightAction,
    loadingLeftAction: loading,
    leftButtonText: 'Limite Original',
    confirmButtonText: 'Limite Recomendado',
    gap: 1
  }


  return <StepContainer
    title={getValues('name')}
    description='Limite de Personas'
    loading={loading}
    previousPage={previousPage}
    footerButtons={footerButtons}
  >
    <View style={styles?.containerForm}>
      <SeInput
        name='guestlimit'
        control={control}
        errors={errors}
        label='Indique la capacidad maxima de personas que recibe el recinto:'
        placeholder='Limite de Personas'
        rightIcon='people'
        labelStyles={styles?.label}
        underlineColorAndroid='transparent'
        style={styles?.inputLabel}
        keyboardType="numeric"
        type='number'
        required
        maxLength={7}
      />
      {
        isNaN(watch('guestlimit'))?
          <Text style={styles?.required}>Ingrese Un Numero Valido</Text>: <>
          <SeSeparator/>
          <SeLinePercentage
            fill={40}
            fillLabel={numberFormat(`${Math.ceil(watch('guestlimit') * 0.4)}`)}
            maxNumber={`${numberFormat(`${watch('guestlimit')}`) || 0}`}
          />
          <SeSeparator/>
          <View style={styles?.flexRow}>
            <Text style={styles?.description}>Limite Recomendado:</Text>
            <Text style={styles?.recommendedLimit}>
              {`${numberFormat(`${Math.ceil(watch('guestlimit') * 0.4)}`)} personas`}
            </Text>
          </View>
            <SeSeparator/>
        </>
      }
      <Text style={styles?.description}>Para mayor seguridad la cantidad recomendada de personas que puede ingresar a un
        establecimiento se
        considera el 40% de la capacidad original del mismo</Text>
      <View/>
    </View>
  </StepContainer>
};

export const Step4 = withStyles(Step4Component, (theme) => ({
  required:{
    fontSize:18,
    textAlign:'center'
  },
  containerForm: {
    flex: 5,
    paddingBottom: 12,
    justifyContent: 'space-around',
  },
  flexRow: {
    flexDirection: 'row'
  },
  recommendedLimit: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  inputLabel: {
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    textAlign: 'justify'
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
  chart: {
    height: 200,
    backgroundColor: theme['color-basic-500'],
  },
}));