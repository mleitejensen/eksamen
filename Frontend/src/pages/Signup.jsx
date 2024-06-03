import { useAuthContext } from "../hooks/useAuthContext"

const Singup = () => {

    const { user } = useAuthContext()

    return(
        <div className="singup">
            <h3>Singup</h3>
       </div>
    )
}

export default Singup