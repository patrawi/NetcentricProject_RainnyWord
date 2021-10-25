import React from "react";
import Home from "./views/Home";
import Lobby from "./views/Lobby";
import End from "./views/End";
import Eliminated from "./views/Eliminated";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./views/Admin";
import Navbarpage from "./components/Navbar";
import Footerpage from "./components/Footer";
import Gamepage from "./views/Game";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Navbarpage />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/lobby" component={Lobby} />
            <Route path="/Game" component={Gamepage} />
            <Route path="/end" component={End} />
            <Route path="/eliminated" component={Eliminated} />
            <Route path="/admin" component={Admin} />
          </Switch>
          <Footerpage />
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
