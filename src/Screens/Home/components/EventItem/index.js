import React from 'react';
import {Pressable, View} from "react-native";
import {Layout, withStyles, Text} from "@ui-kitten/components";
import {format} from 'date-fns'
import {DarkerImageBackground} from "../../../../Shared/DarkerImageBackground";
import {ForwardIcon} from "../../../../Shared/icons";

const EventItemComponent = ({navigation, item, eva}) => {
  const {style: styles} = eva;
  const {id, enddate, name, startdate} = item

  const formatDate = (date) => format(new Date(format(new Date(date), 'MM/dd/yyyy')), 'MM/dd/yyyy')

  const navigateToEventDetails = () => navigation.navigate('DASHBOARD', {eventId:item?.id});

  return <Layout style={styles?.eventItem}>
    <Pressable onPress={navigateToEventDetails}>
      {({pressed}) => (
        <>
          <DarkerImageBackground source={{uri: "https://reactjs.org/logo-og.png"}} style={styles?.image}>
            <View style={styles?.imageContainer(pressed)}>
              <View style={styles?.topItem}>
                {/*<Text style={styles?.textColor}>{name}</Text>*/}
              </View>
              <View style={styles?.bottomItem}>
                <Text style={{...styles?.textColor, ...styles?.eventName}}>{name}</Text>
                <Text style={{...styles?.textColor, ...styles?.eventStartDate}}>{
                  formatDate(startdate) === formatDate(enddate) ?
                    formatDate(startdate) :
                    `${formatDate(startdate)} - ${formatDate(enddate)}`
                }</Text>
              </View>
            </View>
          </DarkerImageBackground>
          <Layout style={styles?.bottomContainer}>
            <View style={styles?.bottomLeftContainer}>
              {/*<Layout style={styles?.securityBadge}>*/}
              <Text style={styles?.editText}>Dangerous</Text>
              {/*</Layout>*/}
            </View>
            <Layout style={styles?.bottomRightContainer} level="1">
              <Text style={styles?.editText}>Event Details</Text>
              <ForwardIcon fill='#B6BECD' style={styles?.icon}/>
            </Layout>
          </Layout>

        </>
      )}
    </Pressable>
  </Layout>
}

export const EventItem = withStyles(EventItemComponent, (theme) => ({
  securityBadge: {},
  bottomLeftContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 6,
    backgroundColor: theme["color-danger-800"]
  },
  bottomRightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  eventItem: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    marginHorizontal: 20,
    marginVertical: 12,
    overflow: 'hidden',
    shadowColor: theme["color-basic-transparent-500"],
    shadowOffset: {
      width: 0,
      height: 5,
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
    padding: 8
  },
  editText: {
    fontSize: 16
  },
  image: {
    height: 150.5,
    flex: 1
  },
  imageContainer: (pressed) => ({
    padding: 8,
    flex: 1,
    backgroundColor: pressed
      ? theme['color-basic-transparent-500']
      : 'transparent'
  }),
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

