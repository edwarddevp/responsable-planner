import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAFE_EVENT_PLANNER_TOKEN_KEY} from "@env"
import Toast from 'react-native-toast-message';
import {useAuthHandlers} from "../hooks/useAuthHandlers";

export const AuthContext = createContext();

export const AuthProvider = ({children, initialValue}) => {
  const {handleLogin, handleRegister} = useAuthHandlers(initialValue);
  const [user, setUser] = useState(initialValue);

  const login = async (email, password) => {
    try {
      const response = await handleLogin({email, password})
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
      return await handleRegister(data)
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${e}`
      });
      return e;
    }
  };

  async function logout() {
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
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};
