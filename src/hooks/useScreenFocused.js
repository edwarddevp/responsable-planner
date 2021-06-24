import React, {useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";

export const useScreenFocused = (action) => {
  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    action(isFocused)
  }, [isFocused]);

  return [isFocused]
};
