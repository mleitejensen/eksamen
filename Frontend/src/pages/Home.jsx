import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePost } from "../hooks/usePostProduct"
import { useTypes } from "../hooks/useTypes"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const Home = () => {
    const { user } = useAuthContext()

    let navigate = useNavigate();

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)

    const {post, error, isLoading, data} = usePost()
    const { types, typeList } = useTypes()

    
    useEffect(() => {
        types()
        if(!user?.admin){
            return navigate("/");
        }
    },[])

    useEffect(() => {
        if(typeList){
            setType(typeList[0])
        }
    },[typeList])

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

                <div className="messageBox">
                    {error && <div className="error">{error}</div>}
                    {data && <div className="success">{data.success}</div>}
                </div>

                <button disabled={isLoading} className="submit">Submit</button>

            </form>

            <p className="help">Need help? Click <Link to="/info">here</Link>.</p>
       </div>
    )
}

export default Home