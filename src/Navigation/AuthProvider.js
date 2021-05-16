import React, {createContext, useEffect, useState} from 'react';
import {useApiRequest} from "../hooks/useApiRequest";
import {REGISTER, SIGNIN, USERS_BY_TOKEN} from "../lib/apiRoutes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAFE_EVENT_PLANNER_TOKEN_KEY} from "@env"
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});

  useEffect(()=>{
    checkIfUserIsLogged()
  },[])

  const {call: callLogin} = useApiRequest(SIGNIN, {
    method: 'POST',
    skip: true,
    withToken: false
  })

  const {call: callRegister} = useApiRequest(REGISTER, {
    method: 'POST',
    skip: true,
    withToken: false
  })

  const {call: callVerifyToken} = useApiRequest(USERS_BY_TOKEN, {
    skip: true
  })

  const checkIfUserIsLogged = async () => {
    try {
      const value = await AsyncStorage.getItem(SAFE_EVENT_PLANNER_TOKEN_KEY)
      if (value !== null) {
        const response = await callVerifyToken()
        if (response?.success) {
          setUser(response?.data?.user)
        }
        return response
      }

    } catch (e) {
      console.log(e);
      Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `${e}`
      });
      return e;
    }
  }

  const login = async (email, password) => {
    try {
      const response = await callLogin({ email, password })
      if (response?.success) {
        await AsyncStorage.setItem(SAFE_EVENT_PLANNER_TOKEN_KEY, response?.data?.token)
        setUser(response?.data?.user)
      }
      return response

    } catch (e) {
      Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `${e}`
      });
      return e;
    }
  };

  const register = async (data) => {
    try {
      return await callRegister(data)
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${e}`
      });
      return e;
    }
  };

  async function logout () {
    try {
      try {
        await AsyncStorage.removeItem(SAFE_EVENT_PLANNER_TOKEN_KEY)
        setUser({})

      } catch (e) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: `${e}`
        });
        return e;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        checkIfUserIsLogged,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};
