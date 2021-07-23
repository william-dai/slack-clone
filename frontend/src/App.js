/**
 * Sources:
 * https://stackoverflow.com/questions/52401960/multiline-secondary-text-for-list-react-component
 * https://material-ui.com/
 * https://code-boxx.com/url-parts-javascript/
 */

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './Login';
import Channels from './Channels';
import Messages from './Messages';
import Replies from './Replies';
import DMs from './DMs';

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
        <Route path="/dms">
          <DMs/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
