import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {Countdown} from "../Countdown";
import {compareAsc} from "date-fns";
import {Text, View} from "react-native";
import {CheckmarkCircleOutline} from "../../../../Shared/icons";
import {applyLetterSpacing} from "../../../../lib/helper";

const EventTimeComponent = ({eva, event}) => {
  const {style: styles, theme} = eva
  const now = new Date()
  const end = new Date(event?.enddate)
  const start = new Date(event?.startdate)


  if (compareAsc(start, now) === 1) {
    return <View style={styles?.timeLabel}>
      <Text style={styles?.toStartText}>{applyLetterSpacing('Para el Inicio')}</Text>
      <Countdown startDate={event?.startdate}/>
    </View>
  } else if (compareAsc(now, end) === 1) {
    return <View style={styles?.completedLabel}>
      <Text style={styles?.completedText}>{applyLetterSpacing('Evento Finalizado')}</Text>
      <CheckmarkCircleOutline fill={theme['color-success-500']} style={styles?.completedIcon}/>
    </View>
  } else {
    return <View style={styles?.timeLabel}>
      <Text style={styles?.currentText}>{applyLetterSpacing('En Curso')}</Text>
      <Countdown startDate={event?.enddate}/>
    </View>
  }

};

export const EventTime = withStyles(EventTimeComponent, (theme) => ({
  completedLabel: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  completedText: {
    fontWeight: 'bold',
    color: 'white',
    marginRight:12
  },
  completedIcon: {
    width: 22,
    height: 22
  },
  timeLabel:{
    paddingTop: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toStartText: {
    fontWeight: 'bold',
    color: theme['color-primary-500'],
    fontSize: 10,
    marginBottom:2
  },
  currentText: {
    fontWeight: 'bold',
    color: theme['color-info-700'],
    fontSize: 10,
    marginBottom:2
  },
}));