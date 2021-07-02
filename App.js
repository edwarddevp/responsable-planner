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
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  const [loading, user, isAppFirstLaunched, setIsAppFirstLaunched] = useAppLoading()

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
      <ApplicationProvider
        {...eva}
        theme={{
          ...eva["dark"],
          ...customTheme
        }}
        customMapping={mapping}
      >
        <Providers
          user={user}
          isAppFirstLaunched={isAppFirstLaunched}
          setIsAppFirstLaunched={setIsAppFirstLaunched}
        />
        <Toast ref={(ref) => Toast.setRef(ref)}/>
      </ApplicationProvider>
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
