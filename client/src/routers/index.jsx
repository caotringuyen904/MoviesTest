import { Routes, Route } from "react-router-dom"
import NonAuthLayout from "../layouts/nonAuth"
import Login from "../pages/Login"
import DashBoard from "../pages/dashboard"
import MainLayout from "../layouts/mainLayout"
import NotFoundPage from "../pages/404NotFound"

import { useDispatch, useSelector } from "react-redux"
import { getValueFromLocalStorage } from "../utils"
import { useEffect } from "react"
import { login } from "../redux/action/user"
import Signup from "../pages/SignUp"
import MoviesHome from "../pages/MoviesHome"
import AddEditMovie from "../pages/AddEditMovies"
import Movies from "../pages/Movies"
import MovieDetail from "../pages/MoviesDetail"


const AppRouter = () => {
    const user = useSelector((state) => state.user)
    const userFromLocalStorage = getValueFromLocalStorage('user')
    const dispatch = useDispatch()

    // update to redux after everytime re render
    useEffect(() => {
        if(userFromLocalStorage?._id){
            dispatch(login(userFromLocalStorage))
        }
    },[])

    return (
        <Routes>
            <Route path="/auth" element={<NonAuthLayout />}>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Signup />} />
            </Route>
            
            {(user?._id || userFromLocalStorage?._id) && <Route path="/" element={<MainLayout/>}>
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie" element={<MoviesHome />} />
                <Route path="/add-movie" element={<AddEditMovie />} />
                <Route path="/add-movie/:id" element={<AddEditMovie />} />
                <Route path="/movie-detail/:idMovie" element={<MovieDetail />} />
                          
            </Route>}

            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default AppRouter