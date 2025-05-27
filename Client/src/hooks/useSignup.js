import  axios  from "axios"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useHistory } from "react-router-dom"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const history = useHistory();

    const signup = async (name, email, password, redirectTo="/") => {
        setIsLoading(true)
        setError(null)
        const API = process.env.REACT_APP_API;
        const URL = `${API}/user/signup`;
        try {
            const res = await axios.post(URL, { name, email, password })
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

    return { signup, isLoading, error, setError }
}