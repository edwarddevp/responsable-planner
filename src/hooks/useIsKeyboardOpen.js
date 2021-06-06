import React from 'react';
import { Keyboard } from "react-native";

export const useIsKeyboardOpen = (props) => {
  const [ isKeyboardOpen, setIsKeyboardOpen ] = React.useState(false);

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    //  Don't forget to cleanup with remove listeners
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardOpen(true)
  }

  const _keyboardDidHide = () => {
    setIsKeyboardOpen(false)
  }

  return [
    isKeyboardOpen
  ]
};
