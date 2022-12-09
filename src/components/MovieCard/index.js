import * as React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { StarFilled, DeleteOutlined } from '@ant-design/icons';
import classes from '../MovieCard/styles.module.css';

const { Meta } = Card;
function MovieCard({ movie, addToFavoriteList, removeFromFavoriteList }) {
   let card = '';
   if (removeFromFavoriteList) {
      card = (
         <Card
            style={{ width: '100%', margin: '10px auto' }}
            actions={[
               <DeleteOutlined
                  onClick={() => removeFromFavoriteList(movie.Title)}
               />
            ]}
         >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
               <img alt="ups" style={{ width: '150px', height: '150px' }} src={movie.Poster} />
               <br />
               <Meta title={movie.Title} />
               <br />
               <Meta title={movie.Year} />
               <br />
               <Meta title={movie.Country} />
            </div>
         </Card>
      );
   } else {
      card = (
         <Card
            style={{ width: '100%', maxWidth: 300, margin: '10px auto' }}
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
                        key='addWishlist'
                        onClick={() => addToFavoriteList(movie)}
                     />
                     <StarFilled
                        style={{ color: 'yellow', fontSize: '25px' }}
                        key='addWishlist'
                        onClick={() => addToFavoriteList(movie)}
                     />
                     <StarFilled
                        style={{ color: 'yellow', fontSize: '25px' }}
                        key='addWishlist'
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
   return <><li>{card}
   </li></>;
}
export default MovieCard;

MovieCard.propTypes = {
   movie: PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Rated: PropTypes.string.isRequired,
      Country: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      like: PropTypes.bool.isRequired,
   }).isRequired,
   addToFavoriteList: PropTypes.func,
   removeFromFavoriteList: PropTypes.func,
   toggleLike: PropTypes.func,
};
