import { makeStyles, Theme, Typography } from "@material-ui/core";

import React, { useEffect, useRef } from "react";

interface WordBoxProp {
  word: string;
  location: string;
  destroyed: boolean;
  onDropped: () => void;
  dangerWord: boolean;
}

const useStyles = makeStyles<Theme>({
  root: {},
  rain: {
    position: "fixed",
    top: "10vh",
    animation: `$fall 4s linear`,
    color: "black",
    zIndex : -100,
  },
  dangerWord: {
    position: "fixed",
    top: "10vh",
    animation: `$fall 4s linear`,
    color: "red",
    zIndex : -100,
  },
  "@keyframes fall": {
    from: {
      transform: "translateY(0vh)",
    },
    to: {
      transform: "translateY(70vh)",
    },
  },
  hidden: {
    display: "none",
    opacity: 0,
  },
});

const WordBoxPage: React.FC<WordBoxProp> = ({
  word,
  location,
  destroyed,
  onDropped,
  dangerWord,
}) => {
  const classes = useStyles();
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      onDropped();
    }, 4000);
  }, []);

  if (dangerWord) {
    return (
      <>
        <div
          ref={boxRef}
          className={!destroyed ? classes.dangerWord : classes.hidden}
          style={{ left: location }}
        >
          <Typography variant="h6">{word}</Typography>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        ref={boxRef}
        className={!destroyed ? classes.rain : classes.hidden}
        style={{ left: location }}
      >
        <Typography variant="h6">{word}</Typography>
      </div>
    </>
  );
};

export default WordBoxPage;
