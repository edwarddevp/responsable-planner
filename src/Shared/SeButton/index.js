import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {Pressable, Text, View} from "react-native";

const isFunction = (functionToCheck) => functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'

const SeButtonComponent = ({eva, children, baseColor, activeColor, style, onPress}) => {
  const {theme} = eva

  return <Pressable
    onPress={onPress}
    style={({pressed}) => [
      {
        backgroundColor: pressed
          ? activeColor || theme['color-primary-200']
          : baseColor || theme['color-primary-100']
      },
      style
    ]}
  >
    {
      ({pressed}) => isFunction(children) ? children({pressed}): children
    }
  </Pressable>
};

export const SeButton = withStyles(SeButtonComponent, (theme) => ({}));