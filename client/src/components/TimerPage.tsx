import { useEffect, useContext } from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";
import { SocketContext } from "../context/SocketContext";

export interface TimerProp {
  isGame: boolean;

}

const TimerPage: React.FC<TimerProp> = ({ isGame}) => {
  const classes = useStyles();
  const { socket,lobbyTime,  updateLobbyTime,  } =
    useContext(SocketContext);

    useEffect(() => {
  
      if(lobbyTime === 0 && socket) {
        socket.off("getLobbyCountdown")
      }
      updateLobbyTime();

      
    }, [lobbyTime]);



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
