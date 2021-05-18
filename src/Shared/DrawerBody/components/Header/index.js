import React, {useContext} from 'react'
import {ImageBackground, Platform, StatusBar, StyleSheet, Text, View} from "react-native";
import {drawerAvatarBg} from "../../../../lib/constants";
import {Avatar, Divider} from "@ui-kitten/components";

export const Header = ({user}) => (
  <React.Fragment>
    <ImageBackground
      style={styles.header}
      source={{uri: drawerAvatarBg}}
    >
      <View style={styles?.logoContainer}>
        <View style={styles?.avatarImgContainer}>
          <Avatar style={styles?.avatarImg} source={{uri: 'https://robohash.org/edward?set=set3'}}/>
        </View>
      </View>
      <View style={styles?.userNameContainer}>
        <Text numberOfLines={1} style={styles?.userName}>{user?.name}</Text>
      </View>

    </ImageBackground>
    <Divider/>
  </React.Fragment>
);

const styles = StyleSheet.create({
  header: {
    height: 180,
    alignItems: 'center',
    padding: 0,
    marginTop: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
  },
  logoContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
  },
  avatarImgContainer: {
    borderRadius: 100,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: "#DC2D2D",
  },
  avatarImg: {
    width: 80,
    height: 80
  },
  userNameContainer: {
    padding: 8,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  userName: {
    flex: 1,
    paddingLeft: 5,
    color: 'white',
    fontSize: 18
  },
  eventsCount: {
    flex: 1,
    color: 'white',
    fontSize: 14
  }
});