import React from "react";
import {Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {Dimensions, ScrollView} from "react-native";
import {ButtonGrid} from "./components/ButtonGrid";
import {BackgroundImage} from "./components/BackgroundImage";
import {useGetEventDetails} from "../../hooks/useGetEventDetails";
import {SeAnimation} from "../../Shared/SeAnimation";

const {height} = Dimensions.get('window');

const EventDetailsDashboardScreen = ({route, navigation, eva}) => {
  const {style: styles} = eva;
  const {eventId, refresh} = route?.params || {};
  const [event, loading, getEvent, error] = useGetEventDetails(eventId, refresh)

  return (
    <MainLayout navigation={navigation} title='Safe Event Planner' event={(loading || error)? false : event} backButton>
      <Layout style={styles?.container} level='3'>
        {
          loading ?
            <SeAnimation src={require('../../../assets/animations/loading.json')} /> :
            error?
              <SeAnimation src={require('../../../assets/animations/empty-file.json')} /> :
              <ScrollView style={styles?.scrollView}>
              <BackgroundImage
                event={event}
              />
              <ButtonGrid
                navigation={navigation}
                eventId={event?.id}
                event={event}
                getEvent={getEvent}
              />
            </ScrollView>
        }
      </Layout>
    </MainLayout>
  );
};

export const EventDetailsDashboard = withStyles(EventDetailsDashboardScreen, (theme) => ({
  container: {
    flex: 1,
    height: height
  },

}));
