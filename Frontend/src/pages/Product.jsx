import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from 'react-router-dom';
import { useGetProduct } from "../hooks/useGetProduct";
import { useEffect } from "react";

const Product = () => {
    const { user } = useAuthContext()

    const {productId} = useParams()
    const { getProduct, product, isLoading, error } = useGetProduct()

    useEffect(() => {
        getProduct(productId)
    },[])

    useEffect(() => {
        console.log(product)
    },[product])

    return(
        <div className="category">

            <h1 className="title">Product Page - {productId}</h1>

            {product && 
            <>
                <div className="product">
                    <img src={product?.image} alt={product.description} />
                    <h3>{product?.name}</h3>
                    <p>{product?.description}</p>
                    <div className="buy">
                        <button>Add to cart</button>
                        <input type="number" defaultValue={1}/>
                    </div>
                </div>
            </>
            }

       </div>
    )
}

export default Product