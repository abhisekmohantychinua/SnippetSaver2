import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import NavigationBar from "../components/NavigationBar.tsx";


const PrivateRoutes = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <main>
            <NavigationBar/>
            <Outlet/>
        </main>
    )

}

export default PrivateRoutes;