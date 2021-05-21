import React from 'react';
import {Button, Input, Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {Controller} from "react-hook-form";
import {PersonIcon} from "../../../../Shared/icons";

export const Step1Component = ({eva, control, nextPage, errors}) => {
  const styles = eva?.style
  return <View>
    <View>
      <Text>Siga los pasos para crear un evento</Text>
    </View>
    <View>
      <Text>Primero Ingrese por favor el nombre de su evento</Text>
    </View>
    <View>
      <Controller
        control={control}
        render={({fieldState: {isTouched}, field: {onChange, onBlur, value}}) => (
          <Input
            status={(errors.name && isTouched) ? 'danger' : 'control'}
            placeholder='Name'
            accessoryRight={PersonIcon}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{required: true}}
      />
    </View>
    <Button onPress={nextPage}>
      nextPage
    </Button>
  </View>
};

export const Step1 = withStyles(Step1Component, (theme) => ({}));