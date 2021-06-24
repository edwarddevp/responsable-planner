import React, { useState, useEffect } from 'react';
import {useApiRequest} from "./useApiRequest";
import {EVENTS_ID} from "../lib/apiRoutes";
import {useScreenFocused} from "./useScreenFocused";

export const useGetEventDetails = (eventId,refreshEvent, eventRoute) => {
  const {data, call: getEvent, loading} = useApiRequest(EVENTS_ID(eventId))
  const [event,setEvent] = useState(eventRoute || {})

  // const resetEventData = () => {
  //   if (refreshEvent) {
  //     getEvent()
  //   }
  // }
  useScreenFocused(getEvent)

  useEffect(()=>{
    if(data?.data?.event){
      setEvent(data?.data?.event)
    }
  },[data])

  return [
    event,
    loading
  ]
};
