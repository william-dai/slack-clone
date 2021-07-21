import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './Login';
import Channels from './Channels';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Login/>
        </Route>
        <Route path="/channels">
          <Channels/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
