import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats';
import Question from './components/Question';
import AddQuestion from './components/AddQuestion';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/stats' component={Stats} />
    <Route path='/questions/:id' component={Question} />
    <Route path='/add' component={AddQuestion} />
  </Route>
);
