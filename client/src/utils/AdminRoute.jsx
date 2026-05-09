import {Navigate} from "react-router-dom";

const AdminRoute = ({children}) => {
    const user = localStorage.getItem("user")

    if(!user){
        return <Navigate to="/login" replace/>
    }

    if(user !== "admin"){
        return(
            <Navigate to="/dashboard" replace/>
        )
    }

    return children

}

export default AdminRoute;