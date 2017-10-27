import React from 'react';
import {Switch, Route} from 'react-router';

import AppRoot from './AppRoot';
import List from './List';
import Home from './Home';
import {Link} from 'react-router-dom';

const App = () => (
  <div>
    <Link to="/home"> Home </Link>
    <Link to="/list"> List </Link>

    <Switch>
      <Route path="/list" component={List}/>
      <Route path="/home" component={Home}/>
      <Route path="/" component={AppRoot}/>
    </Switch>
  </div>
);

export default App;
