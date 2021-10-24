import React, { useEffect, useState } from 'react';
import {Box, Container, makeStyles,  Typography} from '@material-ui/core';
import Rainpage from '../components/rain';
import TimerPage  from '../components/countdown';
import { socket } from '../services/Socket';

import { wordRand, Player } from '../views/Lobby'

import {Redirect, useLocation} from 'react-router-dom';
import { SportsHockeyTwoTone } from '@material-ui/icons';

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

export type Time = {
    initialMinute : number 
    initialSeconds : number
}
export type word = {
    word : string;
    key : number;
}

const Gamepage : React.FC<GameProp> = () => {
    const location = useLocation<{
        randWords : wordRand[]
        individual : Player
    }>();
    const {randWords, individual} = location.state
    const [time, setTime] = useState<Time>({initialMinute :  0, initialSeconds : 20});
    const [timeout, setTimeout] = useState(false);
    const [score, setScore] = useState(0);
    const [randomWords, setRandomWords] = useState<word[]>(randWords);
    


    const increasePoint = () => {
        console.log(score);
        setScore(score + 1)
    }
    const handleRandWord = async () => {
  
        console.log('hello');
    }

    const handleTimeout = () => {
        setTimeout(true);
    }

    useEffect(() =>  {
        if (timeout) {
            socket.emit("updateLeaderboard", {id : individual.id , score : score})
            socket.on(" ", (players) => {
                console.log(players)
            })
        }
        handleRandWord();
    },[randomWords])
    return (
        <>  
            {timeout ? <Redirect to = {{
                pathname : "/End",
                state : {
                    id : individual.id,
                    score : score
                }
            }} /> : 
            <Container>
            <Box display = "flex" justifyContent = "space-between" alignItems = "center">
                <TimerPage initialMinute = {time.initialMinute} initialSeconds = {time.initialSeconds} handleTimeout = {handleTimeout} />
                <Typography align = "center">{individual.name}: {score}</Typography>
            </Box>
 
            <Rainpage time = {time}  handleScore = {increasePoint} randomWords = {randomWords} />
           
        </Container>
            }
  
        </>
    )
    
}


export default Gamepage;
