import React, { useEffect, useState, useRef, useContext } from "react";
import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WordBox from "./WordBox";
import { word, Time } from "../views/Game";
import { wordToRender } from "../types/type";
import { AppContext } from "../context/AppContext";
import { useSound } from "use-sound";
//@ts-ignore
import PopSfx from "../asset/sfx/sfx_pop.mp3";
interface RainProp {
  time: Time;
  handleScore: (length: number) => void;
  randomWords: word[];
  handleDecreaseScore: (length: number) => void;
}

const Rainpage: React.FC<RainProp> = ({
  time,
  handleScore,
  randomWords,
  handleDecreaseScore,
}) => {
  const [words, setWords] = useState<word[]>(randomWords);
  const [wordToRender, setWordToRender] = useState<wordToRender[]>([
    { id: 0, word: "", location: "", destroyed: true, dangerWord: false },
  ]);
  const [answer, setAnswer] = useState("");
  const Inputref = useRef() as React.MutableRefObject<HTMLDivElement>;
  let counter = 0;
  const { onSfx, user } = useContext(AppContext);
  const [play] = useSound(PopSfx);

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

  useEffect(() => {
    const size = words.length;
    const loop = setInterval(() => {
      const delay = Math.floor(Math.random() * 100) + 100;
      const n = counter++;

      setTimeout(() => {
        setWordToRender((WordToRender) => {
          return [
            ...WordToRender,
            {
              id: n,
              word: words[n % size].word,
              location: Math.floor(Math.random() * 60) + 20 + "vw",
              destroyed: false,
              dangerWord:
                Math.floor(Math.random() * 60) % 7 === 0 ? true : false,
            },
          ];
        });
      }, delay);
    }, 800);
    if (Inputref) {
      Inputref.current.focus();
    }
    return () => clearInterval(loop);
  }, [words]);

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
            setWordToRender((wordToRender) =>
              wordToRender.filter((word) => word.id !== id)
            );
          };
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
          ref={Inputref}
          onKeyPress={(e) => handleKeyboardPress(e)}
          fullWidth
          autoFocus
        />
      </form>
    </>
  );
};

export default Rainpage;
