import React, { useState } from "react";
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
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import SocketContextProvider from "./context/SocketContext";
import Socket from "./services/Socket";

function App() {
  const [toggleDark, setToggleDark] = useState(false);

  const themeLight = createTheme({
    typography: {
      fontFamily: ["Bebas Neue", "cursive"].join(","),
    },
    
    palette: {
      background: {
        default: "#DDDAE1",
      },
      secondary: {
        main:"#6200ea",
      },
      primary : {
        main :  "#ffa726"
      }
    },
  });
  const themeDark = createTheme({
    typography: {
      fontFamily: ["Zen Kurenaido", "sans-serif"].join(","),
    },
    palette: {
      background: {
        default: "#242B2C",
      },
      text: {
        primary: "#ffffff",
      },
      secondary: {
        main: "#465FB6",
      },
      primary: {
        main: "#E02B31",
      },
    },
  });
  const handleToggleDark = () => {
    setToggleDark(!toggleDark);
  };
  return (
    <>
      <ThemeProvider theme={toggleDark ? themeDark : themeLight}>
        <CssBaseline />
        <AppContextProvider>
          <SocketContextProvider>
            <Socket>
              <BrowserRouter>
                <Navbarpage handleToggleDark={handleToggleDark} />

                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/lobby" component={Lobby} />
                  <Route path="/Game" component={Gamepage} />
                  <Route path="/end" component={End} />
                  <Route path="/eliminated" component={Eliminated} />
                  <Route path="/admin" component={Admin} />
                </Switch>

                <Footerpage />
              </BrowserRouter>
            </Socket>
          </SocketContextProvider>
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
}
export default App;
