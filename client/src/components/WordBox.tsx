import { makeStyles, Theme, Typography } from '@material-ui/core';

import React, { useEffect, useRef, useState } from 'react';

interface WordBoxProp {
    word : string
    location : string
    destroyed : boolean
    onDropped : () => void
}

const useStyles = makeStyles<Theme>((theme) => ({
    root : {
        
    },
    rain : {
        position : 'fixed',
        top : "20vh",
        transform : "translateY(0vh)",
        animation :  `$fall 4s linear`,
        color : "black",

    },
    "@keyframes fall" : {
        "to" : {
            transform : "translateY(105vh)"
        }
    },
    hidden : {
        opacity : 0
    }

}));

const WordBoxPage : React.FC<WordBoxProp> = ({word, location, destroyed, onDropped}) => {
    const classes = useStyles();
    const [destroy, setDestroyed] = useState(destroyed);
    const boxRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
       
          setTimeout(() => {    
            setDestroyed(true);
            onDropped();
    },4000)

    },[destroy])
    return (
        <>  
            {!destroyed? 
              <div ref = {boxRef} className = {!destroy ?  classes.rain : classes.hidden } style= {{left : location}}>
              <Typography variant = "h6">{word}</Typography>
          </div> : null
            }
              
        
            
        </>
    )
}


export default WordBoxPage;