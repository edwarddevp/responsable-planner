import React from 'react';
import {View} from "react-native";
import {Controller} from "react-hook-form";
import {IndexPath, Select, SelectItem, Text, withStyles} from "@ui-kitten/components";
import {ArrowDown} from "../../icons";
import DropDownPicker from 'react-native-dropdown-picker';

const SeSelectComponent = (
  {
    eva,
    data = [],
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
    pattern,
    maxLength,
    errorText,
    trim,
    ...rest
  }) => {
  const {style: styles, theme} = eva
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [open, setOpen] = React.useState(false);


  return <View style={style}>
    <Text style={{...styles?.label, ...labelStyles}}>{label}</Text>
    {
      control &&
      <Controller
        control={control}
        render={({fieldState: {isTouched}, field: {onChange, onBlur, value}}) => (
          <DropDownPicker
            open={open}
            value={value}
            items={data?.map(item => ({label: item?.name, value: item?.id}))}
            setOpen={setOpen}
            setValue={onChange}
            theme="DARK"
            style={
              validateAfterTouch ?
                (errors?.[name] && isTouched) ?
                  [styles?.select, styles?.borderColorRed] :
                  styles?.select :
                styles?.select
            }
            labelStyle={styles?.labelStyle}
          />
        )}
        name={name}
        rules={{required, pattern: pattern?.pattern, maxLength}}
      />
    }
    {
      errors?.[name] &&
      <Text status='danger' style={styles?.errorMessage}>
        {
          errorText ?
            errorText(errors?.[name]) :
            errors?.[name]?.type === 'maxLength' ?
              'Limite Excedido.' :
              errors?.[name]?.type === 'pattern' ?
                pattern?.errorMsg || 'Invalid Pattern' :
                'Campo Requerido.'
        }
      </Text>
    }
  </View>
};

export const SeSelect = withStyles(SeSelectComponent, (theme) => ({
  label: {
    fontSize: 16,
    marginBottom: 12
  },
  borderColorRed: {
    borderColor: theme['color-danger-500']
  },
  select: {
    paddingHorizontal: 16,
    height: 40,
    borderWidth: 1,
    borderColor: theme['color-basic-control-transparent-500'],
    backgroundColor: theme['color-basic-control-transparent-300'],
    borderRadius: 5
  },
  labelStyle: {
    color: 'white'
  }
}));