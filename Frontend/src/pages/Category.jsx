import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from 'react-router-dom';
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { Link } from 'react-router-dom'

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
                    <div key={post?._id} className="gridItem">
                        <div className="product">
                            <img src={post?.image} alt={post.description} />
                            <Link to={`/product/${post?._id}`}>
                                <h3>{post?.name}</h3>
                             </Link>
                            <p>{post?.description}</p>
                            <div className="buy">
                                <button>Add to cart</button>
                                <input type="number" defaultValue={1}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

       </div>
    )
}

export default Category