import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {Image, Linking, View} from "react-native";

const SeImageWithCaptionComponent = ({eva, source, width, height, caption, captionLink, style, containerStyles, ...rest}) => {
  const {style:styles, theme} = eva

  return <View style={{...styles?.container, ...containerStyles}}>
    <Image
      source={source}
      style={style || styles?.img(width,height)}
      {...rest}
    />
    {caption ? <Text
      style={styles?.caption}
      onPress={() => captionLink && Linking.openURL(captionLink)}
    >
      {caption}
    </Text>: <></>}
  </View>
};

export const SeImageWithCaption  = withStyles(SeImageWithCaptionComponent, (theme) => ({
  container:{
    flex:1
  },
  img: (width,height) => ({
    width: width || '100%',
    height: height || 230,
  }),
  caption: {
    color: theme["color-basic-600"],
    fontSize: 8
  },
}));