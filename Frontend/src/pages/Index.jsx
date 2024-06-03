import { useAuthContext } from "../hooks/useAuthContext"

const Index = () => {

    const { user } = useAuthContext()

    return(
        <div className="index">
            <h3>Index</h3>
       </div>
    )
}

export default Index