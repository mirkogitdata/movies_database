import React, { useContext } from "react";
import AuthContext from "../context/auth-context";
import MovieCard from "../components/MovieCard";
import { LoadingOutlined } from '@ant-design/icons';
import classes from '../pages/DetailsMovie.module.css';
const DetailsMovie = () => {

    const context = useContext(AuthContext);

    return (
        <section id="detailsMovie" className={classes.detailsMovie}>
            {context.loading && <p>Loading...</p>}
            {!context.loading ? (
                context.movie && <MovieCard />
            ) : (
                <LoadingOutlined style={{ fontSize: '36px', color: '#00e36a' }} />
            )}
        </section>
    )
}

export default DetailsMovie;