import { useSelector } from "react-redux"

const HeaderLogin = () => {
    const user = useSelector((state)=> state.user)
    console.log("re render in header")
    return (
        <>
         {user.username ? user.username : "chua dang nhap"}
        </>
    )
}

export default HeaderLogin