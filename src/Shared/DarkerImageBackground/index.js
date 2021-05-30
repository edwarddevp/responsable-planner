import React from 'react';
import {ImageBackground, View} from "react-native";

export const DarkerImageBackground = ({children, eva, source, overlayColor, ...rest}) =>
  <ImageBackground source={source} {...rest}>
    <View style={{
      flex: 1,
      backgroundColor: overlayColor || 'rgba(0, 0, 0, .7)',
    }}>
      {children}
    </View>
  </ImageBackground>

