import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {View} from "react-native";

const SeEmptyBoxComponent = ({eva, flex}) => {
  const {style:styles} = eva

  return <View style={styles?.box(flex)} />
};

export const SeEmptyBox  = withStyles(SeEmptyBoxComponent, (theme) => ({
  box: (flex) => ({
    flex: flex || 1
  })
}));