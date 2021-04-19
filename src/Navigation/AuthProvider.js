import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({ name:'Edward'});

    const login = async (email, password) => {
        try {
            console.log('login')
            setUser({ name:'Edward'})
            
        } catch (e) {
            console.log(e);
            // Toast.show({
            //     type: 'error',
            //     text1: 'Error',
            //     text2: `${e}`
            // });
            return e;
        }
    };

    const register = async (data) => {
        const {email, password, firstName, lastName} = data;

        try {
           console.log('register')
        } catch (e) {
            // console.log('eeeeeee', e);
            return e
        }
    };

    const logout = async () => {
        try {
            console.log('logout')
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
