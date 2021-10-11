import React from 'react';
import Home from './views/Home'
import Lobby from './views/Lobby';
import Game from './views/Game';
import End from './views/End';
import Eliminated from './views/Eliminated';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './views/Admin';


function App() {
  return (
      <>
            <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/lobby" component={Lobby} />
            <Route path="/game" component={Game} />
            <Route path="/end" component={End} />
            <Route path="/eliminated" component={Eliminated} />
            <Route path = "/admin" component = {Admin} />
          </Switch>
      </BrowserRouter>
      {/* <div>learn react</div> */}
      </>

  )
}
export default App;
