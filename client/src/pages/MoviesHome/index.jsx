import { Breadcrumb, Button, Table, Pagination, Popconfirm } from "antd"
import { Link } from "react-router-dom"
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { deleteMovie, getMovie } from "../../services"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const MoviesHome = () => {
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [movies, setMovies] = useState([])
    console.log(totalPage);

    const deleteMovieById = async (id) => {
        try {
            const result = await deleteMovie(id)
            console.log(result)
            setMovies(movies.filter(movie => movie?._id != id))
            setCount(count - 1)
            toast.success("Delete movie success")

        } catch (error) {
            toast.error("Delete movie failed")
            console.error(error)
        }
    }

    const column = [
        {
            title: 'ID_Movie',
            dataIndex: 'ID'
        },
        {
            title: 'Movie_name',
            dataIndex: 'name'
        },
        {
            title: 'Author',
            dataIndex: 'user',
            // render: (value) => value.username
        },
        {
            title: 'Time',
            dataIndex: 'time',
        },
        {
            title: 'Year',
            dataIndex: 'year'
        },
        {
            title: 'Introduce',
            dataIndex: 'introduce'
        },
        {
            title: 'Action',
            render: (_, record) => {
                return <>
                    <Link to={`/add-movie/${record?._id}`}> <AiFillEdit /> </Link>
                    <Popconfirm title={"Are you sure delete this movie?"} onConfirm={() => deleteMovieById(record?._id)}>
                        <FaTrash />
                    </Popconfirm>
                    
                </>

            }
        }

    ]

    const getData = async () => {
        try {
            const result = await getMovie(pageSize, pageIndex)
            setMovies(result.data?.result?.movies)
            setCount(result.data?.result?.count)
            setTotalPage(result.data?.result?.totalPage)
        } catch (error) {
            console.log(error)
        }
    }

    //dependences [pageSize, pageIndex] chi call api khi co su thay doi 2 state
    useEffect(() => {
        getData()
    }, [pageSize, pageIndex])

    return (
        <>
            <Breadcrumb items={[{ title: 'MOVIES HOME' }]} />
            <Button type="primary" style={{ marginTop: '10px' }}>
                <Link to={'/add-movie'}>Add new movie</Link>
            </Button>

            <Table
                style={{ marginTop: '10px' }}
                dataSource={movies}
                columns={column}
                pagination={false}
            ></Table>

            <Pagination
                style={{ marginTop: '10px' }}
                pageSize={pageSize}
                total={count}
                current={pageIndex}
                onChange={(current, size) => {
                    setPageIndex(current)
                    setPageSize(size)
                }}
                showSizeChanger
                showTotal={(total) => <p>{total} movies</p>}

            />
        </>
    )
}
export default MoviesHome