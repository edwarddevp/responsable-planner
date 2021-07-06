import React from 'react';
import {withStyles} from "@ui-kitten/components";
import {Text, View} from "react-native";
import {ArrowDownward} from "../icons";

const SeLinePercentageComponent = (
  {
    eva,
    style,
    height,
    fill = 100,
    initialNumber,
    maxNumber,
    fillLabel,
    fillInnerLabel,
    numberOfLinesPointer
  }) => {
  const {style: styles, theme} = eva

  return <View style={{...styles?.container(height), ...style}}>
    <View style={styles?.lineContainer}>
      <View style={styles?.fillLine(fill)}>
        <View style={styles?.pointerContainerLocation}>
          <View style={styles?.pointerContainer}>
            <ArrowDownward fill='white' style={styles?.pointer}/>
            <Text style={styles?.pointerLabel(fill)} numberOfLines={1}>{fillLabel || '10000%'}</Text>
          </View>
        </View>
        <Text style={styles?.labelInnerFill}>{fillInnerLabel || `${fill}%`}</Text>
      </View>
      <View style={styles?.legend}>
        <Text style={styles?.label}>{initialNumber || '0'}</Text>
        <Text style={styles?.label}>{maxNumber || '100'}</Text>
      </View>
    </View>
  </View>
};

export const SeLinePercentage = withStyles(SeLinePercentageComponent, (theme) => ({
  container: (height) => ({
    height: height || 70,
    padding: 16
  }),
  lineContainer: {
    borderWidth: 1,
    borderColor: theme['color-primary-500'],
    flex: 1,
    backgroundColor: theme['color-basic-800'],
  },
  pointerContainerLocation: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-end',
    top: -24,
    width: 24,
    right: -12
  },
  pointerContainer: {
    position: 'relative',
  },
  pointer: {
    width: 24,
    height: 24
  },
  pointerLabel: (fill) => {
    const position = fill > 50 ? {
      top: -24,
      left: '-70%',
      textAlign:'center',
      // backgroundColor:'#000'
    } : {
      top: -2,
      left: 24,
    }
    return {
      position: 'absolute',
      fontSize: 16,
      marginBottom: 12,
      color: 'white',
      flex: 1,
      width: 58,
      ...position
    }
  },
  fillLine: (fill) => ({
    width: `${fill}%`,
    height: '100%',
    backgroundColor: theme['color-primary-500'],
    position: 'relative',
    justifyContent: 'center'
  }),
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    color: 'white'
  },
  labelInnerFill: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
}));