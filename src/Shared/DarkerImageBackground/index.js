import React from 'react';
import {ImageBackground, View} from "react-native";

export const DarkerImageBackground = ({children, eva, source, overlayColor, contentContainerStyles, ...rest}) =>
  <ImageBackground source={source} {...rest}>
    <View style={{
      flex: 1,
      backgroundColor: overlayColor || 'rgba(0, 0, 0, .7)',
      ...contentContainerStyles
    }}>
      {children}
    </View>
  </ImageBackground>

