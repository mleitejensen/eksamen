import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from 'react-router-dom';

const Product = () => {
    const { user } = useAuthContext()

    const {productId} = useParams()


    return(
        <div className="category">

            <h1 className="title">Product Page - {productId}</h1>

       </div>
    )
}

export default Product