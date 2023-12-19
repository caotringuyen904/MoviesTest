import { Col, Row, Pagination } from "antd";
import { useEffect, useState } from "react"
import { getMovie } from "../../services"
import { Link } from "react-router-dom"

const Movies = () => {
    const [pageSize, setPageSize] = useState(4)
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0); console.log(totalPage);
    const [movies, setMovies] = useState([])


    const getData = async () => {
        try {
            const result = await getMovie(pageSize, pageIndex)
            console.log(result);
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
            <h1>MOVIES UI</h1>
            <Row gutter={[16, 16]}>
                {movies.map((movie) => (
                    <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
                        <Link to={`/movie-detail/${movie?._id}`}>
                        <div className="movie-card">
                            {movie.image && <img src={movie.image} alt={movies.name} style={{ maxWidth: "100%" }} />}
                            <h3>{movie.name}</h3>
                            <p>{movie.time} min {movie.year}</p>
                        </div>
                        </Link>
                
                    </Col>
                ))}
            </Row >

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

export default Movies