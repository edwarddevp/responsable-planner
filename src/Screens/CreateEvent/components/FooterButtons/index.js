import React from 'react';
import {Button, Spinner, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {SeSeparator} from "../../../../Shared/Separator";

const buttonSize = (size, buttonWidth) => {
  let buttonStyle = {}
  if (size === 'md') buttonStyle.paddingVertical = 18
  if (size === 'sm') buttonStyle.paddingVertical = 8
  if (size === 'xs') buttonStyle.paddingVertical = 4
  if (buttonWidth) {
    buttonStyle.width = buttonWidth
  }
  return buttonStyle
}

export const FooterButtonsComponent = (
  {
    eva,
    rightAction,
    leftAction,
    style,
    loading,
    size = 'md',
    buttonWidth,
    gap,
    confirmButtonText,
    submitButton = true
  }) => {
  const styles = eva?.style
  return <View style={style}>
    {
      leftAction &&
      <>
        <Button
          disabled={loading}
          status='basic'
          onPress={leftAction}
          style={{...styles?.button(size, buttonWidth), ...styles?.goBackButton}}
        >
          Volver
        </Button>
        {gap && <SeSeparator d='H' value={gap}/>}
      </>
    }
    {gap && <SeSeparator d='H' value={gap}/>}
    {
      submitButton && <Button
      disabled={loading}
      onPress={rightAction}
      style={{...styles?.button(size), ...styles?.nextButton}}
    >
      {
        loading ?
          <Spinner/> :
          confirmButtonText || "Siguiente"
      }

    </Button>
    }
  </View>
};

export const FooterButtons = withStyles(FooterButtonsComponent, (theme) => ({
  button: buttonSize,
  goBackButton: {
    backgroundColor: theme['color-basic-500'],
    borderColor: theme['color-basic-500'],
  },
  nextButton: {},
}));