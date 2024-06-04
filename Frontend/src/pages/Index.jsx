import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNewestProducts } from "../hooks/useNewestProducts"

const Index = () => {
    const { user } = useAuthContext()
    const {newestProducts, posts, isLoading, error} = useNewestProducts()

    useEffect(() => {
        newestProducts()
    },[])

    useEffect(() => {
        console.log(posts)
    },[posts])
    return(
        <div className="index">

            <div className="productList">
                {posts?.newest && posts?.newest.map((post) => (
                    <div key={post?._id} className="gridItem">
                        <img src={post?.image} alt={post.description} />
                        <h3>{post?.name}</h3>
                        <p>{post?.description}</p>
                    </div>
                ))}
            </div>

       </div>
    )
}

export default Index