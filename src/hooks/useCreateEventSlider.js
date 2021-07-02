import React, {useEffect} from 'react';
import {useApiRequest} from "./useApiRequest";
import {CATEGORIES, EVENTS, SECURITYMEASURES} from "../lib/apiRoutes";
import {useIsFocused} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {DEBUG} from "@env"
import {addDays} from "date-fns";

export const useCreateEventSlider = ({reset, navigation}) => {
  const {call: createEvent} = useApiRequest(EVENTS, {
    skip: true,
    method: 'POST'
  })
  const {data: categories, loading: loadingCategories} = useApiRequest(CATEGORIES)
  const {data: securityMeasures, loading: loadingSecurityMeasures} = useApiRequest(SECURITYMEASURES)
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    setSelectedIndex(0)
    setLoading(false)
    reset(DEBUG ? {
      name: '',
      description: '',
      guestlimit: "50",
      direction: '',
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
      categoryid: undefined,
      securityMeasureIds: [],
    } : {
      name: '',
      description: '',
      guestlimit: "50",
      direction: '',
      startdate: new Date(),
      enddate: addDays(new Date(), 3),
      categoryid: undefined,
      securityMeasureIds: [],
    })
  }, [isFocused]);

  const onSubmit = async (values) => {
    setLoading(true);
    const response = await createEvent({
      name:values?.name,
      description:values?.description,
      guestlimit: parseInt(values?.guestlimit),
      direction:values?.direction,
      startdate:values?.startdate,
      enddate:values?.enddate,
      categoryid:values?.categoryid,
      securityMeasureIds:values?.securityMeasureIds,
    });

    if (!response?.success) {
      setLoading(false);
      Toast.show({
        text1: `Error ${response?.errors?.error?.[0]}`,
        type: 'error'
      });
    } else {
      navigation && navigation.navigate('HOME');
      Toast.show({
        text1: `Evento Creado`,
        type: 'success'
      });
    }
  };

  const nextPage = () => {
    setSelectedIndex(index => index + 1)
  }

  const previousPage = (fromButton) => {
    if (selectedIndex === 0) {
      fromButton && navigation && navigation?.goBack()
      return false
    } else {
      setSelectedIndex(selectedIndex - 1)
      return true
    }
  }

  return {
    data: {
      categories: categories?.data?.categories,
      loadingCategories,
      securityMeasures: securityMeasures?.data?.securityMeasures,
      loadingSecurityMeasures
    },
    nextPage,
    previousPage,
    onSubmit,
    selectedIndex,
    setSelectedIndex,
    loading
  }
};
