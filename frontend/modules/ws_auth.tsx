  
import React from "react";
import axios from 'axios'

interface WaitForWsAndAuthProps {
    setUser: any
}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
  setUser,
}) => {


    let [loading, setLoading] = React.useState<boolean>(true);


    React.useEffect(() => {
        axios.get(`${window.CONFIG.API_URL}/auth`, { withCredentials: true })
        .then(({ data }) => {
            setUser(data)
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            window.location.href = `${window.CONFIG.API_URL}/auth/github` // TODO: non auth routes
        })
    }, [])

    if(loading) return <p> loading </p> // TODO: change this to make it prettier lol


  return <>{children}</>;
};