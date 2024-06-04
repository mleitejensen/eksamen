import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from 'react-router-dom';
import { useCategoryProducts } from "../hooks/useCategoryProducts";

const Category = () => {
    const { user } = useAuthContext()
    const { categoryProducts, posts, isLoading, error } = useCategoryProducts()

    const {type} = useParams()

    useEffect(() => {
        categoryProducts(type)
    },[type])

    useEffect(() => {
        console.log(posts)
    },[posts])


    return(
        <div className="category">

            <h1 className="title">{type}</h1>

            <div className="productList">
                {posts?.products && posts?.products.map((post) => (
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