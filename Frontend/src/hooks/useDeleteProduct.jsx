import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useLogout } from "./useLogout"

const baseURL = process.env.PROXY

export const useDeleteProduct = () => {
    const [deleteError, setError] = useState(null)
    const [deleteIsLoading, setIsLoading] = useState(null)
    const [deleteData, setData] = useState(null)
    const {user} = useAuthContext()
    const {logout} = useLogout()
    

    const deleteProduct = async (productId) => {
        setError(null)
        setIsLoading(true)
        setData(null)

        if(!user.token){
            return setError("you must be logged in")
        }

        const response = await fetch(`${baseURL}/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({id: productId})
        })
        const json = await response.json()

        if(!response.ok){
            if(response.status === 401){
                logout()
                alert("User session expired, you have been logged out.")
            }else{
                setError(json.error)
            }
            setIsLoading(false)
        }
        if(response.ok){
            setIsLoading(false)
            setData(json)
        }
    }

    return {deleteProduct, deleteError, deleteIsLoading, deleteData}
}