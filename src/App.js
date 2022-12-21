import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './routes';
import AuthContext from './context/auth-context';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import api from './api/index';
import SearchMovie from './pages/SearchMovie';
import routes from './routes';

const DetailsMovie = lazy(() => {
   return import('./pages/DetailsMovie');
});

const FavoriteList = lazy(() => {
   return import('./pages/FavoriteList');
});

const App = () => {
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
                  Genre: response.Genre
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
      <AuthContext.Provider
         value={{
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
         }}
      >
         <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <p style={{ color: '#00e36a', fontSize: '1.5em' }}>Loading...</p>
               <LoadingOutlined style={{ fontSize: '27px', color: '#00e36a' }} />
            </div>
         }> <Route path={routes.empty}>
               <Redirect to={routes.home} />
            </Route>
            <Route path={routes.empty} component={SearchMovie} />
            <Route path={routes.details} component={DetailsMovie} />
            <Route path={routes.favorite} component={FavoriteList} />

         </Suspense>
      </AuthContext.Provider>
   )
}

export default App;
