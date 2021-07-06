import React, {useState} from 'react';
import {API_URL} from "@env"
import {REGISTER, SIGNIN} from "../lib/apiRoutes";

export const useAuthHandlers = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  const handleAuthRequest = async (path, params) => {
    try {
      setLoading(true)
      const response = await fetch(API_URL + path, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)// body data type must match "Content-Type" header
      });
      const json = await response.json()
      setLoading(false)
      return json
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }

  return {
    handleLogin:  (params) => handleAuthRequest(SIGNIN,params),
    handleRegister: (params) => handleAuthRequest(REGISTER,params) ,
    loading,
    error,
  }
};
