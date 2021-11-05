import { useEffect, useContext } from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";
import { SocketContext } from "../context/SocketContext";

export interface CountdownProp {
 
  handleTime : () => void;
  gameTime : number;
}

const Countdown: React.FC<CountdownProp> = ({ handleTime, gameTime}) => {
  const classes = useStyles();


    useEffect(() => {
      let interval = setInterval(() => {
        if(gameTime > 0) {
          handleTime();
        }
      }, 1000)
      return () => {
        clearInterval(interval);
      }
      
    }, [gameTime]);



  return (
    <Box className={classes.center}>
    
        <Typography align="center" variant="h5">
          The game will end in {gameTime} seconds.
        </Typography>
    

    </Box>
  );
};

export default Countdown;

const useStyles = makeStyles<Theme>({
  root: {},
  center: {
    textAlign: "center",
  },
});
