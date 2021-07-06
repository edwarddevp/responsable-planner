import React from 'react';
import {useFocusEffect} from "@react-navigation/native";
import {BackHandler} from "react-native";

export const useBackButtonAction = (action,...rest) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => action && action()

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [...rest])
  );

};
