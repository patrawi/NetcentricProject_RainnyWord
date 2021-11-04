import { Box, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";

export interface TimerProp {
  initialSeconds: number | undefined
  handleTimeout ?: () => void;
  isGame: boolean;
}

const TimerPage: React.FC<TimerProp> = ({
  initialSeconds,
  handleTimeout,
  isGame,
}) => {
  const classes = useStyles();
  const [seconds, setSeconds] = useState(initialSeconds);


  return (
    <Box className={classes.center}>
      {seconds === 0 ? null : (
        <Typography align="center" variant="h4">
          {isGame
            ? `the Game will end in ${seconds} `
            : ` The Game will start in ${seconds}...`}
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
