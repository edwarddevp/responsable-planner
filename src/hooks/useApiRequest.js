import React, {useContext, useEffect, useState} from 'react';
import {API_URL, SAFE_EVENT_PLANNER_TOKEN_KEY} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "../Navigation/AuthProvider";

export const useApiRequest = (path, {method = 'GET', paramsData, skip, withToken = true, logoutContext} = {}) => {
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState({})
  const authContext = useContext(AuthContext)

  useEffect(() => {
    !skip && apiRequest(paramsData)
  }, [])

  const getToken = async () => {
    const value = await AsyncStorage.getItem(SAFE_EVENT_PLANNER_TOKEN_KEY)
    if (value !== null) {
      return {
        Authorization: `Bearer ${value}`
      }
    }
    return {}
  }

  const apiRequest = async (params) => {
    try {
      setLoading(true)
      const body = (params || paramsData) ? {
        body: JSON.stringify(params || paramsData)// body data type must match "Content-Type" header
      } : {}
      const authorization = withToken ? await getToken() : {}
      const response = await fetch(API_URL + path, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          ...authorization
        },
        ...body
      });
      const json = await response.json()
      console.log('%c json', 'background: #222; color: #bada55',json)
      if (withToken) {
        if(json?.code === 401 || json?.code === 403){
          authContext?.logout?
            authContext?.logout() :
            logoutContext && logoutContext()
        }
      }




      setResponse(json)
      setLoading(false)
      return json
    } catch (e) {
      setError(e)
      setLoading(false)
      console.log('%c e', 'background: #222; color: #bada55', e)
    }
  }

  return {
    data: response,
    loading,
    error,
    call: apiRequest
  }
};
