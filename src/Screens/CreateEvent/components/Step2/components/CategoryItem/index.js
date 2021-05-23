import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {Image, Pressable} from "react-native";

const CategoryItemComponent = ({eva, category, onChange, selected}) => {
  const {style: styles, theme} = eva
  console.log('%c selected', 'background: #222; color: #bada55',selected)
  return <Pressable
    onPress={() => {
      console.log('%c category?.id', 'background: #222; color: #bada55',category?.id)
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
    <Text style={styles?.textColor}>{category?.name}</Text>
    <Image
      style={styles.categoryImage}
      source={{uri: category?.img}}
    />
  </Pressable>
};

export const CategoryItem = withStyles(CategoryItemComponent, (theme) => ({
  card: {
    width: 350,
    height: 300,
    padding: 18,
    marginHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  selected: {
    borderWidth: 2,
    backgroundColor: theme['color-info-100'],
    borderColor: theme['color-info-500']
  },
  textColor: {
    color: 'black',
    fontSize: 18,
  },
  categoryImage: {
    height: 200,
    marginTop: 12
  },
}));