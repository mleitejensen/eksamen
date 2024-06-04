import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const baseURL = process.env.PROXY

export const useCheckAdmin = () => {
    const [checkAdminError, setError] = useState(null)
    const [checkAdminIsLoading, setIsLoading] = useState(null)
    const [admin, setAdmin] = useState(null)

    const {user} = useAuthContext()

    const checkAdmin = async () => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/admin`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
        });
        let data = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(data.error)
        }
        if(response.ok){
            setAdmin(data)
            setIsLoading(false)
        }

    }

    return { checkAdmin, admin, checkAdminIsLoading, checkAdminError }

}