import React from 'react';
import Login from './Login';
import Register from './Register';
import { Route } from 'react-router-dom';
import ArticlesList from './ArticlesList';
import ProtectedRoute from './ProtectedRoute';
import {ArticleContext} from '../context/ArticleContext'

const App = () => {
  return (
    <ArticleContext.Provider>
      <h1>Pintereach</h1>
      <h3>Pintereach helps you organize your research by enabling you to save and organize articles in to categories to read later.</h3>
      <Route exact path="/">
        <Login />
        <Register />
      </Route>
      <ProtectedRoute path="/articles" component={ArticlesList} />
    </ArticleContext.Provider>
  );
}

export default App;