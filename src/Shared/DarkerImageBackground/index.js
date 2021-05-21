import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {ImageBackground, View} from "react-native";

export const DarkerImageBackgroundComponent = ({children, eva, source, ...rest}) => {
  const styles = eva?.style
  return <ImageBackground source={source} {...rest}>
    <View style={styles?.innerFrame}>
      {children}
    </View>
  </ImageBackground>
};

export const DarkerImageBackground = withStyles(DarkerImageBackgroundComponent, (theme) => ({
  innerFrame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',

  },
}));