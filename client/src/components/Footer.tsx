import { Toolbar,
    AppBar,   
    Typography,
    Button,
    makeStyles,

} from '@material-ui/core';

import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
        
    root:{
        
    },
    footer : {
        top : 'auto',
        bottom : 0,
    }


}));



interface FooterProp {

}

const Footerpage : React.FC<FooterProp> = () => {
    const classes = useStyles();
return (
   <>
       <AppBar position="fixed" className = {classes.footer}>
           <Toolbar />
       </AppBar>
   </>
)

}


export default Footerpage;
