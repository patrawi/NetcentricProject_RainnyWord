import React, { useState, useContext } from "react";
import { Container, Typography, Box, Grid, Paper, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../interfaces/User";
import { SocketContext } from "../context/SocketContext";
import { AppContext } from "../context/AppContext";
import PlayerCard from "../components/PlayerCard";


const useStyles = makeStyles((theme) => ({
    root : {

    },
    topic : {
        padding : "0.5em",
    
    }
}))

const Endpage = () => {
  const { socket, updatePlayerList } = useContext(SocketContext);
  const { user, players } = useContext(AppContext);
  const classes = useStyles();

  const handlePlayer = () => {};
  useEffect(() => {
    updatePlayerList();
    console.log(players) 
    console.log(user);
  }, []);
  return (
    <React.Fragment>
        <Container maxWidth = 'md'>
                <Box my = {6}>
                    <Typography align = 'center'>Leaderboard</Typography>
                </Box>
                <Grid container  spacing = {3}>
                    <Grid item xs = {2}>
                        <Paper className = {classes.topic} elevation = {3}>
                            <Typography align = 'center' variant = 'h6' color = "secondary">RANK</Typography>
                        </Paper>
                    </Grid>      
                    <Grid item xs = {2}>
                    <Paper className = {classes.topic} elevation = {3}>
                            <Typography align = 'center' variant = 'h6' color = "secondary">ICON</Typography>
                        </Paper>
                    </Grid>       
                    <Grid item xs = {6}>
                    <Paper className = {classes.topic} elevation = {3}>
                            <Typography align = 'center' variant = 'h6' color = "secondary">NAME</Typography>
                        </Paper>
                    </Grid>     
                    <Grid item xs = {2}>
                    <Paper className = {classes.topic} elevation = {3}>
                            <Typography align = 'center' variant = 'h6' color = "secondary">SCORE</Typography>
                        </Paper>
                    </Grid>     
                </Grid>
                {players.map((player,index) => {
                    let color =   ` #${Math.floor(Math.random()*16777215).toString(16)}`
                    return (
                        <PlayerCard key = {player.id} player = {player} index = {index} color = {color} />
                    )
                })}
                
        </Container>
        
        
  
    </React.Fragment>
  );
};

export default Endpage;
