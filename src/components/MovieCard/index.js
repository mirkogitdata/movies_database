import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { Card } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import classes from '../MovieCard/styles.module.css';

function MovieCard() {

   const [click, setClick] = useState(false);

   const context = useContext(AuthContext);

   const clickedStar = () => {
      setClick(true)
      context.addToFavoriteList(context.movie)
   }


   const card = context.addToFavoriteList && (
      <Card
         hoverable
         style={{ width: 200, border: '2px solid #00e36a' }}
         cover={
            context.movie.Poster !== 'N/A' && <img alt='movie' src={context.movie.Poster} />
         }
      >
         <ul className={classes.details}>
            <h2>{context.movie.Title}
               <span>
                  {
                     !click ? (<StarOutlined
                        style={{ color: '#00e36a', fontSize: '24px' }}
                        onClick={clickedStar}
                     />) : (<StarFilled
                        style={{ color: '#00e36a', fontSize: '24px' }}
                     />)
                  }

               </span>
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

