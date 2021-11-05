import React, { useEffect, useState, useContext } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import Rainpage from "../components/rain";
import { AppContext } from "../context/AppContext";
import {wordRand} from '../types/type'
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

const Gamepage = () => {

  const { user, setUser, onSfx } = useContext(AppContext);

  const { socket, updateLeaderboard, words } = useContext(SocketContext);
  const [isRedirected, setIsRedirected] = useState(false);
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
      updateLeaderboard(user);
      
    }

  }, [user]);

  useEffect(() => {
    if (onBgm) play();
    else stop();
  }, [onBgm, play, stop]);

  const HandleRedirect = () => {
    stop();
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

  useEffect(() => {
    if (socket) {
      socket.on("stopGame", () => {
        // console.log("I got stopGame!");
        setIsRedirected(true);
      });
    }
  }, [socket]);

  const increasePoint = (length: number) => {
    if (onSfx) {
      if (correctPitch < 1.3) playCombo();
      else playStreak();
    }
    setUser({ ...user, score: user.score + length * 100 });
    setCorrectPitch(correctPitch + 0.1);
  };

  const decreasePoint = (length: number) => {
    if (onSfx) playBoom();
    setCorrectPitch(0.8);
    setUser({ ...user, score: user.score - length * 100 });
  };

  return (
    <>
      {isRedirected ? (
        <HandleRedirect />
      ) : (
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography align="center">
              {user.name}: {user.score}
            </Typography>
          </Box>

          <Rainpage
            handleScore={increasePoint}
            randomWords={words}
            handleDecreaseScore={decreasePoint}
          />
        </Container>
      )} 
    </>
  );
};

export default Gamepage;
