import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { StarFilled, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import classes from '../MovieCard/styles.module.css';

function MovieCard(props) {

   const [click, setClick] = useState(false);

   const clickedStar = () => {
      setClick(true)
      props.addToFavoriteList(props.movie)
   }

   let card = '';

   props.removeFromFavoriteList ? card = (
      <Card
         style={{ width: '100%', margin: '10px auto', background: 'rgba(51, 56, 61, 1)' }}
         actions={[
            <DeleteOutlined style={{ fontSize: '1.3rem' }}

               onClick={() => props.removeFromFavoriteList(props.movie.Title)}
            />
         ]}
      >
         <ul className={classes.dropDetails} >
            <img alt="ups" src={props.movie.Poster} />
            <li>
               <p>{props.movie.Title}</p>
               <p>year: {props.movie.Year}</p>
               <p>country: {props.movie.Country}</p>
            </li>
         </ul>
      </Card>
   ) : card = (
      <Card
         hoverable
         style={{ width: 340 }}
         cover={
            props.movie.Poster !== 'N/A' && <img alt='movie' src={props.movie.Poster} />
         }
      >
         <ul className={classes.details}>
            <h2>{props.movie.Title}
               <span>
                  {
                     !click ? (<StarOutlined
                        style={{ color: '#00e36a', fontSize: '29px' }}
                        onClick={clickedStar}
                     />) : (<StarFilled
                        style={{ color: '#00e36a', fontSize: '29px' }}
                     />)
                  }

               </span>
            </h2>

            <li>Year:  {props.movie.Year}</li>
            <li>Rated: {props.movie.Rated}</li>
            <li>Country:  {props.movie.Country}</li>
         </ul>
      </Card>
   )
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
