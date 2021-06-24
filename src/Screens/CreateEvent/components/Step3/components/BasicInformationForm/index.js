import React, {useEffect} from 'react';
import {View} from "react-native";
import {SeInput} from "../../../../../../Shared/SeFields/SeInput";
import {Text, withStyles} from "@ui-kitten/components";
import {SeInputDate} from "../../../../../../Shared/SeFields/SeInputDate";
import {compareAsc} from "date-fns";

export const BasicInformationFormComponent = ({eva, control, errors, style, getValues, watch, setValue}) => {
  const {style: styles} = eva
  const date = new Date()
  const watchStartDate = watch('startdate', date)

  useEffect(()=>{
    const validate = compareAsc(watchStartDate,getValues('enddate'))
    if(validate > 0){
      setValue('enddate',watchStartDate)
    }
  },[watchStartDate])

  return <View style={style}>
    <View style={styles?.paddingH18}>
      <Text style={styles?.label}>Fecha del evento:</Text>
      <View style={styles?.twoColumns}>
        <SeInputDate
          name='startdate'
          control={control}
          errors={errors}
          size='small'
          mode='datetime'
          minimumDate={date}
          style={styles?.startDate}
          required
        />
        <SeInputDate
          name='enddate'
          control={control}
          errors={errors}
          size='small'
          mode='datetime'
          minimumDate={watchStartDate}
          style={styles?.endDate}
          required
        />
      </View>
      <View style={styles?.separator} />
        <SeInput
          name='direction'
          control={control}
          errors={errors}
          label='Ubicación:'
          placeholder='Ubicación'
          rightIcon='map-outline'
        />
      <View style={styles?.separator} />
        <SeInput
          multiline
          textStyle={{ minHeight: 64 }}
          name='description'
          control={control}
          errors={errors}
          label='Descripcion:'
          placeholder='Descripcion'
        />
    </View>
  </View>
};

export const BasicInformationForm = withStyles(BasicInformationFormComponent, (theme) => ({
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  paddingH18:{
    paddingHorizontal: 18
  },
  startDate:{
    flex:1,
    paddingRight:18
  },
  endDate:{
    flex:1,
    paddingLeft:18
  },
  flex1: {
    flex:1
  },
  separator: {
    height: 12
  },
  label: {
    fontSize: 16,
    marginBottom: 12
  },
  errorMessage: {
    marginTop: 8
  },
}));