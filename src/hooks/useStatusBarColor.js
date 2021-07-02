import React, { useEffect } from 'react'
import { StatusBar } from 'react-native';
import { useTheme } from '@ui-kitten/components';

export const useStatusBarColor = (color,isLight) => {
    const theme = useTheme();
  
    useEffect(() => {
      changeColor()
  }, [theme]);

    const changeColor = () => {
      if(Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme[ color || 'background-basic-color-1']);
        StatusBar.setBarStyle(!isLight? 'dark-content' : 'light-content');
      }
    }

  return [
    changeColor
  ]
}
