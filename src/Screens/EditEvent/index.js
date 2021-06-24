import React from 'react';
import {Layout, ViewPager, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {EditEventMenu} from "./components/EditEventMenu";
import {EditEventForm} from "./components/EditEventForm";
import {useBackButtonAction} from "../../hooks/useBackButtonAction";

const EditEventComponent = ({eva, navigation, route}) => {
  const styles = eva?.style
  const {eventId, eventName, event} = route?.params || {};
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    title={eventName}
    backButton
    backButtonAction={selectedIndex === 1? ()=>setSelectedIndex(0):null}
  >
    <Layout style={styles?.bg} level='3'>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        swipeEnabled={false}
      >
        <EditEventMenu
          setSelectedIndex={setSelectedIndex}
          eventId={eventId}
          navigation={navigation}
        />
        <EditEventForm
          eventId={eventId}
          selectedIndex={selectedIndex}
          event={event}
          navigation={navigation}
        />
      </ViewPager>


    </Layout>
  </MainLayout>
};

export const EditEvent = withStyles(EditEventComponent, (theme) => ({
  bg: {
    flex: 1,
    // paddingHorizontal: 26,
    // paddingVertical: 24,
    // backgroundColor: theme["color-basic-300"],
  },
}));