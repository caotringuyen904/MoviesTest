import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate()

    const goToLoginPage = () => {
        navigate('/auth/login')
    }
    return (
        <>
                <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={goToLoginPage}>Back to login page</Button>}
            />
        </>
    )
}

export default NotFoundPage