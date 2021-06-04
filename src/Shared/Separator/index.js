import React from 'react';
import {StyleSheet, View} from "react-native";

export const SeSeparator = ({d = 'V', value = 1}) => {
  const styles = StyleSheet.create({
    separatorV: {
      height: 8 * value
    },
    separatorH: {
      width: 8 * value
    }
  });

  return <View style={d === 'V'? styles?.separatorV:styles?.separatorH} />
};

