import React, { Dispatch, SetStateAction } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type HowToPlayModalProp = {
  openHowToPlay: boolean;
  setOpenHowToPlay: Dispatch<SetStateAction<boolean>>;
};

export const HowToPlayModal = (props: HowToPlayModalProp) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => props.setOpenHowToPlay(false)}
      />
      <div>
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: "1em", fontWeight: "bold" }}
        >
          How to Play?
        </Typography>
        <Typography variant="h6" align="left">
          1. Enter your name in the text box.
        </Typography>
        <Typography variant="h6" align="left">
          2. Press Connect.
        </Typography>
        <Typography variant="h6" align="left">
          3. Wait for the game to start.
        </Typography>
        <Typography variant="h6" align="left">
          4. Type in falling word.
        </Typography>
        <Typography variant="h6" align="left">
          5. Press enter when complete to earn score!
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 500,
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  closeIcon: {
    fontSize: 32,
    color: "black",
  },
});
