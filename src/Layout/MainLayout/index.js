import React, {useContext} from "react";
import {Navbar} from "../../components/Navbar";
import {TopNavigationAction} from "@ui-kitten/components";
import {AuthContext} from "../../Navigation/AuthProvider";
import {BackIcon, LogoutIcon} from "../../Shared/icons";
import {View} from "react-native";
import { StatusBar } from 'expo-status-bar';

export const MainLayout = ({children, backButton, backButtonAction, navigation, title}) => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={{flex: 1,}}>
      <StatusBar style="light" />
      <Navbar
        title={title || 'MyApp'}
        renderLeftActions={() =>
          backButton ?
            <TopNavigationAction icon={BackIcon} onPress={backButtonAction || navigation?.goBack}/> :
            null
        }
        renderRightActions={() => (
          <React.Fragment>
            {/*<TopNavigationAction icon={EditIcon}/>*/}
            <TopNavigationAction icon={LogoutIcon} onPress={logout}/>
          </React.Fragment>
        )}
      />

      {children}
    </View>
  );
};
