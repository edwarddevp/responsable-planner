import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {SeButton} from "../../../../Shared/SeButton";
import {Text, View} from "react-native";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {SeSeparator} from "../../../../Shared/Separator";
import {CheckmarkCircleOutline, PeopleOutline, SettingsOutline} from "../../../../Shared/icons";
import {getSecurityColorLevel} from "../../../../lib/helper";

const ButtonGridComponent = ({eva, navigation, eventId, event, getEvent}) => {
  const {style: styles, theme} = eva

  const navigateToGuestsList = () => navigation.navigate('GUESTS', {
      eventId,
      eventName: event?.name,
      guestTotal: event?.securitymeasuresids?.includes(2) ? event?.recommendedGuestsTotal : event?.guestlimit
    },
  );

  const navigateToTasksList = () => navigation.navigate('TASKS', {eventId, eventName: event?.name},
  );

  const navigateToSecurityMeasures = () => navigation.navigate('EVENT_SECURITY_MEASURES', {
      eventId,
      eventName: event?.name,
      eventSecurityMeasuresIds: event?.securitymeasuresids?.filter(measure => measure),
      getEvent
    },
  );

  const navigateToEditEvent = () => navigation.navigate('EDIT_EVENT', {
    eventId,
    eventName: event?.name,
    event,
    getEvent
  });

  const gaugeColor = getSecurityColorLevel(event?.securityValue)

  return <>
    <SeButton
      onPress={navigateToSecurityMeasures}
      baseColor={theme['color-primary-500']}
      activeColor={theme['color-primary-600']}
      style={styles?.securityMeasure}
    >
      <View style={styles?.securityMeasureTextContainer}>
        <View style={styles?.securityMeasureTextContainer}>
          <Text style={styles?.securityMeasuresText}>
            Nivel de
          </Text>
          <Text style={styles?.securityMeasuresText}>
            Seguridad
          </Text>
        </View>
        <View style={styles?.securityMeasureTextSecurityContainer}>
          <Text style={styles?.securityMeasuresSubText}>
            Su evento es condiderado:
          </Text>
          <Text style={styles?.securityMeasuresSecurityText}>
            {event?.securityCategory}
          </Text>
        </View>
      </View>
      <View style={styles?.separatorH}/>
      <View style={styles?.gauge}>
        <AnimatedCircularProgress
          size={140}
          width={10}
          backgroundWidth={30}
          fill={event?.securityValue}
          tintColor={theme[gaugeColor || 'color-primary-300']}
          backgroundColor={theme['color-basic-700']}
          rotation={180}
        >
          {
            (fill) => (
              <Text>
                {Math.round(fill)}%
              </Text>
            )
          }
        </AnimatedCircularProgress>
        <Text style={styles?.securityMeasuresMoreDetails}>
          more details...
        </Text>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    lineHeight: 25,
  },
  securityMeasuresSubText: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 16,
  },
  securityMeasuresSecurityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4
  },
  securityMeasuresMoreDetails: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'right',
    color: theme['color-basic-700']
  },
  securityMeasureTextContainer: {
    flex: 1,
  },
  securityMeasureTextSecurityContainer: {
    flex: 2,
    marginTop: 16
  },
  gauge: {
    flex: 1,
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