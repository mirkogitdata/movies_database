import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchMovie from './pages/SearchMovie';
import NotFoundPage from './pages/NotFoundPage';

const Index = () => (
   <Route
      render={({ location }) => (
         <Switch location={location}>
            <Route
               path='/'
               component={SearchMovie}
               key='SearchMovie'
               exact={true}
            />
            <Route path='/page404' render={() => SearchMovie ? (<Redirect to='/' />) : (<NotFoundPage />)} />
         </Switch>
      )}
   />
);

export default Index;
