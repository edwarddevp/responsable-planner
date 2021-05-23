import React from 'react';
import {View} from "react-native";
import {SeInput} from "../../../../../../Shared/SeFields/SeInput";
import {withStyles} from "@ui-kitten/components";

export const BasicInformationFormComponent = ({eva, control, errors, style}) => {
  const {style: styles, theme} = eva
  return <View style={style}>
    <View style={styles?.twoColumns}>
      <SeInput
        name='name'
        control={control}
        errors={errors}
        label='Fecha de inicio'
        rightIcon='person'
      />
      <View style={styles?.separator}/>
      <SeInput
        name='name'
        control={control}
        errors={errors}
        label='Fecha de cierre'
        rightIcon='person'
      />
    </View>
  </View>
};

export const BasicInformationForm = withStyles(BasicInformationFormComponent, (theme) => ({
  twoColumns: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  separator: {
    width:12
  },
  label: {
    fontSize: 18,
    marginBottom: 12
  },
  errorMessage: {
    marginTop: 8
  },
}));