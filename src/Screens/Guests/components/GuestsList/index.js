import React from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {GuestItem} from "../GuestItem";
import {Text, withStyles} from "@ui-kitten/components";

export const GuestsListComponent = ({data, navigation, getGuests, loading, setGuestToEdit, guestTotal, isGuestLimit, eva}) => {
  const styles = eva?.style;
  return <ScrollView
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={getGuests}/>
    }
  >
    <View style={styles?.guestNumberContainer}>
      <Text style={styles?.title}>
        Lista de Invitados:
      </Text>
      <Text style={styles?.guestNumber(isGuestLimit)}>
        {data?.data?.guests?.length}/{guestTotal}
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

export const GuestsList = withStyles(GuestsListComponent, (theme) => ({
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
  },
  guestNumber: (isGuestLimit)=>({
    fontSize:18,
    color: isGuestLimit? theme['color-info-500'] : theme['color-basic-100']
  })
}));

