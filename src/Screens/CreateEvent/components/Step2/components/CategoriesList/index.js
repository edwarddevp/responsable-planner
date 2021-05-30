import React from 'react';
import {Icon, Input, Text, withStyles} from "@ui-kitten/components";
import {FlatList, Image, View} from "react-native";
import {CategoryItem} from "../CategoryItem";
import {Controller} from "react-hook-form";

export const CategoriesListComponent = ({eva, categories, style, control, errors}) => {
  const styles = eva?.style

  return <View style={style}>
    <Controller
      control={control}
      render={({fieldState: {isTouched}, field: {onChange, onBlur, value}}) => (
        <View style={styles?.categoriesList}>
          <FlatList
            data={categories}
            renderItem={({item}) =>
              <CategoryItem
                category={{...item, img: "https://reactjs.org/logo-og.png"}}
                onChange={onChange}
                selected={value === item?.id}
              />
            }
            keyExtractor={item => item.id.toString()}
            refreshing
            horizontal
            contentContainerStyle={styles?.categoriesList}
          />
          <View styles={styles?.whiteSpace}/>
        </View>
      )}
      name='categoryid'
      rules={{required: true}}
    />
    {
      errors?.categoryId &&
      <Text status='danger' style={styles?.errorMessage}>
        Seleccione una categoria.
      </Text>
    }

  </View>
};

export const CategoriesList = withStyles(CategoriesListComponent, (theme) => ({
  categoriesList: {
    height: '87%',
  },
  whiteSpace: {
    flex: 4
  }
}));