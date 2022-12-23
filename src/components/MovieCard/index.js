import React, { useContext } from 'react';

import AuthContext from '../../context/auth-context';
import { Card } from 'antd';
import StarIcon from '../StarIcon/StarIcon';
import classes from '../MovieCard/styles.module.css';


function MovieCard() {

   const context = useContext(AuthContext);

   const card = context.addToFavoriteList && (
      <Card
         hoverable
         style={{ width: 240 }}
         cover={
            context.movie.Poster !== 'N/A' && <img alt='movie' src={context.movie.Poster} />
         }
      >
         <ul className={classes.details}>
            <h2>{context.movie.Title}
               <StarIcon />
            </h2>

            <li>Year:  {context.movie.Year}</li>
            <li>Genre:  {context.movie.Genre}</li>
            <li>Country:  {context.movie.Country}</li>
            <li>Rated:  {context.movie.Rated}</li>
         </ul>
      </Card>
   )
   return <>{card}</>;
}
export default MovieCard;

