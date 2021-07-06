import React, {useEffect, useState} from 'react';
import {useApiRequest} from "./useApiRequest";
import {EVENTS_EVENTID_SECURITYMEASURES, SECURITYMEASURES} from "../lib/apiRoutes";
import {useDisclosure} from "./useDisclosure";
import {compareTwoArrays} from "../lib/helper";
import Toast from "react-native-toast-message";

export const useSecurityMeasures = (navigation, params) => {
  const {eventId, eventName, eventSecurityMeasuresIds, getEvent} = params;
  const {
    data: securityMeasures,
    call: getSecurityMeasures,
    loading: loadingSecurityMeasures
  } = useApiRequest(SECURITYMEASURES)
  const {call: handleSecurityMeasure} = useApiRequest(EVENTS_EVENTID_SECURITYMEASURES(eventId), {
    skip: true,
    method: 'POST'
  })
  const [securitiesActive, setSecuritiesActive] = useState(eventSecurityMeasuresIds) // medidas de seguridad guardadas local
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [isChanged, setIsChanged] = useState(false) //  medidas de seguridad cambiadas
  const {isOpen, onClose, onOpen} = useDisclosure() // confirm alert

  useEffect(() => {
    getSecurityMeasures()
  }, [])

  useEffect(() => {
    setIsChanged(!compareTwoArrays(eventSecurityMeasuresIds, securitiesActive))
  }, [securitiesActive]);

  const submitSecurityMeasures = async () => {
    setLoadingSubmit(true)
    const res = await handleSecurityMeasure({
      "securityMeasureIds": securitiesActive
    })
    if (res?.success) {
      await getEvent()
      setLoadingSubmit(false)
      onClose()
      Toast.show({
        text1: `Medidas de Seguridad guardadas`,
        type: 'success'
      });
      // navigation.navigate('DASHBOARD', {eventId: eventId});
    } else {
      setLoadingSubmit(false)
    }
  }


  return {
    onSubmit: submitSecurityMeasures,
    eventList: {
      securitiesActive,
      setSecuritiesActive,
      securityMeasures,
      loadingSecurityMeasures,
      eventSecurityMeasuresIds,
    },
    eventName,
    alert: {
      isOpen,
      onOpen,
      isChanged,
      loadingSubmit
    }
  }
};
