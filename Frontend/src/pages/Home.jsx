import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePost } from "../hooks/usePostProduct"
import { useTypes } from "../hooks/useTypes"
import { useCheckAdmin } from "../hooks/useCheckAdmin"

const Home = () => {
    const { user } = useAuthContext()

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState("t-shirt")
    const [description, setDescription] = useState(null)

    const {post, error, isLoading, data} = usePost()
    const { types, typeList } = useTypes()

    useEffect(() => {
        types()
    },[])

    return(
        <div className="home">

            <form className="postForm" onSubmit={(e) => {
                    e.preventDefault()
                    post(name, description, type, image)
                }}>
                <div className="formLine">
                    <label htmlFor="name">Apparel name:</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="formLine">
                    <label htmlFor="url">Apparel img url:</label>
                    <input type="url" name="url" onChange={(e) => setImage(e.target.value)}/>
                </div>

                <div className="formLine">
                    <label htmlFor="genre">Sub-genre:</label>
                    <select name="genre" onChange={(e) => setType(e.target.value)}>
                        {typeList && typeList.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="formTextArea">
                    <label htmlFor="description">Apparel description:</label>
                    <textarea name="description" maxLength={100} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <button disabled={isLoading} className="submit">Submit</button>

                {error && <div className="error">{error}</div>}

                {data && <div></div>}
            </form>
       </div>
    )
}

export default Home