import React, {useEffect, useRef, useState} from 'react';
import {withStyles} from "@ui-kitten/components";
import {Button, Text, View} from "react-native";
import {getDayOfYear, parseISO} from 'date-fns'
import {useScreenFocused} from "../../../../hooks/useScreenFocused";

const MILLISECONDS_OF_A_SECOND = 1000;
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

const CountdownComponent = ({eva, startDate, label}) => {
  const styles = eva?.style
  const clock = new Date(startDate); // Obtener la fecha y almacenar en clock
  const [daysLeft, setDaysLeft] = useState(0)
  const [hoursLeft, setHoursLeft] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const interval = useRef()

  useEffect(() => {
    handleTimeLeft()
    interval.current = window.setInterval(handleTimeLeft, 1); // Frecuencia de actualización
    return () => {
      clearInterval(interval.current);
    }
  }, [])


  const handleTimeLeft = () => {
    const now = new Date();
    const duration = clock - now  

    const day = Math.floor(duration / MILLISECONDS_OF_A_DAY);
    const hours = Math.floor((duration % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
    const minutes = Math.floor((duration % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
    const seconds = Math.floor((duration % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);


    const hoursFormat = hours < 10? '0'+ hours : hours;
    const minutesFormat = minutes < 10? '0'+ minutes : minutes;
    const secondsFormat = seconds < 10? '0'+ seconds : seconds;

    if (day !== daysLeft) setDaysLeft(day)
    if (hoursFormat !== hoursLeft) setHoursLeft(hoursFormat)
    if (minutesFormat !== minutesLeft) setMinutesLeft(minutesFormat)
    if (secondsFormat !== secondsLeft) setSecondsLeft(secondsFormat)

  }

  return <View style={styles?.countDown}>
    <View style={styles?.period}>
      <View style={styles?.timeUnit}>
        <Text style={styles?.time}>{daysLeft.toString()}</Text>
      </View>
      <Text style={styles?.timeLabel}>Days</Text>
    </View>
    <Text style={styles?.separator}>:</Text>
    <View style={styles?.period}>
      <View style={styles?.timeUnit}>
        <Text style={styles?.time}>{hoursLeft.toString()}</Text>
      </View>
      <Text style={styles?.timeLabel}>Hrs</Text>
    </View>
    <Text style={styles?.separator}>:</Text>
    <View style={styles?.period}>
      <View style={styles?.timeUnit}>
        <Text style={styles?.time}>{minutesLeft.toString()}</Text>
      </View>
      <Text style={styles?.timeLabel}>Mins</Text>
    </View>
    <Text style={styles?.separator}>:</Text>
    <View style={styles?.period}>
      <View style={styles?.timeUnit}>
        <Text style={styles?.time}>{secondsLeft.toString()}</Text>
      </View>
      <Text style={styles?.timeLabel}>Secs</Text>
    </View>

  </View>
};

export const Countdown = withStyles(CountdownComponent, (theme) => ({
  countDown: {
    flexDirection: 'row'
  },
  period: {
    alignItems: 'center'
  },
  timeLabel: {
    color: 'white',
    fontSize: 8
  },
  time: {
    color: 'white',
    fontSize: 12
  },
  separator: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 6,
  },
  timeUnit: {}
}));