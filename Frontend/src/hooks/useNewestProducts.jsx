import { useState } from "react"

const baseURL = process.env.PROXY

export const useNewestProducts = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [posts, setPosts] = useState(null)

    const newestProducts = async () => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/newest`);
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

    return { newestProducts, posts, isLoading, error }

}