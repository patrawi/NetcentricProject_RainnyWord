import {
  Toolbar,
  AppBar,
  IconButton,
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { AppContext } from "../context/AppContext";
interface NavbarProp {
  handleToggleDark: () => void;
}

const Navbarpage: React.FC<NavbarProp> = ({ handleToggleDark }) => {
  const classes = useStyles();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { onBgm, setOnBgm, onSfx, setOnSfx } = useContext(AppContext);
  const handleClickBgmIcon = () => {
    setOnBgm(!onBgm);
  };
  const handleClickSfxIcon = () => {
    setOnSfx(!onSfx);
  };

  const handleClickDarkMode = () => {
    handleToggleDark();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <AppBar position="static" className={classes.root} color="secondary">
        <Toolbar>
          <Box className={classes.title}>
            <Button component={Link} to="/" className={classes.navButton}>
              Home
            </Button>
            <Button component={Link} to="/admin" className={classes.navButton}>
              Admin
            </Button>
          </Box>
          <IconButton
            aria-label="Toggle Dark Mode"
            className={classes.button}
            onClick={handleClickDarkMode}
          >
            {isDarkMode ? <Brightness2Icon /> : <Brightness7Icon />}
          </IconButton>
          <IconButton
            aria-label="Toggle Background Music"
            className={classes.button}
            onClick={handleClickBgmIcon}
          >
            {onBgm ? <MusicNoteIcon /> : <MusicOffIcon />}
          </IconButton>
          <IconButton
            aria-label="Toggle SFX"
            className={classes.sfx}
            onClick={handleClickSfxIcon}
          >
            <span>{onSfx ? "SFX ON" : "SFX OFF"} </span>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box mb={5} />
    </>
  );
};

export default Navbarpage;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    width: "2em",
    height: "2em",
    fontSize: "2em",
    color: "#fff",
  },
  sfx: {
    fontSize: "1em",
    color: "#fff",
  },
  navButton: {
    fontSize: "1em",
  },
}));
