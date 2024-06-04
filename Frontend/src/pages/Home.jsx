import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePost } from "../hooks/usePostProduct"

const Home = () => {
    const { user } = useAuthContext()

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)

    const {post, error, isLoading, data} = usePost()

    return(
        <div className="home">
            <h3>Home</h3>

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
                        <option value="T-shirt">T-shirt</option>
                        <option value="Shirt">Shirt</option>
                    </select>
                </div>

                <div className="formTextArea">
                    <label htmlFor="description">Apparel description:</label>
                    <textarea name="description" maxLength={100} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <button className="submit">Submit</button>

                {error && <div className="error">{error}</div>}
            </form>
       </div>
    )
}

export default Home