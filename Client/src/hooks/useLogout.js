import { useAuthContext } from './useAuthContext'
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        localStorage.removeItem('foodipes-user');
        dispatch({ type:"LOGOUT" })
    }

    return { logout }
}