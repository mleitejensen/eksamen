import { useParams } from 'react-router-dom';
import { useGetProduct } from "../hooks/useGetProduct";
import { useEffect } from "react";

const Product = () => {

    const {productId} = useParams()
    const { getProduct, product, isLoading, error } = useGetProduct()

    useEffect(() => {
        getProduct(productId)
    },[])

    return(
        <div className="productPage">

            {product && 
            <>
                <div className="singleProduct">
                    <img src={product?.image} alt={product.description} />
                    <h3>{product?.name}</h3>
                    <p>{product?.description}</p>
                    <div className="buy" onClick={() => console.log("clicked buy")}>
                        <button>Add to cart</button>
                        <input type="number" defaultValue={1} onClick={(e) => e.stopPropagation()}/>
                    </div>
                </div>
            </>
            }

       </div>
    )
}

export default Product