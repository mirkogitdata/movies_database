import React, { useState, useEffect } from 'react';
import { message, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AuthContext from '../context/auth-context';
import api from '../api';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieCard from '../components/MovieCard';
import FavoriteList from './FavoriteList';
import Container from '../components/Container/Container';
import FavoriteBtn from '../components/Button/FavoriteBtn';

function SearchMovie(props) {
   const [loading, setLoading] = useState(false);
   const [movie, setMovie] = useState(null);
   const [favorite, setFavorite] = useState([]);
   const [modalShow, setModalShow] = useState(false);

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
         <AuthContext.Provider value={{
            movie: movie,
            addToFavoriteList: addToFavoriteList,
            modalShow: modalShow,
            setModalShow: setModalShow,
            favorite: favorite,
            setFavorite: setFavorite,
            removeFromFavoriteList: removeFromFavoriteList,
            loading: loading,
            setLoading: setLoading,
            onFetchmovie: fetchMovie,

         }}>
            <Container>
               <Divider
                  style={{ border: 'none', marginTop: '2rem' }}
               />
               <FavoriteBtn />
               <FavoriteList />
               <Divider
                  style={{ border: 'none', marginTop: '5rem' }}
               />
               <SearchForm />
               {!loading ? (
                  movie && <MovieCard movie={movie} addToFavoriteList={addToFavoriteList} />
               ) : (
                  <LoadingOutlined style={{ fontSize: '36px', color: 'white' }} />
               )}
               {loading && <p>Loading...</p>}
            </Container>
         </AuthContext.Provider>
      </>


   );
}

export default SearchMovie;
