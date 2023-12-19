import { Button, Checkbox, Form, Input } from 'antd'
import { register } from '../../services/index'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { saveToLocalStorage } from '../../utils'

const Signup = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = async () => {
        try {
            const username = form.getFieldValue('username')
            const password = form.getFieldValue('password')
            const result = await register(username, password)
            toast.success("Signup successfully")


            //save info user and token to localStorage from server
            saveToLocalStorage("user", JSON.stringify(result.data.newUser.username))

            // dieu huong to login page
            navigate("/auth/login")


        } catch (error) {
            console.log(error)
            toast.error("Sign failed")
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };


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
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Signup