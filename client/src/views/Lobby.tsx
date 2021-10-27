import React, { useEffect, useState, useContext } from "react";
import { Container } from "@material-ui/core";
import TimerPage from "../components/countdown";
import { SocketContext } from "../context/SocketContext";
import { Redirect, useLocation } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { User } from "../interfaces/User";
//@ts-ignore
import LobbyBgm from "../asset/bgm/bgm_lobby.mp3";
import { useSound } from "use-sound";
import { AppContext } from "../context/AppContext";

interface LobbyProp {}

export type wordRand = {
  word: string;
  key: number;
};

let Arrplayers: User[] = [];
const Lobbypage: React.FC<LobbyProp> = () => {
  const [check, setCheck] = useState(false);
  const [randWords, setRandWords] = useState<wordRand[]>([]);
  const [players, setPlayers] = useState<User[]>(Arrplayers);
  const [redirectNow, setRedirectNow] = useState(false);
  const location = useLocation<{ name: string }>();
  const [individual, setIndividual] = useState<User>();
  const [time, setTime] = useState(false);
  const { name } = location.state;
  const { onBgm } = useContext(AppContext);
  const [play, { stop }] = useSound(LobbyBgm, { volume: 0.3 });

  const { socket } = useContext(SocketContext);
  const handlePlayer = () => {
    if (socket) {
      socket.on("updatePlayerList", (players) => {
        setPlayers(players);
        setIndividual(() => {
          return players.find((player: User) => player.name === name);
        });
      });
    }
  };
  const handleTimeout = () => {
    setTime(true);
  };
  const countdownTimer = () => {
    if (socket) {
      socket.on("round", (ROUND) => {
        if (ROUND === 1) {
          socket.on("wordsFirstRound", (words) => {
            setRandWords(words);
          });
        }
      });
    }

    setTimeout(() => {
      setRedirectNow(true);
    }, 10000);

    return (
      <TimerPage
        initialMinute={0}
        initialSeconds={10}
        handleTimeout={handleTimeout}
      />
    );
  };

  useEffect(() => {
    handlePlayer();
    if (socket) {
      socket.on("startWaitingRoomTimer", function (isGameStart) {
        setCheck(true);
      });
    }
  }, [players]);

  useEffect(() => {
    console.log(onBgm);
    if (onBgm) play();
    else stop();
  }, [onBgm, play, stop]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {redirectNow ? (
        <Redirect
          to={{
            pathname: "/Game",
            state: {
              randWords,
              individual,
            },
          }}
        />
      ) : (
        <Container>
          {check ? countdownTimer() : null}
          {players.map((player) => {
            return <div key={player.id}>{player.name}</div>;
          })}
        </Container>
      )}
      <ChatBox />
    </div>
  );
};

export default Lobbypage;
