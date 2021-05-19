import React from 'react';
import {FlatList} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS} from "../../../../lib/apiRoutes";
import {EventItem} from "../EventItem";

export const EventList = (props) => {
  const {data} = useApiRequest(EVENTS)

  return <FlatList
    data={data?.data?.events}
    renderItem={({item}) =>
      <EventItem item={item}/>}
    keyExtractor={item => item.id.toString()}
    refreshing
    contentContainerStyle={styles?.eventList}
  />
};

const styles = {
  eventList: {
    paddingVertical: 12,
  },
};
