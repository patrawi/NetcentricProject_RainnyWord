import React, { useEffect, useState, useRef } from 'react';
import { Box,TextField, Theme } from '@material-ui/core'

import { makeStyles } from "@material-ui/core/styles";

import WordBox from './WordBox';
import {word, Time} from '../views/Game'
interface RainProp {
    time : Time
    handleScore : () => void
    randomWords : word[]
}




type wordToRender = {
    id : number
    word : string
    location : string
    destroyed : boolean
}


  
const Rainpage : React.FC<RainProp> = ({ time, handleScore, randomWords}) => {
    const [words, setWords] = useState<word[]>(randomWords);
    const [wordToRender, setWordToRender] = useState<wordToRender[]>([{id : 0, word : '', location : '' , destroyed : true}]);
    const [answer, setAnswer] = useState('');    
    const Inputref = useRef() as React.MutableRefObject<HTMLDivElement>;
    let counter = 0
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
            setAnswer("");
            e.preventDefault();
            return newWordToRender;
        })
    }



    useEffect(() => {
        console.log("hello from rainComponent");
        const size = words.length
        const loop = setInterval(() => {
            const delay = Math.floor(Math.random() * 100)  +  100;
            const n = counter++;
            
            setTimeout(() => {
                setWordToRender((WordToRender) => {
                        return [...WordToRender, {
                            id : n,
                            word : words[n % size].word ,
                            location : Math.floor(Math.random() * 60) + 20 + "vw",
                            destroyed : false,
                        } ]
                    
     
                }
                 
                )
            },delay)
        },200)
        if (Inputref) {
            Inputref.current.focus();
        }
        return () => clearInterval(loop);
    }, [words])

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
                    ref = {Inputref} 
                    onKeyPress = {(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                    fullWidth
                    autoFocus
                    />
            </form>
        </>

    )

}


export default Rainpage;
