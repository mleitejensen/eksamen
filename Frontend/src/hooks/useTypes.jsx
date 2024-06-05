import { useState } from "react"

const baseURL = process.env.PROXY

export const useTypes = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [typeList, setTypeList] = useState(null)

    const types = async (type) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/type`);
        let data = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setTypeList(data.types)
            setIsLoading(false)
        }

    }

    return { types, typeList, isLoading, error }

}