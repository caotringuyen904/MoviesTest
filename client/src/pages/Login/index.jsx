import { Button, Checkbox, Form, Input } from 'antd'
import { login } from '../../services/index'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getValueFromLocalStorage, saveToLocalStorage } from '../../utils'
import { login as loginAction } from '../../redux/action/user'


const Login = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userFromLocalStorage = getValueFromLocalStorage('user')
    
    form.setFieldsValue({ "username": userFromLocalStorage })




    const onFinish = async () => {
        try {
            const username = form.getFieldValue('username')
            const password = form.getFieldValue('password')

            const result = await login(username, password)
            toast.success("Login successfully")

            // save redux userReducer
            dispatch(loginAction(result.data.user))

            //save info user and token to localStorage from server
            saveToLocalStorage("user", JSON.stringify(result.data.user))
            saveToLocalStorage("token", JSON.stringify(result.data.token))

            // dieu huong to page
            navigate("/dashboard")


        } catch (error) {
            console.log(error)
            toast.error("Login failed")
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };
    console.log("re render in login page")

    const handleClickToSignup = () => {
        navigate("/auth/register")
    }



    return (
        <div className='' style={{ marginTop: "60px" }}>
                <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    <Button style={{marginLeft: '50px'}} type='primary' onClick={handleClickToSignup}>Sign up</Button>

                </Form.Item>
            </Form>
        </div>
    )
}
export default Login;