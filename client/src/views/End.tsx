import React, { useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { AppContext } from "../context/AppContext";
import PlayerCard from "../components/PlayerCard";
import { useSound } from "use-sound";
//@ts-ignore
import CongratulationSfx from "../asset/sfx/sfx_congratulation.mp3";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  topic: {
    padding: "0.5em",
  },
  container: {
    paddingBottom: "3em",
    overFlow: "scroll",
  },
}));

const Endpage = () => {
  const { updatePlayerList, socket } = useContext(SocketContext);
  const { players, onBgm } = useContext(AppContext);
  const [play, { stop }] = useSound(CongratulationSfx);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    updatePlayerList();
    if (socket) {
      
      socket.on("onReset", () => {
        history.push("/");
      });
      socket.disconnect();
    }
  }, []);
  useEffect(() => {
    if (onBgm) play();
    else stop();
  }, [onBgm, play, stop]);

  return (
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        <Box my={6}>
          <Typography align="center" variant="h2">
            Leaderboard 🏆
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Paper className={classes.topic} elevation={3}>
              <Typography align="center" variant="h6" color="secondary">
                RANK
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.topic} elevation={3}>
              <Typography align="center" variant="h6" color="secondary">
                ICON
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.topic} elevation={3}>
              <Typography align="center" variant="h6" color="secondary">
                NAME
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.topic} elevation={3}>
              <Typography align="center" variant="h6" color="secondary">
                SCORE
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {players.map((player , index) => {
          let colors = ["#EDAE49", "#D1495B", "#00798C", "#30638E", "#003D5B"];
          const number = index % colors.length;
          return (
            <PlayerCard
              key={player.id}
              player={player}
              index={index}
              color={colors[number]}
            />
          );
        })}
        <Box my={6} p={6} />
      </Container>
    </React.Fragment>
  );
};

export default Endpage;
