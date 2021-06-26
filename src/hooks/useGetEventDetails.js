import React, { useState, useEffect } from 'react';
import {useApiRequest} from "./useApiRequest";
import {EVENTS_ID} from "../lib/apiRoutes";
import {useScreenFocused} from "./useScreenFocused";

export const useGetEventDetails = (eventId) => {
  const {data, call: getEvent, loading} = useApiRequest(EVENTS_ID(eventId))
  useScreenFocused(()=>getEvent())

  return [
    data?.data?.event,
    loading
  ]
};
