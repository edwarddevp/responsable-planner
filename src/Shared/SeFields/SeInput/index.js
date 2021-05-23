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
    validateAfterTouch,
    name,
    rightIcon,
    rightIconStyles,
    ...rest
  }) => {
  const {style: styles, theme} = eva
  return <View style={styles?.fieldContainer}>
    <Text style={styles?.label}>{label}</Text>
    {
      control &&
      <Controller
        control={control}
        render={({fieldState: {isTouched}, field: {onChange, onBlur, value}}) => (
          <Input
            status={validateAfterTouch ? (errors?.[name] && isTouched) ? 'danger' : 'control' : 'control'}
            placeholder={label}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            style={(errors?.[name]) ? styles?.borderColorRed : {}}
            accessoryRight={(props) =>
              <Icon
                name={rightIcon}
                fill={
                  errors.name ?
                    theme['color-danger-500'] :
                    theme['color-primary-500']
                }
                {...props}
              />
            }
            {...rest}
          />
        )}
        name={name}
        rules={{required: true}}
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
  fieldContainer: {
    flex:1
  },
  label: {
    fontSize: 16,
    marginBottom: 12
  },
  borderColorRed: {
    borderColor: theme['color-danger-500']
  },
}));