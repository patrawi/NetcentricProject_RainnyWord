import React, { useEffect, useState, useContext } from "react";
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import Rainpage from "../components/rain";
import TimerPage from "../components/countdown";
import { AppContext } from "../context/AppContext";
import { wordRand } from "../views/Lobby";
import { Redirect, useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  answerBox: {
    height: "150px",

    position: "absolute",
    left: 0,
    bottom: 0,
  },
}));
//mock data

export type Time = {
  initialMinute: number;
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
  const { user, setUser, setPlayers, players } = useContext(AppContext);
  const { randWords } = location.state;
  const [time, setTime] = useState<Time>({
    initialMinute: 0,
    initialSeconds: 10,
  });
  const [timeout, setTimeout] = useState(false);
  const [randomWords, setRandomWords] = useState<word[]>(randWords);
  const { socket, updateLeaderboard } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      updateLeaderboard(user);
    }
  }, [user]);

  const increasePoint = (length: number) => {
    setUser({ ...user, score: user.score + length * 100 });
  };

  const decreasePoint = (length: number) => {
    setUser({ ...user, score: user.score - length * 100 });
  };
  const handleTimeout = () => {
    setTimeout(true);
  };

  const handleRedirect = () => {
    if (socket) {
      socket.emit("leaderboardEnd", () => {
        socket.on("updateLeaderboardEnd", (players) => {
          // setPlayers(players);
        });
      });
    }
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
      {/* {timeout ? (
        handleRedirect()
      ) : ( */}
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TimerPage
            initialMinute={time.initialMinute}
            initialSeconds={time.initialSeconds}
            handleTimeout={handleTimeout}
          />
          <Typography align="center">
            {user.name}: {user.score}
          </Typography>
        </Box>

        <Rainpage
          time={time}
          handleScore={increasePoint}
          randomWords={randomWords}
          handleDecreaseScore={decreasePoint}
        />
      </Container>
    </>
  );
};

export default Gamepage;
