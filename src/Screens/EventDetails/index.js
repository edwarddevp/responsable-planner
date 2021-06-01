import React from "react";
import {Button, Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {useApiRequest} from "../../hooks/useApiRequest";
import {EVENTS_ID} from "../../lib/apiRoutes";
import {Dimensions, Text, View} from "react-native";
import {DarkerImageBackground} from "../../Shared/DarkerImageBackground";

const {height} = Dimensions.get('window');

const EventDetailsDashboardScreen = ({route, navigation, eva}) => {
  const styles = eva?.style;
  const {eventId, eventName} = route?.params || {};
  const {data, call: getEvent, loading} = useApiRequest(EVENTS_ID(eventId))
  const event = data?.data?.events
  return (
    <MainLayout navigation={navigation} title='Safe Event Planner'>
      <Layout style={styles?.bg} level='3'>
        <DarkerImageBackground
          source={{uri: "https://reactjs.org/logo-og.png"}}
          contentContainerStyles={styles?.eventContainer}
          style={styles?.eventImg}
          overlayColor='rgba(0, 0, 0, .8)'
        >
          <Text style={styles?.eventName}>{eventName}</Text>
        </DarkerImageBackground>
        <View style={styles?.menuButtons}>
          <Button disabled={loading} status='basic' style={styles?.button}>
            Medidas de Seguridad
          </Button>
          <View>
            <Button disabled={loading} status='basic' style={styles?.button}>
              Tareas
            </Button>
            <View style={styles?.separatorH} />
            <Button disabled={loading} status='basic' style={styles?.button}>
              Editar
            </Button>
          </View>
        </View>
      </Layout>
    </MainLayout>
  );
};

export const EventDetailsDashboard = withStyles(EventDetailsDashboardScreen, (theme) => ({
  bg: {
    flex: 1,
    height: height
  },
  eventImg: {
    height: 200,
  },
  eventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventName: {
    color: 'white',
    fontSize: 28
  },
  menuButtons: {
    padding: 24
  },
  menuButtonsTwoColumns: {
    flexDirection: 'row'
  },
  button:{
    // backgroundColor:theme['color-basic-500'],
    // borderColor:theme['color-basic-500'],
    paddingVertical: 18,
    // width: '100%'
    alignSelf: "stretch"
  },
  separatorV:{
    height: 8
  },
  separatorH:{
    width: 8
  }
}));
