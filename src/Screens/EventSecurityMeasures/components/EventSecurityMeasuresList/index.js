import React from 'react';
import {FlatList} from "react-native";
import {EventSecurityMeasuresItem} from "../EventSecurityMeasuresItem";
import {SeAnimation} from "../../../../Shared/SeAnimation";

export const EventSecurityMeasuresList = ({securityMeasures, loadingSecurityMeasures ,securitiesActive, setSecuritiesActive}) => {

  return loadingSecurityMeasures ?
    <SeAnimation src={require('../../../../../assets/animations/loading-spinner.json')} />
    : <FlatList
      data={securityMeasures?.data?.securityMeasures}
      renderItem={({item}) =>
        <EventSecurityMeasuresItem
          item={item}
          eventSecurityMeasures={securitiesActive}
          setSecuritiesActive={setSecuritiesActive}
        />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles?.eventList}
      // onRefresh={getSecurityMeasures}
      refreshing={loadingSecurityMeasures}
    />
};

const styles = {
  eventList: {
    paddingVertical: 12,
  },
};
