import React from 'react';
import LottieView from "lottie-react-native";

export const SeAnimation = ({src,url, ...rest}) => {
  return <LottieView source={url || src} autoPlay loop {...rest} />
};
