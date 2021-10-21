import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, TextField, Theme, Typography } from '@material-ui/core'
import { useInterval } from 'usehooks-ts'
import { makeStyles } from "@material-ui/core/styles";
import { TimerProp } from './countdown';
import WordBox from './WordBox';

interface RainProp {
    time : TimerProp
    handleScore : () => void
}


const randomWords:string[] = ["ant", "bird", "cat", "dog", "egg", "fish" ];

type wordToRender = {
    id : number
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
  
const Rainpage : React.FC<RainProp> = ({time, handleScore}) => {
    const [words, setWords] = useState<string[]>(randomWords);
    const [wordToRender, setWordToRender] = useState<wordToRender[]>([]);
    const [showGame, setShowGame] = useState(true);
    const [answer, setAnswer] = useState('');
    const [check, setCheck] = useState(true);

    const classes = useStyles();
    let inputRef : HTMLDivElement;
    let counter = 0;

    const handleAnswer = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }
    
    
    const handleSubmit = (e : React.FormEvent) => {
 
        setWordToRender((oldwordToRender) => {
            const newWordToRender : wordToRender[] = []
            for (let oldword of oldwordToRender) {
                if (!oldword.destroyed ) {
                    if (oldword.word !== answer) {
                        newWordToRender.push(oldword);
                    } else {
                        newWordToRender.push({...oldword, destroyed : true})
                        handleScore();
                    }
                } else {
                    newWordToRender.push(oldword);
                }
               
                
            }
            console.log(newWordToRender);
            setAnswer("");
            e.preventDefault();
            return newWordToRender;
        })
    }

    //Create array of object 
    useEffect(() => {

        if (showGame) {
            const size = words.length;
            const loop = setInterval(() => {
                const delay = Math.floor(Math.random() * 100) + 100;
                const n = counter++;
                setTimeout(() => {
                    setWordToRender((setWordToRender) => [...setWordToRender, {
                        id : n,
                        word : words.shift() || '',
                        location : Math.floor(Math.random() * 60) + 20 + "vw",
                        destroyed : false,
                    }])
                },delay)
            },1000)
            if (inputRef) {
                inputRef.focus()
            }
            return () => clearInterval(loop);
        }

    },[words]);

  
    return (
        <>
            <Box>
                {wordToRender.map(({word, location, id, destroyed}) => {
                    const handleWordToRender = () => {
                        setWordToRender(wordToRender => wordToRender.filter((word) => word.id !== id))
                    }
                    return (
                        <WordBox
                        
                            word = {word}
                            location = {location}
                            key = {id}
                            destroyed = {destroyed} 
                            onDropped = {handleWordToRender}
                        />
                    )
                })}
            </Box>
            <form >
                <TextField 
                    type = "text" 
                    value = {answer} 
                    label = "Answer" 
                    variant = 'filled' 
                    onChange = {(e : React.ChangeEvent<HTMLInputElement>) => {handleAnswer(e)}}  
                    ref = {(input : HTMLDivElement) => inputRef = input} 
                    onKeyPress = {(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                    fullWidth/>
            </form>
        </>

    )

}


export default Rainpage;
