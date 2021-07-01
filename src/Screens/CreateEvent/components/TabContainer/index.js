import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {DarkerImageBackground} from "../../../../Shared/DarkerImageBackground";
import {Dimensions, KeyboardAvoidingView, ScrollView, View} from "react-native";

const {height} = Dimensions.get('window');

const TabContainerComponent = ({eva, children, source}) => {
  const styles = eva?.style
  return <DarkerImageBackground style={styles.darkerImageBackground} source={source} overlayColor='rgba(0, 0, 0, .5)'>
    <KeyboardAvoidingView behavior="height" style={styles?.keyboardAvoidingView}>
      <ScrollView >
        <View style={styles.view}>
          {children}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  </DarkerImageBackground>
};

export const TabContainer = withStyles(TabContainerComponent, (theme) => ({
  darkerImageBackground: {
    height: height,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  view: {
    paddingVertical: 32,
    // minHeight: height,
    height: height,
    justifyContent:'space-around',
    flex: 1,
  }
}));