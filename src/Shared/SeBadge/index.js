import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {Text, View} from "react-native";

const SeBadgeComponent = ({eva, children, style, textStyles, bg}) => {
  const styles = eva?.style
  return <View>
    <View style={{...styles?.badge(bg), ...style}}>
      <Text style={{...styles?.text, ...textStyles}}>
        {children}
      </Text>
    </View>
  </View>
};

export const SeBadge = withStyles(SeBadgeComponent, (theme) => ({
  badge: (bg) => ({
    padding: 12,
    backgroundColor: bg || theme['color-primary-500'],
    borderRadius: 18
  }),
  text: {
    fontWeight:'bold',
    color:'white',
  }
}));