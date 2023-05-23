// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import '../scss/home.module.css'

function Home() {
    const [loading, setLoading] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const getMovies = async () => {
        const json = await (
            await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
        ).json();
        setMovieList(json.data.movies);
        setLoading(false);
    }
    useEffect(() => {
        getMovies();
    }, [])
    
    return (
        <div>
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                   <>
                        <h1>Movie List, 수정을 시도합니다</h1>
                        <ul>
                            { movieList.map((movie) => (
                                <Movie
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title_long} 
                                    cover={movie.medium_cover_image} 
                                    summary={movie.summary} 
                                    genres={movie.genres}
                                />
                            ))}
                         </ul>
                   </>
                ) 
            }

        </div>
    )
}

export default Home;