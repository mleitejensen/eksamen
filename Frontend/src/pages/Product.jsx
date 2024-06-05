import { useParams } from 'react-router-dom';
import { useGetProduct } from "../hooks/useGetProduct";
import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { useTypes } from '../hooks/useTypes';
import { useEditProduct } from '../hooks/useEditProduct';
import { useDeleteProduct } from '../hooks/useDeleteProduct';

const Product = () => {
    const { user } = useAuthContext()

    const {productId} = useParams()
    const { getProduct, product, isLoading, error } = useGetProduct()

    const [image, setImage] = useState(null)
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)

    const { types, typeList } = useTypes()

    const {editProduct, editError, editIsLoading, editData} = useEditProduct()
    const {deleteProduct, deleteError, deleteIsLoading, deleteData} = useDeleteProduct()


    useEffect(() => {
        getProduct(productId)
        types()
    },[])

    useEffect(() => {
        setType(product?.type)
        setDescription(product?.description)
        setImage(product?.image)
    },[product])

    return(
        <div className="productPage">
            {user?.admin && 
            <>
                {product && 
                <>
                    <form className="postForm">
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
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="formTextArea">
                        <label htmlFor="description">Apparel description:</label>
                        <textarea name="description" maxLength={100} defaultValue={product?.description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="messageBox">
                        {editError && <div className="error">{editError}</div>}
                        {editData && <div className='success'>{editData.success}</div>}
                        {deleteError && <div className="error">{deleteError}</div>}
                        {deleteData && <div className='success'>{deleteData.success}</div>}
                    </div>
                    
                    <div className='buttonBox'>
                        <button disabled={editIsLoading} className="edit" onClick={(e) => {
                            e.preventDefault()
                            editProduct(product?._id, description, type, image)
                        }}>Edit</button>
                        <button disabled={deleteIsLoading} className='delete' onClick={(e) => {
                            e.preventDefault()
                            deleteProduct(product?._id)
                        }}>Delete</button>
                    </div>

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