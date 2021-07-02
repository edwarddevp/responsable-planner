import React, {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useApiRequest} from "./useApiRequest";
import {USERS_BY_TOKEN} from "../lib/apiRoutes";
import {SAFE_EVENT_PLANNER_TOKEN_KEY} from "@env"
import allSettled from 'promise.allsettled';

export const useAppLoading = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(true);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const {call: callVerifyToken} = useApiRequest(USERS_BY_TOKEN, {
    skip: true
  })

  useEffect(() => {
    // AsyncStorage.setItem('alreadyLaunched', 'false');
    loadingAppData()
  }, []);

  const loadingAppData = async () => {
    try {
      await allSettled([
        checkIfAppFirstLaunched(),
        checkIfUserIsLogged()
      ])
      setLoading(false)

    } catch (e) {

    }
  }

  const checkIfUserIsLogged = async () => {
    try {
      const value = await AsyncStorage.getItem(SAFE_EVENT_PLANNER_TOKEN_KEY)
      if (value !== null) {
        const response = await callVerifyToken()
        if (response?.success) {
          setUser(response?.data?.user)
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  const checkIfAppFirstLaunched = async () => {
    try {
      const isFirstLaunchedValue = await AsyncStorage.getItem('alreadyLaunched')
      if (isFirstLaunchedValue === 'true') {
        setIsAppFirstLaunched(false);
      } else {
        setIsAppFirstLaunched(true);
      }
    } catch (e) {
    }
  }

  return [
    loading,
    user,
    isAppFirstLaunched,
    setIsAppFirstLaunched
  ]
};
