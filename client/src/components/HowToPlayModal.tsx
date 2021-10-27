import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography, withStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


type HowToPlayModalProp = {
  openHowToPlay: boolean;
  setOpenHowToPlay: Dispatch<SetStateAction<boolean>>;
};

export const HowToPlayModal = (props: HowToPlayModalProp) => {
  const styles = useStyles();
  const handleClose = () => {
    props.setOpenHowToPlay(false);
  }
  return (

    <div>

    <Dialog onClose={() => props.setOpenHowToPlay(false)} aria-labelledby="customized-dialog-title" open={props.openHowToPlay}>
      <DialogTitle id="customized-dialog-title" >
        <Box  display = "flex">
          <Box className = {styles.title} >
              <Typography variant = "h6">How to Play</Typography>
          </Box>
        <IconButton aria-label="close" onClick={() => props.setOpenHowToPlay(false)}>
          <CloseIcon />
        </IconButton>
        </Box>
        
      </DialogTitle>
      <DialogContent className = {styles.content} dividers >
        <Typography  variant="h6" gutterBottom >
         1. Enter your name in the text box.
        </Typography>
        <Typography  variant="h6" gutterBottom >
          2. Press Connect.
        </Typography>
        <Typography  variant="h6" gutterBottom >
          3. Wait for the game to start.
        </Typography>
        <Typography  variant="h6" gutterBottom >
         4. Type in falling word.
        </Typography>
        <Typography variant="h6"  gutterBottom >
          5. Press enter when complete to earn score!
        </Typography>
      </DialogContent>

    </Dialog>
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
  title : {
    flexGrow : 1,
    marginTop : '0.8em',
    color : "black"
  },
  content : {
    color : "black"
  }
});

 