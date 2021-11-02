import React, { useState } from "react";
import Home from "./views/Home";
import Lobby from "./views/Lobby";
import End from "./views/End";
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
    overrides: {
      MuiOutlinedInput: {
        input: {
          "&::placeholder": {
            color: "red",
          },
          color: "black",
        },
      },
    },
    palette: {
      background: {
        default: "#DDDAE1",
      },
      secondary: {
        main: "#ffa000",
      },
      primary: {
        main: "#4527a0",
      },
    },
  });
  const themeDark = createTheme({
    typography: {
      fontFamily: ["Bebas Neue", "cursive"].join(","),
    },
    overrides: {
      MuiOutlinedInput: {
        input: {
          "&::placeholder": {
            color: "white",
          },
          color: "white",
        },
      },
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
        main: "#BC3908",
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
