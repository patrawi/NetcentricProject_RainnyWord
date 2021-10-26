import { Toolbar,
         AppBar,
         IconButton,    
         Typography,
         Button,
         makeStyles,
         Box,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow : 1,
    },
    title : {
        flexGrow : 1,
    }
  }));



interface NavbarProp {

  handleToggleDark : () => void;
}

const Navbarpage : React.FC<NavbarProp> = ({handleToggleDark}) => {
    const classes = useStyles();
    return (
        <>
        
            <AppBar position="static" className = {classes.root} color = "secondary">
                <Toolbar>
                 <Box className = {classes.title}>
                    <Button component = {Link} to = "/">Home</Button>
                    <Button component = {Link} to = "/admin">Admin</Button>
                 </Box>
                <Button onClick = {handleToggleDark} >Dark mode</Button>
                </Toolbar>
            </AppBar>
            <Box mb = {5} />
        </>
    )
    
}


export default Navbarpage;
