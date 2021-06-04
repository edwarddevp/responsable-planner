import React from "react";
import {Button, Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {useApiRequest} from "../../hooks/useApiRequest";
import {EVENTS_ID} from "../../lib/apiRoutes";
import {Dimensions, Pressable, ScrollView, Text, View} from "react-native";
import {DarkerImageBackground} from "../../Shared/DarkerImageBackground";
import {CheckmarkCircleOutline, PeopleOutline, SettingsOutline} from "../../Shared/icons";
import {SeButton} from "../../Shared/SeButton";
import {SeSeparator} from "../../Shared/Separator";
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const {height} = Dimensions.get('window');

const EventDetailsDashboardScreen = ({route, navigation, eva}) => {
  const {style: styles, theme} = eva;
  const {eventId, eventName} = route?.params || {};
  const {data, call: getEvent, loading} = useApiRequest(EVENTS_ID(eventId))
  const event = data?.data?.events

  return (
    <MainLayout navigation={navigation} title='Safe Event Planner'>
      <Layout style={styles?.container} level='3'>
        <ScrollView style={styles?.scrollView}>
          <DarkerImageBackground
            source={{uri: "https://reactjs.org/logo-og.png"}}
            contentContainerStyles={styles?.eventImgContainer}
            style={styles?.eventImg}
            overlayColor='rgba(0, 0, 0, .8)'
          >
            <Text style={styles?.eventName}>{eventName}</Text>
          </DarkerImageBackground>
          <SeButton
            baseColor={theme['color-primary-500']}
            activeColor={theme['color-primary-600']}
            style={styles?.securityMeasure}
          >
            <View style={styles?.securityMeasureTextContainer}>
              <Text style={styles?.securityMeasuresText}>
                Nivel de
              </Text>
              <Text style={styles?.securityMeasuresText}>
                Seguridad
              </Text>
            </View>
            <View style={styles?.separatorH}/>
            <View style={styles?.gauge}>
              <AnimatedCircularProgress
                size={120}
                width={3}
                backgroundWidth={20}
                fill={50}
                tintColor={theme['color-primary-300']}
                backgroundColor={theme['color-basic-700']}
                rotation={180}
              >
                {
                  (fill) => (
                    <Text>
                      {fill}
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
            </View>
            <View/>
          </SeButton>
          <SeSeparator value={2}/>
          <View style={styles?.twoColumns}>
            <SeButton style={styles?.subButton}>
              <PeopleOutline fill='#BE923B' style={styles?.icon}/>
              <Text style={styles?.securityMeasuresText}>
                Invitados
              </Text>
            </SeButton>
            <SeSeparator d='H' value={2}/>
            <SeButton style={styles?.subButton}>
              <CheckmarkCircleOutline fill='#BE923B' style={styles?.icon}/>
              <Text style={styles?.securityMeasuresText}>
                Tareas
              </Text>
            </SeButton>
          </View>
          <SeSeparator value={2}/>
          <SeButton style={styles?.subButtonEdit}>
            <SettingsOutline fill='#BE923B' style={styles?.icon}/>
            <SeSeparator value={2} d='H'/>
            <Text style={styles?.securityMeasuresText}>
              Editar Evento
            </Text>
          </SeButton>
          <SeSeparator value={2}/>
        </ScrollView>
      </Layout>
    </MainLayout>
  );
};

export const EventDetailsDashboard = withStyles(EventDetailsDashboardScreen, (theme) => ({
  container: {
    flex: 1,
    height: height
  },
  eventImg: {
    height: 350,
  },
  eventImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventName: {
    color: 'white',
    fontSize: 28
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  icon: {
    width: 52,
    height: 52
  },
  button: {
    paddingVertical: 18,
    alignSelf: "stretch"
  },
  securityMeasure: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 54,
    height: 200,
    marginTop: -50,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: theme["color-basic-transparent-500"],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  securityMeasuresText: {
    fontSize: 24,
    textAlign: 'center'
  },
  securityMeasureTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  gauge:{
    flex:1,
    justifyContent: 'center'
  },
  subButton: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
    height: 130,
    borderRadius: 8,
    shadowColor: theme["color-basic-transparent-500"],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  subButtonEdit: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    height: 130,
    borderRadius: 8,
    shadowColor: theme["color-basic-transparent-500"],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
}));
