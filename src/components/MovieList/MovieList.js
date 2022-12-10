import React from 'react';
import DetailsMovie from '../../pages/DetailsMovie';

import classes from '../MovieList/MovieList.module.css';

const MovieList = (props) => {
    return (
        <ul className={classes['movies-list']}>
            {props.movie.map((movies) => (
                <DetailsMovie
                    key={movies.imdbID}
                    title={movies.Title}
                    year={movies.Year}
                    country={movies.Country}
                    poster={movies.Poster}
                />
            ))}
        </ul>
    );
};

export default MovieList;
