import React, {useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";

export const useScreenFocused = (action, returnEffect) => {
  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    action(isFocused)
    return returnEffect
  }, [isFocused]);

  return [isFocused]
};
