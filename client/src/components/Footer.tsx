import React from "react";
import { Toolbar, AppBar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  footer: {
    top: "auto",
    bottom: 0,
    zIndex: 1,
    overFlow : 'scroll',
    
  },
}));

const Footerpage = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position= "fixed" className={classes.footer} color="secondary">
        <Toolbar />
      </AppBar>
    </>
  );
};

export default Footerpage;
