import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react'; 
import { User } from '../interfaces/User';

interface PlayerCardProp {
    player : User
    index : number
    color : string
}

const useStyles = makeStyles((theme) => ({
    root : {

    },
    card : {
        padding : '10px',
        boxShadow : '0 0 20px 0 rgba(0,0,0, .25)',
        borderRadius : '10px',
    },
    avatar : {
        marign : "0 auto"
    }

}))

const PlayerCard : React.FC<PlayerCardProp> = ({player, index, color}) => {
    const classes = useStyles();
    const url = `https://avatars.dicebear.com/4.6/api/bottts/${player.avatar}.svg`;
    return (
        
        <>  <Box my = {6}/>
            <Grid container spacing = {3} className = {classes.card} style = {{backgroundColor : color}}>
                    <Grid item xs = {2}>
                            <Typography align = 'center' variant = 'h6' color = "secondary">{index + 1}</Typography>
                    </Grid>      
                    <Grid item xs = {2} alignItems = "center">
                        <Box display = "flex" justifyContent = "center" alignItems = "center">
                         <Avatar alt="Avatar" src={url} className = {classes.avatar} />
                        </Box>
                    </Grid>       
                    <Grid item xs = {6}>
                            <Typography align = 'center' variant = 'h6' color = "secondary">{player.name}</Typography>
                    </Grid>     
                    <Grid item xs = {2}>
                            <Typography align = 'center' variant = 'h6' color = "secondary">{player.score}</Typography>
                    </Grid>     
                </Grid>
        </>

        
    )
}

export default PlayerCard;