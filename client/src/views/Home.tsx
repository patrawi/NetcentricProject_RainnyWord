import React, { useEffect, useState } from 'react';
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
import Navbarpage from '../components/Navbar'
import { socket} from '../services/Socket';
import axios from 'axios';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root:{

    },
    title : {
        fontSize : '3em',
    },
    inputBox : {
        backgroundColor : "#FFB800",
        width : "50%",
        margin : "0 auto",
        padding : "2em"
    },
    activeBtn : {
        margin : "5em auto",
        textAlign : "center"
    },

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
                <Typography className = {classes.title} variant = "h1" align = "center">Rainy Word</Typography>
            </Box>
            <Box mt = {3} />
                <Card className = {classes.inputBox}>
                    <CardContent>
                        <Typography variant = "h5">
                            Please Enter Your Name
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField id = "name" label = "John Doe" variant = "outlined" onChange = {(e : React.ChangeEvent<HTMLInputElement>) => {changeNameHandle(e)}} fullWidth />
                    </CardActions>
                </Card>
                <Link to = "/Lobby.tsx">
                    <Box className  = {classes.activeBtn}>
                        <Button  variant = "contained" color = "secondary"  size = "large" onClick = {handleAddPlayer}>Connect</Button>
                    </Box>
                </Link>
              

        
           
        </Container>
        </>
      
    )
    
}


export default Homepage;
