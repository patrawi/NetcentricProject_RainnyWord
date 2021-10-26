import React, { useState } from 'react';
import {
    makeStyles,
    Container,
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,

  } from '@material-ui/core';

import { socket} from '../services/Socket';

import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root:{

    },
    title : {
        fontSize : '3em',
    },
    inputBox : {
        backgroundColor : "#D2A677",
        width : "50%",
        margin : "0 auto",
        padding : "2em"
    },
    activeBtn : {
        margin : "5em auto",
        textAlign : "center",
        textDecoration : "none",
    },
    link : {
        textDecoration : "none",
    }
  }));

interface HomepageProp {
    
}

const Homepage : React.FC<HomepageProp> = () => {
    const classes = useStyles();

    
    const [name, setName ] = useState<string>("")

    const changeNameHandle = (e : React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
     
    }
    const handleAddPlayer =  async () => {
        socket.emit("onAddPlayer",name);
    }
    

    return (
        <>
  
          <Container  >
            <Box >
                <Typography className = {classes.title} variant = "h1" align = "center" >Rainy Word</Typography>
            </Box>
            <Box mt = {3} />
                <Card className = {classes.inputBox} >
                    <CardContent>
                        <Typography variant = "h5">
                            Please Enter Your Name
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField color = "primary" id = "name" label = "John Doe" variant = "outlined" onChange = {(e : React.ChangeEvent<HTMLInputElement>) => {changeNameHandle(e)}} fullWidth />
                    </CardActions>
                </Card>
                <Link to = {{
                    pathname : "/Lobby",
                    state : {
                        name : name
                    }
                 
                }}
                style={{ textDecoration: 'none' }}
                >
                    <Box className  = {classes.activeBtn}>
                        <Button  variant = "contained" color = "primary" size = "large" onClick = {handleAddPlayer}>Connect</Button>
                    </Box>
                </Link>
          
              

        
           
        </Container>
        </>
      
    )
    
}


export default Homepage;
