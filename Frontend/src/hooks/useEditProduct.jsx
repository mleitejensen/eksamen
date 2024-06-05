import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useLogout } from "./useLogout"

const baseURL = process.env.PROXY

export const useEditProduct = () => {
    const [editError, setError] = useState(null)
    const [editIsLoading, setIsLoading] = useState(null)
    const [editData, setData] = useState(null)
    const {user} = useAuthContext()
    const {logout} = useLogout()
    

    const editProduct = async (productId, description, type, image) => {
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
            body: JSON.stringify({productId, newDescription: description, newType: type, newImage: image})
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

    return {editProduct, editError, editIsLoading, editData}
}