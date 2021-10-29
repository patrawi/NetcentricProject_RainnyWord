import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Container,
  Card,
  Typography,
  Avatar,
} from "@material-ui/core";
import { User } from "./../interfaces/User";

type PlayerCardProps = {
  player: User;
};

type LeaderBoardProps = {
  players: User[];
};

const PlayerCard = ({ player }: PlayerCardProps) => {
  const styles = useStyle();
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    setSeed(Math.random() * 1000000);
  }, []);
  const url = `https://avatars.dicebear.com/4.6/api/bottts/${seed}.svg`;

  return (
    //TODO: Random a number when create playerContext
    <Card className={styles.card}>
      <div>
        <Avatar alt="Avatar" src={url} className={styles.avatar} />
      </div>
      <div>
        <Typography variant="h5" align="center" className={styles.name}>
          {player.name}
        </Typography>
        <div>Score: {player.score}</div>
      </div>
    </Card>
  );
};

export const LeaderBoard = ({ players }: LeaderBoardProps) => {
  const styles = useStyle();

  return (
    <Container className={styles.container}>
      {players.map((player) => {
        return <PlayerCard player={player} />;
      })}
    </Container>
  );
};

const useStyle = makeStyles({
  card: {
    width: "16rem",
    height: "12rem",
    backgroundColor: "#fff3e0",
    borderRadius: "10px",
    padding: 10,
    margin: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItem: "center",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    display: "flex",
    width: "96%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: "2rem",
    flexWrap: "wrap",
  },
  name: {
    fontWeight: "bold",
    color: "#311b92",
  },
  avatar: {
    width: "7rem",
    height: "7rem",
    backgroundColor: "white",
  },
});
