import { Box, makeStyles, Theme } from '@material-ui/core';
import React from 'react'
import { useState, useEffect } from 'react';

export interface TimerProp {
    initialMinute : number
    initialSeconds : number
}

const useStyles = makeStyles<Theme>((theme) => ({
    root : {
        
    },
    center : {
        textAlign : 'center',
    }


}));
  
const TimerPage :React.FC<TimerProp> = ({initialMinute, initialSeconds}) => {
    const classes = useStyles();
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <Box className = {classes.center}>
        { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </Box>
    )
}

export default TimerPage;