import { useAuthContext } from "../hooks/useAuthContext"

const Login = () => {

    const { user } = useAuthContext()

    return(
        <div className="login">
            <h3>Login</h3>
       </div>
    )
}

export default Login