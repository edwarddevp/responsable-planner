import React from 'react';
import {View} from "react-native";
import {Controller} from "react-hook-form";
import {Icon, Input, Text, withStyles} from "@ui-kitten/components";

const SeInputComponent = (
  {
    eva,
    errors,
    control,
    label,
    placeholder,
    validateAfterTouch,
    name,
    rightIcon,
    rightIconStyles,
    style,
    labelStyles,
    required,
    ...rest
  }) => {
  const {style: styles, theme} = eva
  return <View style={style}>
    <Text style={{...styles?.label,...labelStyles}}>{label}</Text>
    {
      control &&
      <Controller
        control={control}
        render={({fieldState: {isTouched}, field: {onChange, onBlur, value}}) => (
          <Input
            status={validateAfterTouch ? (errors?.[name] && isTouched) ? 'danger' : 'control' : 'control'}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            style={(errors?.[name]) ? styles?.borderColorRed : {}}
            accessoryRight={(props) =>
              rightIcon ?
                <Icon
                  name={rightIcon}
                  fill={
                    errors.name ?
                      theme['color-danger-500'] :
                      theme['color-primary-500']
                  }
                  {...props}
                /> : null
            }
            {...rest}
          />
        )}
        name={name}
        rules={{required: required}}
      />
    }
    {
      errors?.[name] &&
      <Text status='danger' style={styles?.errorMessage}>
        Campo Requerido.
      </Text>
    }
  </View>
};

export const SeInput = withStyles(SeInputComponent, (theme) => ({
  label: {
    fontSize: 16,
    marginBottom: 12
  },
  borderColorRed: {
    borderColor: theme['color-danger-500']
  },
}));