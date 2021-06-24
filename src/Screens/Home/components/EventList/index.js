import React, {useEffect} from 'react';
import {FlatList} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS} from "../../../../lib/apiRoutes";
import {EventItem} from "../EventItem";
import {useIsFocused} from "@react-navigation/native";

export const EventList = ({navigation}) => {
  const {data, call: getEvents, loading} = useApiRequest(EVENTS)
  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    getEvents()
  }, [isFocused]);

  return <FlatList
    data={data?.data?.events}
    renderItem={({item}) =>
      <EventItem item={item} navigation={navigation}/>}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles?.eventList}
    onRefresh={getEvents}
    refreshing={loading}
  />
};

const styles = {
  eventList: {
    paddingVertical: 12,
  },
};
