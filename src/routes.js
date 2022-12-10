import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchMovie from './pages/SearchMovie';


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
         </Switch>
      )}
   />
);

export default Index;
