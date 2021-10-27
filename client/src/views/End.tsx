import React , {useState,  useContext} from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import {useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import { User } from '../interfaces/User'
import { SocketContext } from '../context/SocketContext';
import {AppContext} from '../context/AppContext';

const Endpage = () => {
    const {socket, playerList, updatePlayerlist} = useContext(SocketContext)
    const {user, players} = useContext(AppContext);

  const handlePlayer = () => {
    if (socket) {

        if(user.id) socket.emit("updateLeaderboard",{id: user.id, score: user.score})
    }
  };
    useEffect(() => {
        handlePlayer();
    },[])
    return (
        <React.Fragment>
            <Container maxWidth="sm"> 
                <Box sx={{ mt: 12}}>
                    <span>{players[0]?.score}</span>
                    <Typography variant="h4" component="h1" style={{ backgroundColor:"#FFB800", padding:"1em" }} align="center" gutterBottom>
                        Winner! { socket?.id === players[0]?.id ? "You win!" : players[0].name}<br/>
                    </Typography>
                </Box>

                
            </Container>

            <Container maxWidth="sm">

                <Box sx={{ mt: 8, display:"flex", justifyContent:"center", alignItems:"center" }}>
                <span>{players[1]?.score}</span>
                    <Typography display="inline" variant="h4" component="h1" style={{ backgroundColor:'#ECECEC', padding:'1em' }} gutterBottom>
                        2nd Place: { socket?.id === players[1]?.id ? "You got second place!" : players[1].name}<br/>
                    </Typography>
                    <span>{players[2]?.score}</span>
                    <Typography display="inline" variant="h4" component="h1" style={{ backgroundColor:'#ECECEC', padding:'1em' }} gutterBottom>
                        3rd Place: { socket?.id === players[2]?.id ? "You got third place!" : players[2].name} <br/> 
                    </Typography>
                </Box>
            </Container>

            <Container maxWidth="sm">
                <Box sx={{ mt: 12, display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Typography display="inline" variant="h4" component="h1" style={{ padding:'1em' }} gutterBottom>
                        You Scored: {user?.score} !
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>

    )
    
}


export default Endpage;
