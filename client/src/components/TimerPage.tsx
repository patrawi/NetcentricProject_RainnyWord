import { useEffect, useContext } from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";
import { SocketContext } from "../context/SocketContext";

export interface TimerProp {
  isGame: boolean;
}

const TimerPage: React.FC<TimerProp> = ({ isGame }) => {
  const classes = useStyles();
  const { lobbyTime, gameTime, updateLobbyTime, updateGameTime } =
    useContext(SocketContext);

  useEffect(() => {
    updateLobbyTime();
  }, [lobbyTime]);

  useEffect(() => {
    updateGameTime();
  }, [gameTime]);

  return (
    <Box className={classes.center}>
      {isGame ? (
        <Typography align="center" variant="h5">
          The game will end in {gameTime} seconds.
        </Typography>
      ) : (
        <Typography align="center" variant="h5">
          The game will start in {lobbyTime} seconds.
        </Typography>
      )}
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
