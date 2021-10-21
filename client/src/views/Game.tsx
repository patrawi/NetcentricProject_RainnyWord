import React, { useEffect, useState } from 'react';
import {Box, Container, makeStyles, TextField, Typography} from '@material-ui/core';
import Rainpage from '../components/rain';
import TimerPage, {TimerProp} from '../components/countdown';
import { socket } from '../services/Socket';
// import {TimerProp} from '../components/countdown';




interface GameProp {
    
}

const useStyles = makeStyles((theme) => ({
    root : {

    },
    answerBox : {
        
        height: "150px", 

        position: "absolute",
        left: 0,
        bottom: 0, 

    }
}))
//mock data 


type time = {}

const Gamepage : React.FC<GameProp> = () => {
    const [time, setTime] = useState<TimerProp>({initialMinute : 0, initialSeconds : 10});
    const [end, setEnd] = useState(false);
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const classes = useStyles();

    


    const increasePoint = () => {
        console.log(score);
        setScore(score + 1)
    }

    return (
        <>
            <Container>
                <Box display = "flex" justifyContent = "space-between" alignItems = "center">
                    <TimerPage initialMinute = {time.initialMinute} initialSeconds = {time.initialSeconds} />
                    <Typography align = "center">{score}</Typography>
                </Box>
                
                <Rainpage time = {time}  handleScore = {increasePoint} />
               
            </Container>
        </>
    )
    
}


export default Gamepage;
