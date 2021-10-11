import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Lobby from './components/Lobby';
import Game from './components/Game';
import End from './components/End';
import Eliminated from './components/Eliminated';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

function App() {
  return (
      <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/lobby" component={Lobby} />
            <Route path="/game" component={Game} />
            <Route path="/end" component={End} />
            <Route path="/eliminated" component={Eliminated} />
          </Switch>
      </main>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
