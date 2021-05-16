import React, {useContext} from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Navbar } from "../../components/Navbar";
import { TopNavigationAction  } from "@ui-kitten/components";
import { MenuIcon, BackIcon, EditIcon } from "../../components/common/Icons";
import { useStatusBarColor } from "../../hooks/useStatusBarColor";
import {AuthContext} from "../../Navigation/AuthProvider";


export const MainLayout = ({ children, backButton, navigation }) => {
  // const themeContext = React.useContext(ThemeContext);
  useStatusBarColor()
  const {logout} = useContext(AuthContext);
 
  return (
    <SafeAreaView style={{
      flex: 1,
      marginTop: StatusBar.currentHeight
    }}>
      <Navbar
        title="MyApp"
        renderLeftActions={() =>
          backButton ? (
            <TopNavigationAction icon={BackIcon} onPress={navigation?.goBack} />
          ) : (
            <TopNavigationAction icon={MenuIcon} onPress={navigation?.toggleDrawer} />
          )
        }
        renderRightActions={() => (
          <React.Fragment>
            <TopNavigationAction icon={EditIcon} />
            <TopNavigationAction icon={EditIcon} onPress={logout}/>
          </React.Fragment>
        )}
      />

      {children}
    </SafeAreaView>
  );
};
