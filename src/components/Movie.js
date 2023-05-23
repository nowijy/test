import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

function Movie({id, title, cover }) {
    return (
        <li>
            <Link to={`/movie/${id}`}><p className="title">{title}</p></Link>
            <Link to={`/movie/${id}`}><p className="image"><img src={cover} alt={title} /></p></Link>
        </li>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}
export default Movie;