import { useParams } from 'react-router-dom';
import { useGetProduct } from "../hooks/useGetProduct";
import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { useTypes } from '../hooks/useTypes';

const Product = () => {
    const { user } = useAuthContext()

    const {productId} = useParams()
    const { getProduct, product, isLoading, error } = useGetProduct()

    const [image, setImage] = useState(null)
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)

    const { types, typeList } = useTypes()

    useEffect(() => {
        getProduct(productId)
        types()
    },[])

    return(
        <div className="productPage">
            {user?.admin && 
            <>
                {product && 
                <>
                    <form className="postForm" onSubmit={(e) => {
                        e.preventDefault()
                        post(description, type, image)
                    }}>
                    <div className="formLine">
                        <label htmlFor="name">Apparel name:</label>
                        <p>{product?.name}</p>
                    </div>

                    <div className="formLine">
                        <label htmlFor="url">Apparel img url:</label>
                        <input type="url" name="url" defaultValue={product?.image} onChange={(e) => setImage(e.target.value)}/>
                    </div>

                    <div className="formLine">
                        <label htmlFor="genre">Sub-genre:</label>
                        <select name="genre" defaultValue={product?.type} onChange={(e) => setType(e.target.value)}>
                            {typeList && typeList.map((type) => (
                                <option selected={product?.type === type} key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="formTextArea">
                        <label htmlFor="description">Apparel description:</label>
                        <textarea name="description" maxLength={100} defaultValue={product?.description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="messageBox">
                        {error && <div className="error">{error}</div>}
                        
                    </div>

                    <button disabled={isLoading} className="submit">Submit</button>

                </form>
                </>
                }
            </>
            }

            {!user?.admin && 
            <>
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
            </>
            }

       </div>
    )
}

export default Product