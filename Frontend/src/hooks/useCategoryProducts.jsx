import { useState } from "react"

const baseURL = process.env.PROXY

export const useCategoryProducts = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [posts, setPosts] = useState(null)

    const categoryProducts = async (type) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/type/${type}`);
        let data = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setPosts(data)
            setIsLoading(false)
        }

    }

    return { categoryProducts, posts, isLoading, error }

}