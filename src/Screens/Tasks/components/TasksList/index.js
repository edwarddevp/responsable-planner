import React from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {TasksItem} from "../TasksItem";
import {Text} from "@ui-kitten/components";

export const TasksList = ({title, data, navigation, getTasks, loading, setTaskToEdit}) => {
  return <ScrollView
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={getTasks}/>
    }
  >
    <View style={styles?.guestNumberContainer}>
      <Text style={styles?.title}>
        {title}:
      </Text>
      <Text style={styles?.title}>
        {data?.length}
      </Text>
    </View>
    <View style={styles?.eventList}>
    {
      data?.map(item=>
        <TasksItem
          key={item?.id}
          item={item}
          setTaskToEdit={setTaskToEdit}
          navigation={navigation}
          getTasks={getTasks}
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
