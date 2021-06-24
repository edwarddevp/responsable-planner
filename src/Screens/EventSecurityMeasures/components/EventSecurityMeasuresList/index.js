import React, {useEffect} from 'react';
import {FlatList} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS, EVENTS_EVENTID_SECURITYMEASURES, SECURITYMEASURES} from "../../../../lib/apiRoutes";
import {EventSecurityMeasuresItem} from "../EventSecurityMeasuresItem";
import {useIsFocused} from "@react-navigation/native";

export const EventSecurityMeasuresList = ({navigation, eventId, event}) => {
  const {data: eventSecurityMeasures, call: getEventSecurityMeasures, loading: loadingEventSecurityMeasures} = useApiRequest(EVENTS_EVENTID_SECURITYMEASURES(eventId))
  const {data: securityMeasures, call: getSecurityMeasures, loading: loadingSecurityMeasures} = useApiRequest(SECURITYMEASURES)

  // check if screen is focused
  const isFocused = useIsFocused();


  useEffect(() => {
    getSecurityMeasures()
    getEventSecurityMeasures()
  }, [isFocused]);

  return <FlatList
    data={securityMeasures?.data?.securityMeasures}
    renderItem={({item}) =>
      <EventSecurityMeasuresItem
        item={item}
        eventId={eventId}
        eventSecurityMeasures={eventSecurityMeasures?.data?.securityMeasure}
      />}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles?.eventList}
    // onRefresh={getSecurityMeasures}
    refreshing={loadingEventSecurityMeasures || loadingSecurityMeasures}
  />
};

const styles = {
  eventList: {
    paddingVertical: 12,
  },
};
