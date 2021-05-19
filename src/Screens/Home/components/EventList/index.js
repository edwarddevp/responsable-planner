import React from 'react';
import {FlatList, View} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS} from "../../../../lib/apiRoutes";
import {EventItem} from "../EventItem";

export const EventList = (props) => {
  const {data} = useApiRequest(EVENTS)
  console.log('%c data?.events', 'background: #222; color: #bada55',data)

  return <View style={styles?.eventList}>
    <FlatList
      data={data?.data?.events}
      renderItem={({item}) =>
        <EventItem item={item} />}
      keyExtractor={item => item.id}
      refreshing
    />
  </View>
};

export const styles= {
  title: {},
  eventList: {
    width: "100%",
    paddingTop: 24
    // height: 100,
    // backgroundColor: 'gray',
  },
};
