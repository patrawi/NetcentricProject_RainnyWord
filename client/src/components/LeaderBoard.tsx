import React from "react";
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
  const url = `https://avatars.dicebear.com/4.6/api/bottts/${player.avatar}.svg`;

  return (
    //TODO: Random a number when create playerContext
    <Card className={styles.card}>
      <div className={styles.avatarContainer}>
        <Avatar alt="Avatar" src={url} className={styles.avatar} />
      </div>
      <div>
        <Typography variant="h5" align="center" className={styles.name}>
          {player.name}
        </Typography>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreLabel}>Score</div>
          <div className={styles.score}>{player.score}</div>
        </div>
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
    width: "12rem",
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
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: "2rem",
    flexWrap: "wrap",
  },
  name: {
    fontWeight: "bold",
    color: "#311b92",
  },
  avatarContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    width: "7rem",
    height: "7rem",
    backgroundColor: "white",
  },
  scoreContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  scoreLabel: {
    color: "#ffb74d",
  },
  score: {
    color: "#ff9800",
  },
});
