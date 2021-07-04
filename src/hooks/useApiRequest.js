import React, {useContext, useEffect, useState} from 'react';
import {API_URL, SAFE_EVENT_PLANNER_TOKEN_KEY} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "../Navigation/AuthProvider";
import Toast from "react-native-toast-message";

export const useApiRequest = (path, {method = 'GET', paramsData, skip} = {}) => {
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState("")
  const authContext = useContext(AuthContext)

  useEffect(() => {
    !skip && apiRequest(paramsData)
  }, [path])

  const getToken = async () => {
    const value = await AsyncStorage.getItem(SAFE_EVENT_PLANNER_TOKEN_KEY)
    if (value !== null) {
      return {
        Authorization: `Bearer ${value}`
      }
    }
    return {}
  }

  const getBody = (params) => {
    return params ? {
      body: JSON.stringify(params)
    } : {}
  }

  const apiRequest = async (params, methodConfig = method, addToPatch = '') => {
    try {
      setLoading(true)

      const body = getBody(params || paramsData)

      const authorization = await getToken()

      const response = await fetch(API_URL + path + addToPatch, {
        method: methodConfig, // *GET, POST, PUT, DELETE, etc.
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

      if (json?.code === 401 || json?.code === 403) {
        authContext && await authContext?.logout()
        setError(json?.message)
        Toast.show({
          type: 'error',
          text1: `Error de autenticación`
        });
      }

      if (json?.code === 500) {
        setError(json?.message)
        // console.log('%c json', 'background: #222; color: #bada55', json)
        if (json?.message) {
          Toast.show({
            type: 'error',
            text1: json?.message
          });
        } else {
          Toast.show({
            text1: `Error de conexion`,
            text2: `inténtelo de nuevo más tarde`,
            type: 'error'
          });
        }

      }
      setResponse(json)
      setLoading(false)
      return json
    } catch (e) {
      setError(e)
      setLoading(false)
      // console.log('%c e', 'background: #222; color: #bada55', path +" ==== " +e)
    }
  }

  return {
    data: response,
    loading,
    error,
    call: apiRequest
  }
};
