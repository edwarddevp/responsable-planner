import React, {useEffect} from "react";
import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {default as customTheme} from "./src/theme/theme.json";
import {default as mapping} from "./src/theme/mapping.json";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import Providers from "./src/Navigation";
import {ThemeContext} from "./src/config/theme-context";
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';
import {useAppLoading} from "./src/hooks/useAppLoading";

export default () => {
  LogBox.ignoreLogs(['Remote debugger']);
  LogBox.ignoreLogs(['Reanimated 2']);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const [theme, setTheme] = React.useState("dark");
  const  [loading, user, isAppFirstLaunched] = useAppLoading()

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };  

  let [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded || loading) {
    return <AppLoading/>;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva[theme],
             ...customTheme
          }}
          customMapping={mapping}
        >
          <Providers
            user={user}
            isAppFirstLaunched={isAppFirstLaunched}
          />
          <Toast ref={(ref) => Toast.setRef(ref)}/>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
