import React from 'react';
import {withStyles, Text, Icon} from "@ui-kitten/components";
import {Image, Linking, Pressable, View} from "react-native";
import {getImageSecurityCredits} from "../../../../../../lib/helper";

const SecurityMeasureSelectComponent = ({eva, securityMeasure, even, getValues, setValue, watch}) => {
  const {style: styles, theme} = eva

  const onPress = () => {
    const securityMeasuresValues = getValues('securityMeasureIds')?.includes(securityMeasure?.id)
    if (securityMeasuresValues) {
      setValue("securityMeasureIds", getValues('securityMeasureIds').filter(measure => measure !== securityMeasure?.id))
    } else {
      setValue("securityMeasureIds", [...getValues('securityMeasureIds'), securityMeasure?.id])
    }
  }

  const isSelected = watch('securityMeasureIds')?.includes(securityMeasure?.id)

  const {caption, captionLink} = getImageSecurityCredits(securityMeasure?.id)

  return <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles?.container,
      {
        backgroundColor: pressed
          ? theme['color-basic-600']
          : theme['color-basic-500']
      }
    ]}>
    {
      !even ? <>
        <Image style={styles?.img} source={require('./../../../../../../../assets/images/covid/covid-3.jpg')}/>
        <View style={styles?.actionContainer}>
          <View>
            <Text style={styles?.name}>{securityMeasure?.name}</Text>
            {/*<SeSeparator/>*/}
            <Text style={styles?.description} numberOfLines={6}
                  ellipsizeMode='tail'>{securityMeasure?.description}</Text>
          </View>

          {caption ? <Text
            style={styles?.caption}
            onPress={() => captionLink && Linking.openURL(captionLink)}
          >
            {caption}
          </Text>:<></>}
        </View>
      </> : <>
        <View style={styles?.actionContainer}>
          <View>
            <Text style={styles?.name}>{securityMeasure?.name}</Text>
            {/*<SeSeparator/>*/}
            <Text style={styles?.description} numberOfLines={6}
                  ellipsizeMode='tail'>{securityMeasure?.description}</Text>
          </View>
          {caption ? <Text
            style={styles?.caption}
            onPress={() => captionLink && Linking.openURL(captionLink)}
          >
            {caption}
          </Text>:<></>}
        </View>
        <Image style={styles?.img} source={require('./../../../../../../../assets/images/covid/covid-7.jpg')}/>
      </>
    }
    <View style={styles?.checkContainer}>
      <Icon fill={theme[isSelected ? 'color-success-500' : 'color-basic-500']} style={styles?.icon}
            name={isSelected ? "checkmark" : "minus"}/>
    </View>

  </Pressable>
};

export const SecurityMeasureSelect = withStyles(SecurityMeasureSelectComponent, (theme) => ({
  caption: {
    color: theme["color-basic-600"],
    fontSize: 5,
    alignSelf: 'flex-end'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme['color-basic-500'],
    shadowColor: theme["color-basic-transparent-500"],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  actionContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 4,
    color: 'black'
  },
  description: {
    fontSize: 10,
    textAlign: 'justify',
    paddingHorizontal: 4,
    color: 'black'
  },
  checkContainer: {
    position: 'absolute',
    top: -14,
    right: -14,
    backgroundColor: theme['color-basic-700'],
    background: 'red',
    borderRadius: 1000,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  },
}));