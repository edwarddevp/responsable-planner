import React, {useContext} from "react";
import {SafeAreaView} from "react-native";
import {Navbar} from "../../components/Navbar";
import {TopNavigationAction} from "@ui-kitten/components";
import {useStatusBarColor} from "../../hooks/useStatusBarColor";
import {AuthContext} from "../../Navigation/AuthProvider";
import {StatusBarBackground} from "../../Shared/StatusBarBackground";
import {MenuOutlineIcon, BackIcon, LogoutIcon} from "../../Shared/icons";


export const MainLayout = ({children, backButton, navigation, title}) => {
  // const themeContext = React.useContext(ThemeContext);
  useStatusBarColor()
  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex: 1,}}>
      <StatusBarBackground/>
      <Navbar
        title={title || 'MyApp'}
        renderLeftActions={() =>
          backButton ? (
            <TopNavigationAction icon={BackIcon} onPress={navigation?.goBack}/>
          ) : (
            <TopNavigationAction icon={MenuOutlineIcon} onPress={navigation?.toggleDrawer}/>
          )
        }
        renderRightActions={() => (
          <React.Fragment>
            {/*<TopNavigationAction icon={EditIcon}/>*/}
            <TopNavigationAction icon={LogoutIcon} onPress={logout}/>
          </React.Fragment>
        )}
      />

      {children}
    </SafeAreaView>
  );
};
