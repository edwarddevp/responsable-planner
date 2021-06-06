import React from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {GuestItem} from "../GuestItem";
import {Text} from "@ui-kitten/components";

export const GuestsList = ({data, navigation, getGuests, loading, setGuestToEdit}) => {
  return <ScrollView
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={getGuests}/>
    }
  >
    <View style={styles?.guestNumberContainer}>
      <Text style={styles?.title}>
        Lista de Invitados:
      </Text>
      <Text style={styles?.title}>
        {data?.data?.guests?.length}
      </Text>
    </View>
    <View style={styles?.eventList}>
    {
      data?.data?.guests?.map(item=>
        <GuestItem
          key={item?.id}
          item={item}
          setGuestToEdit={setGuestToEdit}
          navigation={navigation}
          getGuests={getGuests}
        />
      )
    }
    </View>
  </ScrollView>
};

const styles = {
  eventList: {
    paddingVertical: 12,
  },
  guestNumberContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal: 26,
    paddingTop: 12,
  },
  title:{
    fontSize:20
  }
};
