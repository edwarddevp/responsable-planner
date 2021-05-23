import React from 'react';
import {useApiRequest} from "./useApiRequest";
import {CATEGORIES} from "../lib/apiRoutes";

export const useCreateEventSlider = (props) => {
  const {data} = useApiRequest(CATEGORIES)

  return {
    categories: data?.categories
  }
};
