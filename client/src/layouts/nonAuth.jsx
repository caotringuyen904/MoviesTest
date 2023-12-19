import { Outlet } from "react-router-dom"

const NonAuthLayout = () => {
    return (
        <>
            <Outlet/> 
        </>
    )
}

export default NonAuthLayout


// Note: <Outlet/> se la <Login/>, tuc Login se render ra o day