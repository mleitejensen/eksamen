import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {

    const { user } = useAuthContext()

    return(
        <div className="home">
            <h3>Home</h3>
       </div>
    )
}

export default Home