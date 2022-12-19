import React from 'react';
import { Divider } from 'antd';
import SearchForm from '../components/SearchForm/SearchForm';
import Container from '../components/Container/Container';
import FavoriteBtn from '../components/Button/FavoriteBtn';

const SearchMovie = () => {


   return (
      <>
         <Container>
            <Divider
               style={{ border: 'none', marginTop: '2rem' }}
            />
            <FavoriteBtn />

            <Divider
               style={{ border: 'none', marginTop: '9rem' }}
            />
            <SearchForm />
         </Container>
      </>


   );
}

export default SearchMovie;
