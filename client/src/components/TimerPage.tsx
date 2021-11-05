import React from "react";
import { useEffect, useContext } from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { SocketContext } from "../context/SocketContext";

const TimerPage = () => {
  const classes = useStyles();
  const { lobbyTime, updateLobbyTime } = useContext(SocketContext);

  useEffect(() => {
    updateLobbyTime();
  }, [lobbyTime, updateLobbyTime]);

  return (
    <Box className={classes.center}>
      <Typography align="center" variant="h5">
        The game will start in {lobbyTime} seconds.
      </Typography>
    </Box>
  );
};

export default TimerPage;

const useStyles = makeStyles<Theme>({
  root: {},
  center: {
    textAlign: "center",
  },
});
