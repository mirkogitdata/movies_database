import React from 'react';
import DetailsMovie from '../../pages/DetailsMovie';

import classes from '../MovieList/MovieList.module.css';

const MovieList = (props) => {
    return (
        <ul className={classes['movies-list']}>
            {props.movie.map((movie) => (
                <DetailsMovie
                    key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                />
            ))}
        </ul>
    );
};

export default MovieList;
