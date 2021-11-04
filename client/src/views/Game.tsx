import React, { useEffect, useState, useContext } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import Rainpage from "../components/rain";
import TimerPage from "../components/TimerPage";
import { AppContext } from "../context/AppContext";
import { wordRand } from "../views/Lobby";
import { Redirect, useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import useSound from "use-sound";
//@ts-ignore
import BoomSfx from "../asset/sfx/sfx_boom.mp3";
//@ts-ignore
import CorrectSfx from "../asset/sfx/sfx_correct.mp3";
//@ts-ignore
import StreakSfx from "../asset/sfx/sfx_streak.mp3";
//@ts-ignore
import LobbyBgm from "../asset/bgm/bgm_game.mp3";
import Countdown from "../components/Countdown";

export type Time = {
  initialSeconds: number;
};
export type word = {
  word: string;
  key: number;
};

const Gamepage = () => {
  const location = useLocation<{
    randWords: wordRand[];
  }>();
  const { user, setUser, onSfx } = useContext(AppContext);
  const { randWords } = location.state;

  const { updateLeaderboard, socket } = useContext(SocketContext);
  const [correctPitch, setCorrectPitch] = useState(0.8);
  const [gameTime, setGameTime] = useState<number>(30);
    const { onBgm } = useContext(AppContext);
  const [play, { stop }] = useSound(LobbyBgm, { volume: 0.1 });
  const [playBoom] = useSound(BoomSfx);
  const [playCombo] = useSound(CorrectSfx, {
    volume: 0.1,
    playbackRate: correctPitch,
  });
  const [playStreak] = useSound(StreakSfx, {
    volume: 0.1,
  });

  useEffect(() => {
    if(socket) {
      socket.off("startWaitingRoomTimer")
    }
    if (user) {
      updateLeaderboard(user);
    }
  }, [user, updateLeaderboard]);

  useEffect(() => {
    if (onBgm) play();
    else stop();
  }, [onBgm, play, stop]);

  const increasePoint = (length: number) => {
    if (onSfx) {
      if (correctPitch < 1.3) {
        playCombo();
      } else {
        playStreak();
      }
    }
    setUser({ ...user, score: user.score + length * 100 });
    setCorrectPitch(correctPitch + 0.1);
  };
  const handleTime = () => {
    setGameTime(gameTime-1);
  }
  const decreasePoint = (length: number) => {
    if (onSfx) playBoom();
    setUser({ ...user, score: user.score - length * 100 });
  };


  const handleRedirect = () => {
    return (
      <Redirect
        to={{
          pathname: "/End",
          state: {
            id: user.id,
            score: user.score,
          },
        }}
      />
    );
  };

  return (
    <>
      {gameTime === 0 ? (
        handleRedirect()
      ) : (
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Countdown handleTime = {handleTime} gameTime = {gameTime} />
            <Typography align="center">
              {user.name}: {user.score}
            </Typography>
          </Box>

          {/* <Rainpage
            handleScore={increasePoint}
            randomWords={randWords}
            handleDecreaseScore={decreasePoint}
          /> */}
        </Container>
      )}
    </>
  );
};

export default Gamepage;
