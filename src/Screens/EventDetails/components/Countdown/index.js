import React, {useEffect, useRef, useState} from 'react';
import {withStyles} from "@ui-kitten/components";
import {Button, Text, View} from "react-native";
import {getDayOfYear, parseISO} from 'date-fns'
import {useScreenFocused} from "../../../../hooks/useScreenFocused";

const CountdownComponent = ({eva, startDate, label}) => {
  const styles = eva?.style
  const clock = new Date(startDate); // Obtener la fecha y almacenar en clock
  const [daysLeft, setDaysLeft] = useState(0)
  const [hoursLeft, setHoursLeft] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const interval = useRef()

  const clearCountInterval = (isFocused) => {
    if (isFocused) {
      handleTimeLeft()
      interval.current = window.setInterval(handleTimeLeft, 1); // Frecuencia de actualización
    } else {
      clearInterval(interval.current);
    }
  }

  useScreenFocused(clearCountInterval, () => {
    clearInterval(interval.current);
  })

  const handleTimeLeft = () => {
    const now = new Date();
    const day = (getDayOfYear(clock)) - getDayOfYear(now);
    const hours = (clock.getHours() + 24) - now.getHours();
    const minutes = (clock.getMinutes() + 60) - now.getMinutes();
    const seconds = (clock.getSeconds() + 60) - now.getSeconds();

    if (day !== daysLeft) setDaysLeft(day)
    if (hours !== hoursLeft) setHoursLeft(hours)
    if (minutes !== minutesLeft) setMinutesLeft(minutes)
    if (seconds !== secondsLeft) setSecondsLeft(seconds)

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