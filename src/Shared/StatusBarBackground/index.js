import React from 'react';
import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export const StatusBarBackground = (props) =>
  <View style={[styles.statusBarBackground, props.style || {}]}/>

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Constants.statusBarHeight,
  }

})