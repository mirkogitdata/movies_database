import * as React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { StarFilled, DeleteOutlined } from '@ant-design/icons';
import classes from '../MovieCard/styles.module.css';

function MovieCard({ movie, addToFavoriteList, removeFromFavoriteList }) {
   let card = '';
   if (removeFromFavoriteList) {
      card = (
         <Card
            style={{ width: '100%', margin: '10px auto', background: 'rgba(51, 56, 61, 1)' }}
            actions={[
               <DeleteOutlined style={{ fontSize: '1.3rem' }}

                  onClick={() => removeFromFavoriteList(movie.Title)}
               />
            ]}
         >
            <ul className={classes.dropDetails} >
               <img alt="ups" src={movie.Poster} />
               <li>
                  <p>{movie.Title}</p>
                  <p>year: {movie.Year}</p>
                  <p>country: {movie.Country}</p>
               </li>
            </ul>
         </Card>
      );
   } else {
      card = (
         <Card
            hoverable
            style={{ width: 340 }}
            cover={
               movie.Poster !== 'N/A' && <img alt='movie' src={movie.Poster} />
            }
         >
            <ul className={classes.details}>
               <h2>{movie.Title}
                  <span>
                     <StarFilled
                        className='star'
                        style={{ color: 'yellow', fontSize: '25px' }}
                        onClick={() => addToFavoriteList(movie)}
                     />
                     <StarFilled
                        style={{ color: 'yellow', fontSize: '25px' }}
                        onClick={() => addToFavoriteList(movie)}
                     />
                     <StarFilled
                        style={{ color: 'yellow', fontSize: '25px' }}
                        onClick={() => addToFavoriteList(movie)}
                     />
                  </span>
               </h2>

               <li>Year:  {movie.Year}</li>
               <li>Rated: {movie.Rated}</li>
               <li>Country:  {movie.Country}</li>
            </ul>
         </Card>
      );
   }
   return <>{card}</>;
}
export default MovieCard;

MovieCard.propTypes = {
   movie: PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Rated: PropTypes.string.isRequired,
      Country: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired
   }).isRequired,
   addToFavoriteList: PropTypes.func,
   removeFromFavoriteList: PropTypes.func
};
