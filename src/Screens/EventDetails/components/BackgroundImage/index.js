import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {DarkerImageBackground} from "../../../../Shared/DarkerImageBackground";
import {Text, View} from "react-native";
import {EventTime} from "../EventTime";

const BackgroundImageComponent = ({eva, event, eventName}) => {
  const styles = eva?.style
  //Img to check
  return <DarkerImageBackground
    source={{uri: event?.categoryImg}}
    contentContainerStyles={styles?.eventImgContainer}
    style={styles?.eventImg}
    overlayColor='rgba(0, 0, 0, .8)'
  >
    <View style={styles?.topImg}>
      <View/>
      <View>
        <EventTime event={event}/>
      </View>
    </View>
    <View style={styles?.centerImg}>
      <Text style={styles?.eventName}>{eventName || event?.name}</Text>
    </View>
  </DarkerImageBackground>
};

export const BackgroundImage = withStyles(BackgroundImageComponent, (theme) => ({
  eventImg: {
    height: 350,
  },
  eventImgContainer: {
    paddingVertical: 8
  },
  eventName: {
    color: 'white',
    fontSize: 28,
    textAlign:'center'
  },
  topImg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  centerImg: {
    flex: 2,
    paddingHorizontal: 32
  },
}));