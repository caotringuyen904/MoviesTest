import { useSelector } from "react-redux"

const DashBoard = () => {
    const user = useSelector((state)=> state.user)
    return (
        <>
            <p>Dashboard</p>
            {user.username}
        </>
    )
}

export default DashBoard