import React, {useState} from 'react';
import {Pressable, View} from "react-native";
import {Controller} from "react-hook-form";
import {Icon, Text, withStyles} from "@ui-kitten/components";
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns'

const SeInputDateComponent = (
  {
    eva,
    errors,
    control,
    label,
    validateAfterTouch,
    name,
    rightIcon,
    rightIconStyles,
    style,
    is24Hour,
    mode = 'date',
    size,
    required,
    ...rest
  }) => {
  const [show, setShow] = useState(false);
  const [modePicker, setModePicker] = useState(mode === 'datetime' ? 'date' : mode);
  const {style: styles, theme} = eva

  return <View style={style}>
    {label && <Text style={styles?.label}>{label}</Text>}
    {
      control &&
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <>
            {
              show && <DateTimePicker
                testID={name}
                value={value}
                mode={modePicker}
                is24Hour={is24Hour}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || value;
                  setShow(false);
                  onChange(currentDate);
                  if (event?.type === 'set') {
                    if (mode === 'datetime') {
                      if (modePicker === 'date') {
                        setModePicker('time')
                        setShow(true)
                      } else {
                        setModePicker('date')
                      }
                    }
                  }
                }}
                {...rest}
              />
            }
            <Pressable
              onPress={() => setShow(true)}
              style={({pressed}) => [
                (errors?.[name]) ?
                  {...styles?.button, ...styles?.borderColorRed} :
                  styles?.button,
                {
                  backgroundColor: pressed
                    ? theme['color-basic-control-transparent-500']
                    : theme['color-basic-control-transparent-300']
                }

              ]}
            >
              <Icon
                name={rightIcon || 'calendar-outline'}
                fill={
                  errors.name ?
                    theme['color-danger-500'] :
                    theme['color-primary-500']
                }
              />
              {
                mode === 'datetime' ? <>
                  <Text style={styles?.textCenter}>{format(value, 'MM/dd/yyyy')}</Text>
                  <View style={styles?.separator}/>
                  <Text style={styles?.textCenter}>{format(value, 'hh:mm aaa')}</Text>
                </> : mode === 'time' ?
                  <Text style={styles?.textCenter}>{format(value, 'hh:mm aaa')}</Text>
                  : <Text style={styles?.textCenter}>{format(value, 'MM/dd/yyyy')}</Text>
              }
            </Pressable>
          </>
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

export const SeInputDate = withStyles(SeInputDateComponent, (theme) => ({
  label: {
    fontSize: 16,
    marginBottom: 12
  },
  borderColorRed: {
    borderColor: theme['color-danger-500']
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme['color-basic-control-transparent-500'],
    backgroundColor: theme['color-basic-control-transparent-300'],
    borderRadius: 5
  },
  textCenter: {
    textAlign: 'center'
  },
  separator: {
    height: 4
  }
}));