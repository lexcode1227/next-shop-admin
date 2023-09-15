"use client"
import React, {useState, useContext, createContext} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import endPoints from "../../services/api";

const AuthContext = createContext();

export function ProviderAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProvideAuth(){
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const signIn = async (email, password) => {
        const options = {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            }
        }
        const { data} = await axios.post(endPoints.auth.login, {email, password}, options);
        if (data) {
            const token = data.access_token;
            Cookies.set("token", token, { expires: 5 });

            axios.defaults.headers.Authorization = `Bearer ${token}`;
            const { data: user } = await axios.get(endPoints.auth.profile);
            setUser(user);
        };
    };

    const loginError = (message)=> {
        setError(message)
    }
    return {
        user,
        signIn,
        error,
        loginError,
    }
}