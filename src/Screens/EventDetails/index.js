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
  const eventRoute = route?.params || {};
  const [event, loading] = useGetEventDetails(eventRoute?.id)

  return (
    <MainLayout navigation={navigation} title='Safe Event Planner'>
      <Layout style={styles?.container} level='3'>
        {
          loading ?
            <SeAnimation src={require('../../../assets/animations/loading.json')} /> :
            <ScrollView style={styles?.scrollView}>
              <BackgroundImage
                event={event}
              />
              <ButtonGrid
                navigation={navigation}
                eventId={event?.id}
                event={event}
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
