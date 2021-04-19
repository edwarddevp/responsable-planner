import React, { useEffect } from 'react'
import { StatusBar } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { ThemeContext } from '../config/theme-context';

export const useStatusBarColor = () => {
    const themeContext = React.useContext(ThemeContext);
    const theme = useTheme();
  
    useEffect(() => {
      if(Platform.OS === 'android') {
          StatusBar.setBackgroundColor(theme['background-basic-color-1']);
          StatusBar.setBarStyle(themeContext?.theme === 'light'? 'dark-content' : 'light-content');
      }
  }, [theme]);

  return []
}
