import React from "react";
import {Navbar} from "../../components/Navbar";
import {TopNavigationAction} from "@ui-kitten/components";
import {BackIcon} from "../../Shared/icons";
import {View} from "react-native";
import {StatusBar} from 'expo-status-bar';
import {MenuNavbar} from "./accessories/MenuNavbar";

export const MainLayout = ({children, backButton, backButtonAction, navigation, title, event}) => {
  return (
    <View style={{flex: 1,}}>
      <StatusBar style="light"/>
      <Navbar
        title={title || 'MyApp'}
        renderLeftActions={() =>
          backButton ?
            <TopNavigationAction icon={BackIcon} onPress={backButtonAction || navigation?.goBack}/> :
            null
        }
        renderRightActions={()=><MenuNavbar event={event}/>}
      />
      {children}
    </View>
  );
};
