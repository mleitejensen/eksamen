import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {

    const { user } = useAuthContext()

    return(
        <div className="home">
            <h3>Home</h3>

            <form className="postForm">
                <div className="formLine">
                    <label htmlFor="name">Apparel name:</label>
                    <input type="text" name="name" />
                </div>

                <div className="formLine">
                    <label htmlFor="url">Apparel img url:</label>
                    <input type="url" name="url"/>
                </div>

                <div className="formLine">
                    <label htmlFor="genre">Sub-genre:</label>
                    <select name="genre">
                        <option>T-shirt</option>
                        <option>Shirt</option>
                    </select>
                </div>

                <div className="formTextArea">
                    <label htmlFor="description">Apparel description:</label>
                    <textarea name="description" maxLength={100}></textarea>
                </div>
            </form>
       </div>
    )
}

export default Home