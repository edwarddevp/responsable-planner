import React from 'react';
import {Pressable, View} from "react-native";
import {Layout, withStyles, Text} from "@ui-kitten/components";
import {format} from 'date-fns'
import {DarkerImageBackground} from "../../../../Shared/DarkerImageBackground";
import {ForwardIcon} from "../../../../Shared/icons";
import {getSecurityColorLevel} from "../../../../lib/helper";

const EventItemComponent = ({navigation, item, eva}) => {
  const {style: styles} = eva;
  const {id, enddate, name, startdate, securityValue, securityCategory} = item

  const formatDate = (date) => format(new Date(format(new Date(date), 'MM/dd/yyyy')), 'MM/dd/yyyy')

  const navigateToEventDetails = () => navigation.navigate('DASHBOARD', {eventId:item?.id});

  const securityColor = getSecurityColorLevel(securityValue)

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
                <Text style={{...styles?.textColor, ...styles?.eventName}} numberOfLines={1}>{name}</Text>
                <Text style={{...styles?.textColor, ...styles?.eventStartDate}}>{
                  formatDate(startdate) === formatDate(enddate) ?
                    formatDate(startdate) :
                    `${formatDate(startdate)} - ${formatDate(enddate)}`
                }</Text>
              </View>
            </View>
          </DarkerImageBackground>
          <Layout style={styles?.bottomContainer} level="1">
            <View style={styles?.bottomLeftContainer(securityColor)}>
              {/*<Layout style={styles?.securityBadge}>*/}
              <Text style={styles?.editText}>{securityCategory}</Text>
              {/*</Layout>*/}
            </View>
            <Layout style={styles?.bottomRightContainer}>
              <Text style={styles?.editText}>Detalles</Text>
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
  bottomLeftContainer: (securityColor) => ({
    flex: 1.5,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 6,
    backgroundColor:theme[securityColor]
  }),
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
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    padding: 8
  },
  editText: {
    textAlign:'center',
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

