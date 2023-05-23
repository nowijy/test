import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../scss/home.module.css";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovieList(json.data.movie);
        setLoading(false);
    } 
    useEffect(() => {
        getMovie();
    }, [])
    return (
        <div>
            { loading ? <h1>loading...</h1> : (
                <>
                    <h1>{ movieList.title_long }</h1> 
                    <Link to="/">뒤로가기</Link>
                    <ul className={styles.column}>
                        <li><img src={ movieList.large_cover_image } alt=""/></li>
                        {movieList.genres.length === 0 ? null : (
                            <li>
                                {movieList.genres.length >= 2 ? 
                                    movieList.genres.map((item) => (
                                        <p>{item}</p>
                                    )) : movieList.genres[0]
                                }
                            </li>
                        )}
                        <li>{movieList.description_full}</li>
                    </ul> 
                </>
            )}
        </div>
    );
}
export default Detail;