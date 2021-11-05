import React, { useEffect, useState, useContext } from "react";
import { Box, makeStyles, TextField } from "@material-ui/core";
import WordBox from "./WordBox";
import { wordToRender } from "../types/type";
import { AppContext } from "../context/AppContext";
import { useSound } from "use-sound";
//@ts-ignore
import PopSfx from "../asset/sfx/sfx_pop.mp3";
import {useInterval} from 'usehooks-ts'
interface RainProp {
  handleScore: (length: number) => void;
  randomWords: wordToRender[];
  handleDecreaseScore: (length: number) => void;
}
const useStyles = makeStyles(() => ({
  root: {},
  content: {
    top: "auto",
    bottom: "10vh",
    left: 0,
    position: "fixed",
    zIndex: 1,
  },
}));
const Rainpage: React.FC<RainProp> = ({
  handleScore,
  randomWords,
  handleDecreaseScore,
}) => {
  const [wordToRender, setWordToRender] = useState<wordToRender[]>([
    { id: 0, word: "", location: "", destroyed: true, dangerWord: false },
  ]);
  const [answer, setAnswer] = useState("");
  const { onSfx } = useContext(AppContext);
  const [play] = useSound(PopSfx);
  
  const classes = useStyles();
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Check if the word in the word pool has been destroyed already or not.
    setWordToRender((oldwordToRender) => {
      const newWordToRender: wordToRender[] = [];
      for (let oldword of oldwordToRender) {
        if (!oldword.destroyed) {
          if (oldword.word !== answer) {
            // incorrect word
            newWordToRender.push(oldword);
          } else if (oldword.dangerWord) {
            // decrease score
            newWordToRender.push({ ...oldword, destroyed: true });
            handleDecreaseScore(oldword.word.length);
          } else {
            // add score
            newWordToRender.push({ ...oldword, destroyed: true });
            handleScore(oldword.word.length);
          }
        } else {
          // re-render the word
          newWordToRender.push(oldword);
        }
      }
      setAnswer("");
      e.preventDefault();
      return newWordToRender;
    });
  };
  let counter = 0;

  useEffect(() => {
  
        const size = randomWords.length;

        const loop = setInterval(() => {
     
            const n = counter++;
            setWordToRender(old => [
              ...old, randomWords[n%size]
              
          ]);
        }, 800); // Spam Rate


        return () => clearInterval(loop);
    
}, [randomWords]);
  

  const handleKeyboardPress = (e: React.KeyboardEvent) => {
    if (onSfx === true) play();
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Box>
        {wordToRender.map(({ word, location, id, destroyed, dangerWord }) => {
         
          const handleWordToRender = () => {
            setWordToRender(wordToRender => wordToRender.filter((word) => word.id !== id))
          }
            
    
              return (
                  <WordBox
                    word={word}
                    location={location}
                    key={id}
                    destroyed={destroyed}
                    onDropped={handleWordToRender}
                    dangerWord={dangerWord}
                  />
                );   
      
        })}
      
    
      </Box>

      <form>
        <TextField
          type="text"
          value={answer}
          label="Answer"
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleAnswerChange(e);
          }}
          className={classes.content}
          onKeyPress={(e) => handleKeyboardPress(e)}
          fullWidth
          autoFocus
        />
      </form>
    </>
  );
};

export default Rainpage;
