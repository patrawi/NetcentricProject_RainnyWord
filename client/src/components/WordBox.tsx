import { makeStyles, Theme, Typography } from '@material-ui/core';

import React, { useEffect, useRef, useState } from 'react';

interface WordBoxProp {
    word : string
    location : string
    destroyed : boolean

}

const useStyles = makeStyles<Theme>((theme) => ({
    root : {
        
    },
    rain : {
        position : 'fixed',
        top : "0vh",
        transform : "translateY(0)",
        animation :  `$fall 3s linear`,
        color : "black",

    },
    "@keyframes fall" : {
        "to" : {
            transform : "translateY(105vh)"
        }
    },


}));

const WordBoxPage : React.FC<WordBoxProp> = ({word, location, destroyed}) => {
    const classes = useStyles();
    const boxRef = useRef<HTMLDivElement>(null);
    const [hide, setHide] = useState(true);
    useEffect(() => {
        let height = boxRef.current?.getBoundingClientRect().y || 0
        const loop = setInterval(() => {
            height = boxRef.current?.getBoundingClientRect().y
            if (height > window.innerHeight) {
                setHide(false);
            }
        }, 3000)

    },[hide])
    return (
        <>
            {!destroyed && hide  ? 
                <div ref = {boxRef} className = {classes.rain} style= {{left : location}}>
                    <Typography variant = "h6">{word}</Typography>
                </div> : 
                null
        }
            
        </>
    )
}


export default WordBoxPage;