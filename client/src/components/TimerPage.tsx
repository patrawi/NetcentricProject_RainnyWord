import React from "react";
import { useEffect, useContext } from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { SocketContext } from "../context/SocketContext";

interface TimeProp {
    isGame : boolean
}

const TimerPage : React.FC<TimeProp> = ({isGame}) => {
  const classes = useStyles();
  const { lobbyTime, updateLobbyTime, updateGameTime, gameTime } = useContext(SocketContext);

  useEffect(() => {
    updateLobbyTime();
    updateGameTime();
  }, [lobbyTime, updateLobbyTime, updateGameTime, gameTime]);

  return (
    <Box className={classes.center}>
      {!isGame ?  <Typography align="center" variant="h5">
        The game will start in {lobbyTime} seconds.
      </Typography> : 
       <Typography align="center" variant="h5">
       countdown time : {gameTime}
     </Typography>
      }
     
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
