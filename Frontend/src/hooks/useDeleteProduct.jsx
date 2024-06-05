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

        if(!user?.token){
            return setError("you must be logged in")
        }

        const response = await fetch(`${baseURL}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify({id: productId})
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            setIsLoading(false)
            setData(json)
        }
    }

    return {deleteProduct, deleteError, deleteIsLoading, deleteData}
}