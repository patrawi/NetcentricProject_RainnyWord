import { Toolbar, AppBar, makeStyles } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  footer: {
    top: "auto",
    bottom: 0,
    zIndex: -100,
  },
}));



interface FooterProp {

}

const Footerpage : React.FC<FooterProp> = () => {
    const classes = useStyles();
return (
   <>
       <AppBar position="fixed" className = {classes.footer} color = "secondary">
           <Toolbar />
       </AppBar>
   </>
)

}


export default Footerpage;
