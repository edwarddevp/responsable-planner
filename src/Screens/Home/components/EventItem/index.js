import React from 'react';
import {ImageBackground, Text, View} from "react-native";
import {withStyles, Button} from "@ui-kitten/components";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS} from "../../../../lib/apiRoutes";
import {ForwardIcon} from "../../../../Shared/icons";

const EventItemComponent = (
  {
    // categoryid = 1,
    // createdat = "2021-05-04T04:00:00.000Z",
    // description = "description",
    // direction = "calle falsa 123",
    // enddate = "2021-05-07T04:00:00.000Z",
    // guestlimit = 20,
    // id = 4,
    // isactive = true,
    name = "name 2",
    startdate = "2021-05-05T04:00:00.000Z",
    // securityLabel = 5,
    eva
  }) => {
  const styles = eva?.style;
  const {data} = useApiRequest(EVENTS)
  console.log('%c data', 'background: #222; color: #bada55', data)

  return <View style={styles?.eventItem}>
    <ImageBackground
      source={{uri: "https://reactjs.org/logo-og.png"}}
      style={styles.image}
    >
      <View style={styles?.topItem}>
        {/*<Text style={styles?.textColor}>{name}</Text>*/}
      </View>
      <View style={styles?.bottomItem}>
        <Text style={{...styles?.textColor, ...styles?.eventName}}>{name}</Text>
        <Text style={{...styles?.textColor, ...styles?.eventStartDate}}>{startdate}</Text>
      </View>

    </ImageBackground>
    <View style={styles?.bottomContainer}>
      <View style={styles?.bottomLeftContainer}>
        <View style={styles?.securityBadge}>
          <Text style={styles?.editText}>Dangerous</Text>
        </View>

      </View>
      <View style={styles?.bottomRightContainer}>
        <Text style={styles?.editText}>Event Details</Text>
        <ForwardIcon fill='#B6BECD' style={styles?.icon}/>
      </View>
    </View>
  </View>
};

export const EventItem = withStyles(EventItemComponent, (theme) => ({
  securityBadge:{

  },
  bottomLeftContainer:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    // borderRightWidth: 1,
    // borderRightColor: theme["color-basic-400"],
    backgroundColor: theme["color-danger-400"],
    padding:4
  },
  bottomRightContainer:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    marginLeft:5,
    padding:4
  },
  eventItem: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    marginHorizontal: 24,
    marginTop:0,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  padding:8
  },
  editText: {
    fontSize: 18
  },
  image: {
    height: 150.5,
    padding: 8,
  },
  topItem: {
    flex: 2,
    alignItems: 'flex-end'
  },
  bottomItem: {
    flex: 1,
    // alignSelf: 'flex-end',
    // alignItems: 'flex-end'
  },
  imgBg: {},
  textColor: {
    color: 'white'
  },
  eventName: {
    fontSize: 18
  },
  eventStartDate: {
    fontSize: 14
  },
}));

