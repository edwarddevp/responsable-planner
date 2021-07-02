import React, {useEffect} from 'react';
import {FlatList, Text, View} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS} from "../../../../lib/apiRoutes";
import {EventItem} from "../EventItem";
import {useIsFocused} from "@react-navigation/native";
import {SeAnimation} from "../../../../Shared/SeAnimation";

export const EventList = ({navigation}) => {
  const {data, call: getEvents, loading} = useApiRequest(EVENTS)
  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    getEvents()
  }, [isFocused]);

  return (data?.data?.events?.length || loading) ?
    <FlatList
      data={data?.data?.events}
      renderItem={({item}) =>
        <EventItem item={item} navigation={navigation}/>}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles?.eventList}
      onRefresh={getEvents}
      refreshing={loading}
    /> :
    <SeAnimation src={require('../../../../../assets/animations/box-empty.json')}/>
};

const styles = {
  eventList: {
    paddingVertical: 12,
  }
};
