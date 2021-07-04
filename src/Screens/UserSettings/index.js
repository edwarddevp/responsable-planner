import React, {useContext} from 'react';
import {Layout, ViewPager, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {UserSettingsMenu} from "./components/UserSettingsMenu";
import {UserSettingsForm} from "./components/UserSettingsForm";
import {useBackButtonAction} from "../../hooks/useBackButtonAction";
import {AuthContext} from "../../Navigation/AuthProvider";

const UserSettingsComponent = ({eva, navigation, route}) => {
  const styles = eva?.style
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {user, logout} = useContext(AuthContext)

  const onBackPress = () => {
    if (selectedIndex === 1) {
      setSelectedIndex(0);
      return true;
    } else {
      return false;
    }
  };

  useBackButtonAction(onBackPress,selectedIndex)

  return <MainLayout
    navigation={navigation}
    title="Configuración"
    backButton
    backButtonAction={selectedIndex === 1? ()=>setSelectedIndex(0):null}
  >
    <Layout style={styles?.bg} level='3'>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        swipeEnabled={false}
      >
        <UserSettingsMenu
          setSelectedIndex={setSelectedIndex}
          navigation={navigation}
          logout={logout}
        />
        <UserSettingsForm
          selectedIndex={selectedIndex}
          navigation={navigation}
          user={user}
        />
      </ViewPager>


    </Layout>
  </MainLayout>
};

export const UserSettings = withStyles(UserSettingsComponent, (theme) => ({
  bg: {
    flex: 1,
    // paddingHorizontal: 26,
    // paddingVertical: 24,
    // backgroundColor: theme["color-basic-300"],
  },
}));