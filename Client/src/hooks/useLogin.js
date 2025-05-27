import  axios  from "axios"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useHistory } from "react-router-dom"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    
    const history = useHistory();

    const login = async (email, password, redirectTo="/") => {
        setIsLoading(true)
        setError(null)

        const API = process.env.REACT_APP_API;
        const URL = `${API}/user/login`;
        
        try {
            const res = await axios.post(URL, { email, password })
            const data = res.data

            localStorage.setItem('foodipes-user', JSON.stringify(data))
            dispatch({ type: "LOGIN", payload: data })
            setIsLoading(false)

            history.push(redirectTo);

        } catch (err) {
            setIsLoading(false)
            setError(err?.response?.data?.message)
        }
    }

    return { login, isLoading, error }
}