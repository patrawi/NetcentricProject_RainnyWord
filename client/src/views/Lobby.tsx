import React, { useEffect, useState, useContext } from "react";
import TimerPage from "../components/countdown";
import { SocketContext } from "../context/SocketContext";
import { Redirect } from "react-router-dom";
import ChatBox from "../components/ChatBox";
//@ts-ignore
import LobbyBgm from "../asset/bgm/bgm_lobby.mp3";
import { useSound } from "use-sound";
import { AppContext } from "../context/AppContext";
import { makeStyles, Container, Typography } from "@material-ui/core";
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
  const [redirectNow, setRedirectNow] = useState(false);
  const [time, setTime] = useState(false);
  const { updatePlayerList } = useContext(SocketContext);
  const [play, { stop }] = useSound(LobbyBgm, { volume: 0.3 });

  const { socket } = useContext(SocketContext);

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
      stop();
    }, 10000);

    return (
      <TimerPage
        initialMinute={0}
        initialSeconds={10}
        handleTimeout={handleTimeout}
        isGame = {false}
      />
    );
  };

  useEffect(() => {
    updatePlayerList();
    if (socket) {
      socket.on("startWaitingRoomTimer", function (isGameStart) {
        setCheck(true);
      });
    }
  }, [players]);

  useEffect(() => {
    // if (onBgm) play();
    // else stop();
  }, [onBgm, play, stop]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {redirectNow ? (
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
            {/* <Typography variant="h4" align="center">
              Welcome <span style={{ fontWeight: "bold" }}>{user.name}</span>
            </Typography> */}

            {check ? countdownTimer() : null}
            <LeaderBoard players={players} />
            {/* {players.map((player) => {
              return <div key={player.id}>{player.name}</div>;
            })} */}
          </Container>
        )}
        <ChatBox />
      </div>
    </>
  );
};

export default Lobbypage;
