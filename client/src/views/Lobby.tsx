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

const Lobbypage: React.FC<LobbyProp> = () => {
  const [check, setCheck] = useState(false);
  const { user, players, onBgm } = useContext(AppContext);

  const { updatePlayerList, socket, lobbyTime, fetchWord, words } =
    useContext(SocketContext);
  const [play, { stop }] = useSound(LobbyBgm, { volume: 0.3 });

  const countdownTimer = () => {
    return <TimerPage />;
  };

  useEffect(() => {
    if (lobbyTime === 0 && socket) {
      stop();
    }
  }, [lobbyTime]);

  useEffect(() => {
    updatePlayerList();
    fetchWord();
    console.log(words);
    if (socket) {
      socket.on("startWaitingRoomTimer", function (isGameStart) {
        setCheck(true);
      });
    }
  }, []);

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
