import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {ImageBackground, Pressable} from "react-native";
import {SeSeparator} from "../../../../../../Shared/Separator";
import {CheckCircle} from "../../../../../../Shared/icons";

const CategoryItemComponent = ({eva, category, onChange, selected}) => {
  const {style: styles, theme} = eva
//Img to check
  return <>
    <Pressable
      onPress={() => {
        onChange(category?.id)
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? theme['color-basic-400']
            : 'white'
        },
        selected ? {...styles?.card,...styles?.selected} : styles.card
      ]}
    >
      <ImageBackground
        style={styles.categoryImage}
        source={{uri: category?.img}}
      >
        {selected && <CheckCircle fill={theme['color-info-500']} style={styles.checkIcon}/>}
      </ImageBackground>
      <Text style={styles?.textColor}>{category?.name}</Text>
    </Pressable>
    <SeSeparator value={2}/>
  </>
};

export const CategoryItem = withStyles(CategoryItemComponent, (theme) => ({
  checkIcon: {
    width: 28,
    height: 28,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2
  },
  card: {
    // width: 350,
    // height: 160,
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.58,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selected: {
    borderWidth: 2,
    // backgroundColor: theme['color-info-500'],
    borderColor: theme['color-info-500']
  },
  textColor: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 6,
    marginVertical: 6
  },
  categoryImage: {
    height: 120,
    position: 'relative',
    backgroundColor: theme['color-basic-800']
  },
}));