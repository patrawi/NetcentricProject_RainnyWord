import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    lose : {
        marginTop : "5em",
        textAlign : "center"
    }
}))
interface EliminatedProp {
    
}

const Eliminatedpage : React.FC<EliminatedProp> = () => {
    const classes = useStyles();
    return (
     <>

      <Box className = {classes.lose} >
        <Typography variant = "h1" align = "center" >You Lose</Typography>
        <Box my = {5}/>
        <Button component = {Link} to = "/" color="secondary" variant = "contained" >Home</Button>
      </Box>
     
     </>
        
        
    )
    
}


export default Eliminatedpage;
