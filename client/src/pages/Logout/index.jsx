import { removeFromLocalStorage } from '../../utils'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/action/userLogout'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickToLogout = () => {
        dispatch(logout())
        removeFromLocalStorage('user')
        removeFromLocalStorage('token')    
        toast.success("Logout successfully")
        navigate("/auth/login")
    }
         
    return (
        <>
            <Button type='primary' style={{left: "85%"}} onClick={handleClickToLogout}>
                Logout</Button>
        </>
    )
}

export default Logout