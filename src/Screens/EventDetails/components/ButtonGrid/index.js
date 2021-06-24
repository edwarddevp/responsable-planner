import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {SeButton} from "../../../../Shared/SeButton";
import {Text, View} from "react-native";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {SeSeparator} from "../../../../Shared/Separator";
import {CheckmarkCircleOutline, PeopleOutline, SettingsOutline} from "../../../../Shared/icons";

const ButtonGridComponent = ({eva, navigation, eventId, event}) => {
  const {style: styles, theme} = eva

  const navigateToGuestsList = () => navigation.navigate('EVENT', {
    screen: 'GUESTS',
    params: {eventId, eventName: event?.name},
  });

  const navigateToTasksList = () => navigation.navigate('EVENT', {
    screen: 'TASKS',
    params: {eventId, eventName: event?.name},
  });

  const navigateToSecurityMeasures = () => navigation.navigate('EVENT', {
    screen: 'EVENT_SECURITY_MEASURES',
    params: {eventId, eventName: event?.name, event},
  });

  const navigateToEditEvent = () => navigation.navigate('EVENT', {
    screen: 'EDIT_EVENT',
    params: {eventId, eventName: event?.name, event},
  });

  return <>
    <SeButton
      onPress={navigateToSecurityMeasures}
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
      <SeButton onPress={navigateToGuestsList} style={styles?.subButton}>
        <PeopleOutline fill='#BE923B' style={styles?.icon}/>
        <Text style={styles?.securityMeasuresText}>
          Invitados
        </Text>
      </SeButton>
      <SeSeparator d='H' value={2}/>
      <SeButton onPress={navigateToTasksList} style={styles?.subButton}>
        <CheckmarkCircleOutline fill='#BE923B' style={styles?.icon}/>
        <Text style={styles?.securityMeasuresText}>
          Tareas
        </Text>
      </SeButton>
    </View>
    <SeSeparator value={2}/>
    <SeButton onPress={navigateToEditEvent} style={styles?.subButtonEdit}>
      <SettingsOutline fill='#BE923B' style={styles?.icon}/>
      <SeSeparator value={2} d='H'/>
      <Text style={styles?.securityMeasuresText}>
        Editar Evento
      </Text>
    </SeButton>
    <SeSeparator value={2}/>
  </>
};

export const ButtonGrid = withStyles(ButtonGridComponent, (theme) => ({
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
    marginTop: -70,
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
  gauge: {
    flex: 1,
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