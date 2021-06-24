import React from "react";
import {Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {EventSecurityMeasuresList} from "./components/EventSecurityMeasuresList";

const EventSecurityMeasuresScreen = ({navigation, eva, route}) => {
  const {bg} = eva?.style;
  const {eventId, eventName, event} = route?.params || {};

  return (
    <MainLayout navigation={navigation} title={eventName}>
      <Layout style={bg} level='3'>
        <EventSecurityMeasuresList
          event={event}
          navigation={navigation}
          eventId={eventId}
        />
      </Layout>
    </MainLayout>
  );
};

export const EventSecurityMeasures = withStyles(EventSecurityMeasuresScreen, (theme) => ({
  bg: {
    flex: 1,
    // backgroundColor: theme["color-basic-300"],
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: theme["color-basic-500"],
  },
}));
