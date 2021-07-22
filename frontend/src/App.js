import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './Login';
import Channels from './Channels';
import Messages from './Messages';
import Replies from './Replies';

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
        <Route path="/messages">
          <Messages/>
        </Route>
        <Route path="/replies">
          <Replies/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
