import React, { useEffect, useState, useContext } from "react";
import TimerPage from "../components/TimerPage";
import { SocketContext } from "../context/SocketContext";
import { Redirect } from "react-router-dom";
import ChatBox from "../components/ChatBox";
//@ts-ignore
import LobbyBgm from "../asset/bgm/bgm_lobby.mp3";
import { useSound } from "use-sound";
import { AppContext } from "../context/AppContext";
import { Container, Typography } from "@material-ui/core";
import { LeaderBoard } from "../components/LeaderBoard";

interface LobbyProp {}

export type wordRand = {
  word: string;
  key: number;
};

const Lobbypage: React.FC<LobbyProp> = () => {
  const [check, setCheck] = useState(false);
  const [randWords, setRandWords] = useState<wordRand[]>([]);
  const { user, players, onBgm } = useContext(AppContext);
  
  const { updatePlayerList,  socket, lobbyTime} = useContext(SocketContext);
  const [play, { stop }] = useSound(LobbyBgm, { volume: 0.3 });


  const countdownTimer = () => {
    if (socket) {
      socket.on("words", (words) => {
        setRandWords(words);
      });
    }
    return (
      <TimerPage
        isGame={false}
      />
    );
  };
  useEffect(() => {
    if (lobbyTime === 0 && socket) {
      stop();
      socket.emit("startGameCountdown");      
      
    
    }
  }, [lobbyTime]);
  useEffect(() => {
    updatePlayerList();
    if (socket) {
      socket.on("startWaitingRoomTimer", function (isGameStart) {
        setCheck(true);
      });
    }
  }, [players]);

  useEffect(() => {
    if (onBgm) play();
    else stop();
  }, [onBgm, play, stop]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {lobbyTime === 0 ? (
          <Redirect
            to={{
              pathname: "/Game",
              state: {
                randWords,
              },
            }}
          />
        ) : (
          <Container>
            <Container maxWidth="xs">
              <Typography variant="h3" align="center" gutterBottom>
                Waiting Lobby
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                Welcome{" "}
                <span style={{ fontWeight: "bold", color: "#fb8c00" }}>
                  {user.name}
                </span>
                !
              </Typography>
            </Container>
            {check ? countdownTimer() : null}
            <LeaderBoard players={players} />
          </Container>
        )}
        <ChatBox />
      </div>
    </>
  );
};

export default Lobbypage;
