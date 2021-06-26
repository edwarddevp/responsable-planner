import React, {useEffect} from 'react';
import {useApiRequest} from "./useApiRequest";
import {EVENTS_ID} from "../lib/apiRoutes";

export const useGetEventDetails = (eventId, refresh) => {
  const {data, call: getEvent, loading} = useApiRequest(EVENTS_ID(eventId))

  useEffect(() => {
    getEvent()
  }, [])

  return [
    data?.data?.event,
    loading,
    getEvent
  ]
};
