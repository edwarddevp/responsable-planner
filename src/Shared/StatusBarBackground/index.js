import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';

export const StatusBarBackground = (props) => {

  return <View style={[styles.statusBarBackground, props.style || {}]} />
};

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    backgroundColor: "white",
  }

})