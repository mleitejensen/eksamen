import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNewestProducts } from "../hooks/useNewestProducts"
import { Link } from 'react-router-dom'

const Index = () => {
    const { user } = useAuthContext()
    const {newestProducts, posts, isLoading, error} = useNewestProducts()

    useEffect(() => {
        newestProducts()
    },[])
    
    return(
        <div className="index">

            <div className="productList">
                {posts?.newest && posts?.newest.map((post) => (
                    <div key={post?._id} className="gridItem">
                        <div className="product">
                            <img src={post?.image} alt={post.description} />
                            <Link to={`/${post?._id}`}>
                                <h3>{post?.name}</h3>
                             </Link>
                            <p>{post?.description}</p>
                            <div className="buy">
                                <button>Add to cart</button>
                                <input type="number" defaultValue={1}/>
                            </div>
                        </div>
                        
                        <Link to={`/type/${post?.type}`}>
                            <p className="type">{post?.type}</p>
                        </Link>
                    </div>
                ))}
            </div>

       </div>
    )
}

export default Index