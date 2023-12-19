import { Breadcrumb, Form, Input, Upload, Button } from "antd"
import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useState } from "react"
import { UploadOutlined } from '@ant-design/icons';
import { createMovie, editMovie, getMovieById } from "../../services"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom";


const AddEditMovie = () => {
    // const editorRef = useRef(null)
        const { id } = useParams()
        const [introduce, setIntroduce] = useState('')
        const [image, setImage] = useState(null)

        console.log(id);
        const [form] = Form.useForm()

        const getMovie = async () => {
            try {
                const result = await getMovieById(id)
                setIntroduce(result?.data.content)
                setImage(result?.data.image)
                form.setFieldValue("ID", result?.data.ID)
                form.setFieldValue("name", result?.data.name)
                form.setFieldValue("time", result?.data.time)
                form.setFieldValue("year", result?.data.year)

            } catch (error) {
                toast.error("Delete movie failed")
                console.log(error)
            }
        }

        console.log(image);

    const uploadMovie = async () => {
        try {
            const idMovie = form.getFieldValue("ID")
            const name = form.getFieldValue("name")
            const time = form.getFieldValue("time")
            const year = form.getFieldValue("year")

            const data = new FormData()

            data.append('ID', idMovie)
            data.append('name', name)
            data.append('time', time)
            data.append('year', year)
            data.append('introduce', introduce)

            if (image) {
                data.append('image', image.originFileObj)
            }

            if (!id) {

                const result = await createMovie(data)
                console.log(result)
                toast.success("Create movie success")

            } else {
                const result = await editMovie(id, data)
                console.log(result)
                toast.success("Update movie success")
            }

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        if (id) {
            getMovie()
        }
    }, [])

    return (
        <>
            <Breadcrumb items={[{ title: id ? 'Edit movie' : 'Add movie' }]} />
            <Form form={form} onFinish={uploadMovie} style={{ marginTop: '15px' }}>
                <Form.Item label='movie ID:' name='ID'>
                    <Input placeholder="Enter movie ID..." />
                </Form.Item>
                <Form.Item label='movie name:' name='name'>
                    <Input placeholder="Enter movie name..." />
                </Form.Item>
                <Form.Item label='time:' name='time'>
                    <Input placeholder="Enter movie time..." />
                </Form.Item>
                <Form.Item label='year:' name='year'>
                    <Input placeholder="Enter movie year..." />
                </Form.Item>



                <div style={{ marginTop: '10px' }}>
                    <lable>Introduce:</lable>
                    <Editor
                        apiKey="y6opzdmgrsouqd8r27f2klonkq9220yw36zn2bckn5xdi6d4"
                        onEditorChange={(value) => setIntroduce(value)}
                        initialValue="Please input introduce"
                        value={introduce}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Thumbnail: </label>
                    <Upload type="single" action={false} onChange={(file) => {setImage(file.file)}}>
                        <Button icon={<UploadOutlined />}>Click To Upload</Button>
                    </Upload>
                </div>

                <Button style={{ marginTop: '15px', marginLeft: '90%' }} type="primary" htmlType="submit">{id ? "Update movie" : "Post movie"}</Button>

            </Form>


        </>
    )
}

export default AddEditMovie