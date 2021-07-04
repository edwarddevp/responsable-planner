import React from 'react';
import {Icon, Input, Text, withStyles} from "@ui-kitten/components";
import {FlatList, Image, RefreshControl, ScrollView, View} from "react-native";
import {CategoryItem} from "../CategoryItem";
import {Controller} from "react-hook-form";
import {TasksItem} from "../../../../../Tasks/components/TasksItem";
import {SeSeparator} from "../../../../../../Shared/Separator";

export const CategoriesListComponent = ({eva, categories, style, control, errors}) => {
  const styles = eva?.style

  return <View style={style}>
    <ScrollView>
      <Controller
        control={control}
        render={({fieldState: {isTouched}, field: {onChange, onBlur, value}}) => (

            <FlatList
              data={categories}
              renderItem={({item}) =>
                <CategoryItem
                  category={item}
                  onChange={onChange}
                  selected={value === item?.id}
                />
              }
              keyExtractor={item => item.id.toString()}
              refreshing
              horizontal={false}
              numColumns={2}
              contentContainerStyle={styles?.categoriesList}
              ItemSeparatorComponent={SeSeparator}
            />
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
    </ScrollView>
  </View>
};

export const CategoriesList = withStyles(CategoriesListComponent, (theme) => ({
  categoriesList: {
    // marginVertical:6
  },
  whiteSpace: {
    flex: 4
  }
}));

// {
//   categories?.map((item, i) =>
//     <CategoryItem
//       key={item?.id || i}
//       category={{...item, img: "https://reactjs.org/logo-og.png"}}
//       onChange={onChange}
//       selected={value === item?.id}
//     />
//   )
// }