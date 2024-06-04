import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNewestProducts } from "../hooks/useNewestProducts"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const Category = () => {
    const { user } = useAuthContext()
    const {newestProducts, posts, isLoading, error} = useNewestProducts()

    useEffect(() => {
        newestProducts()
    },[])

    useEffect(() => {
        console.log(posts)
    },[posts])


    return(
        <div className="category">

            <div className="productList">
                {posts?.newest && posts?.newest.map((post) => (
                    <div key={post?._id}>
                        <div className="gridItem">
                            <img src={post?.image} alt={post.description} />
                            <h3>{post?.name}</h3>
                            <p>{post?.description}</p>
                        </div>
                    </div>
                ))}
            </div>

       </div>
    )
}

export default Category