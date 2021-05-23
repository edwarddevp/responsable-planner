import React from 'react';
import {Button, withStyles} from "@ui-kitten/components";
import {View} from "react-native";

export const FooterButtonsComponent = ({eva, rightAction, leftAction, style}) => {
  const styles = eva?.style
  return <View style={style}>
    <Button status='basic' onPress={leftAction} style={styles?.goBackButton}>
      Volver
    </Button>
    <Button onPress={rightAction} style={styles?.nextButton}>
      Siguiente
    </Button>
  </View>
};

export const FooterButtons = withStyles(FooterButtonsComponent, (theme) => ({
  goBackButton:{
    backgroundColor:theme['color-basic-500'],
    borderColor:theme['color-basic-500'],
    paddingVertical: 18,
    width: 120
  },
  nextButton: {
    paddingVertical: 18,
    width: 120
  },
}));