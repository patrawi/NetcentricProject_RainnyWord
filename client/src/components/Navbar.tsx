import { Toolbar,
         AppBar,
         IconButton,    
         Typography,
         Button,
         makeStyles,
         Box,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root:{
      
    },

  }));



interface NavbarProp {
    
}

const Navbarpage : React.FC<NavbarProp> = () => {
    const classes = useStyles();
    return (
        <>
        
            <AppBar position="static" className = {classes.root}>
                <Toolbar>
                    <Button component = {Link} to = "/" color="inherit">Home</Button>
                    <Button component = {Link} to = "/admin" color="inherit">Admin</Button>
                </Toolbar>
            </AppBar>
            <Box mb = {5} />
        </>
    )
    
}


export default Navbarpage;
