import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from "../../services"
import { TiDelete } from "react-icons/ti"
import { Link } from 'react-router-dom';



const MovieDetail = () => {
    const { idMovie } = useParams()
    console.log(idMovie);
    const [movies, setMovies] = useState([])

    const getMovie = async () => {
        try {
            const result = await getMovieById(idMovie)
            setMovies(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (idMovie) {
            getMovie()
        }
    }, [idMovie])

    console.log(movies);
    return (
        <>
            <div className='detail-card'>
                <Link to={`/movies`}>
                    <TiDelete style={{ fontSize: "60px", float: "right" }} />
                </Link>
                <h2>Movie Detail</h2>
                <div>
                    <h3>{movies.name}</h3>
                    <p>{movies.time} min {movies.year}</p>
                    <p className="introduction">Introduction: {movies.introduce}</p>
                    {movies.image && <img src={movies.image} alt={movies.name} style={{ width: "350px" }} />}
                </div>
            </div>
        </>
    );
};

export default MovieDetail;