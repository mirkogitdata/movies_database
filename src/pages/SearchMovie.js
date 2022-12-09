import React, { useState, useEffect } from 'react';
import { message, Button, Input, Divider } from 'antd';
import 'antd/dist/antd.css';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import api from '../api';
import MovieCard from '../components/MovieCard';
import FavoriteList from './FavoriteList';
import Container from '../components/Container/Container';

function SearchMovie(props) {
   const [input, setInput] = useState('');
   const [loading, setLoading] = useState(false);
   const [movie, setMovie] = useState(null);
   const [favorite, setFavorite] = useState([]);
   const [modalShow, setModalShow] = useState(false);
   const [searchInputTimeout, setSearchAInputTimeout] = useState(0);

   useEffect(() => {
      const data = localStorage.getItem('my-favoriteList');
      if (data) {
         setFavorite(JSON.parse(data));
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('my-favoriteList', JSON.stringify(favorite));
   });



   const fetchMovie = async (title) => {
      await fetch(`${api.URL}/?t=${title}&apikey=${api.KEY}`)
         .then((res) => res.json())
         .then(async (response) => {
            if (response.Response === 'False') {
               message.warning('The movie is not found, please try again');
            } else {
               const movie = {
                  imdbID: response.imdbID,
                  Title: response.Title,
                  Year: response.Year,
                  Rated: response.Rated,
                  Country: response.Country,
                  Poster: response.Poster,
                  like: false,
               };
               setMovie(movie);
            }
         })
         .catch((error) => console.log(error));
      setLoading(false);
   };

   const changeHandler = (event) => {
      setInput(event.target.value);
   }

   const submitHandler = (event) => {
      event.preventDefault();
      setLoading(true);
      if (searchInputTimeout) {
         clearTimeout(searchInputTimeout);
      }
      setSearchAInputTimeout(
         setTimeout(() => {
            fetchMovie(input);
            setLoading(false);
         }, 1500)
      );
   }


   const addToFavoriteList = (movie) => {
      if (!favorite.find((m) => m.Title === movie.Title)) {
         setFavorite([...favorite, movie]);
         message.success(`${movie.Title} is added to favorite movies`);
      } else {
         message.warn(`${movie.Title} has aleady been added`);
      }
   };
   const removeFromFavoriteList = (title) => {
      const newFavoriteList = favorite.filter((movie) => movie.Title !== title);
      setFavorite(newFavoriteList);
      message.success(`${title} is removed from favorite movies`);
   };

   return (
      <>
         <Container>
            <Button onClick={() => setModalShow(true)}>
               <EyeOutlined />
               Favorite Movies {favorite.length}
            </Button>
            <FavoriteList
               modalShow={modalShow}
               setModalShow={setModalShow}
               favorite={favorite}
               setFavorite={setFavorite}
               removeFromFavoriteList={removeFromFavoriteList}
            />
            <Divider>Search a movie by name</Divider>
            <form onSubmit={submitHandler}>
               <Input
                  type='search'
                  placeholder='search by movie title'
                  onChange={changeHandler}
               />
               <button>Search</button>
            </form>

            <Divider />
            {!loading ? (
               movie && <MovieCard movie={movie} addToFavoriteList={addToFavoriteList} />
            ) : (
               <LoadingOutlined style={{ fontSize: '36px' }} />
            )}
            {loading && <p>Loading...</p>}
         </Container>

      </>


   );
}

export default SearchMovie;
