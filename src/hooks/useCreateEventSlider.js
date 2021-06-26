import React, {useEffect} from 'react';
import {useApiRequest} from "./useApiRequest";
import {CATEGORIES, EVENTS} from "../lib/apiRoutes";
import {useIsFocused} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {DEBUG} from "@env"
import {addDays} from "date-fns";

export const useCreateEventSlider = ({reset, navigation}) => {
  const {call: createEvent} = useApiRequest(EVENTS, {
    skip: true,
    method: 'POST'
  })
  const {data} = useApiRequest(CATEGORIES)
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    setSelectedIndex(0)
    setLoading(false)
    reset(DEBUG ?{
      name: 'Test 1',
      description: '',
      guestlimit: 5,
      direction: 'Avenida Falsa',
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
      categoryid: 8,
      securityMeasureIds: ["1","2","8"],
    } : {
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
    })
  }, [isFocused]);

  const onSubmit = async (values) => {
    setLoading(true);
    const response = await createEvent(values);

    if (!response?.success) {
      setLoading(false);
      Toast.show({
        text1:`Error ${response?.errors?.error?.[0]}`,
        type:'error'
      });
    } else {
      navigation && navigation.navigate('HOME');
      Toast.show({
        text1:`Evento Creado`,
        type:'success'
      });
    }
  };

  const nextPage = () => {
    setSelectedIndex(index => index + 1)
  }

  const previousPage = () => {
    setSelectedIndex(index => index - 1)
  }

  return {
    data: {
      categories: data?.data?.categories,
    },
    nextPage,
    previousPage,
    onSubmit,
    selectedIndex,
    setSelectedIndex,
    loading,
  }
};
