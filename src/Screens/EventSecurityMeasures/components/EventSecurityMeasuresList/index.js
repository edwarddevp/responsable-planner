import React from 'react';
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import {EventSecurityMeasuresItem} from "../EventSecurityMeasuresItem";
import {SeAnimation} from "../../../../Shared/SeAnimation";
import {Text} from "@ui-kitten/components";
import {GuestItem} from "../../../Guests/components/GuestItem";

export const EventSecurityMeasuresList = (
  {
    securityMeasures,
    loadingSecurityMeasures,
    securitiesActive,
    setSecuritiesActive
  }) => {

  return loadingSecurityMeasures ?
    <SeAnimation src={require('../../../../../assets/animations/loading-spinner.json')}/>
    : <ScrollView>
      <Text style={styles?.title}>
        Medidas De Seguridad:
      </Text>
      <View style={styles?.eventList}>
        {
          securityMeasures?.data?.securityMeasures?.map(item =>
            <EventSecurityMeasuresItem
              key={item?.id}
              item={item}
              eventSecurityMeasures={securitiesActive}
              setSecuritiesActive={setSecuritiesActive}
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
  title:{
    fontSize:20,
    marginHorizontal: 26,
    paddingTop: 12,
  },
};
