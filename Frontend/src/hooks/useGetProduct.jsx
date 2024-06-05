import { useState } from "react"

const baseURL = process.env.PROXY

export const useGetProduct = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [product, setProduct] = useState(null)

    const getProduct = async (id) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/product/${id}`);
        let data = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setProduct(data)
            setIsLoading(false)
        }

    }

    return { getProduct, product, isLoading, error }

}