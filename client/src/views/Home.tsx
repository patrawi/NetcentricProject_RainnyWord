import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  CardActions,
  Button,
  TextField,
  Fade,
  Modal,
} from "@material-ui/core";
import { HowToPlayModal } from "../components/HowToPlayModal";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { SocketContext } from "../context/SocketContext";

import rain from '../asset/image/rain.png';
const useStyles = makeStyles((theme) => ({
  container: {
    width: "30%",
  },
  title: {
    fontSize: "5em",
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "#ffb300",
    margin: "0 auto",
    padding: "1em",
    marginBottom: "2em",
    borderRadius : "30px",
  },
  button: {
    borderRadius: "30px",
  },
  activeBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textfield : {
    borderRadius : "30px"
  },

  rain : {
    opacity : 0.8,
    backgroundImage : `url(${rain})`,
    animation : `$rain .9s linear infinite`,
},
'@keyframes rain' : {
    "0%" : {
        backgroundPosition : '0% 0%',
    },
    "100%" : {
        backgroundPosition : "20% 100%"
    }
},

}));

const Homepage = () => {
  const classes = useStyles();
  const { socket } = useContext(SocketContext);
  const [name, setName] = useState<string>("");
  const [openHowToPlay, setOpenHowToPlay] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [usedName, setUsedName] = useState<string[]>([]);
  const { setUser, setPlayers, players } = useContext(AppContext);
  let history = useHistory();

  useEffect(() => {
    if (socket) {
      console.log(players);
    }
  }, [socket, players]);

  const changeNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddPlayer = async () => {
    if (!name) {
      setHelperText("Please enter your name");
    } else if (players.find((player) => player.name === name)) {
      setHelperText("Please select other name.");
    } else {
      if (socket) {
        setHelperText("");
        const newUser = {
          name: name,
          id: socket.id,
          score: 0,
          avatar: Math.floor(Math.random() * 1000000),
        };
        setUser(newUser);
        socket.emit("onAddPlayer", newUser);
        history.push({
          pathname: "/lobby",
        });
      }
    }
  };

  return (
    <>
      <div className={classes.rain}>
        <Container className={classes.container}>
          <Box>
            <Typography className={classes.title} variant="h1" align="center">
              Rainy Word
            </Typography>
            <Typography variant="h6" align="center">
              Type fast to survive!
            </Typography>
          </Box>
          <Box mt={2} />
          <CardActions>
            <TextField
              id="name"
              label="Your Name"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeNameHandle(e);
              }}
              InputProps={{
                classes: {
                  root: classes.textfield,
                },
              }}
              helperText={helperText}
              fullWidth
              error={helperText ? true : false}
            />
          </CardActions>
          <Box className={classes.activeBtn}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddPlayer}
              classes={{
                root: classes.button,
              }}
            >
              Connect
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setOpenHowToPlay(true)}
              classes={{
                root: classes.button,
              }}
            >
              How to Play?
            </Button>
          </Box>
          <Modal open={openHowToPlay}>
            <Fade in={openHowToPlay}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 50,
                }}
              >
                <HowToPlayModal
                  openHowToPlay={openHowToPlay}
                  setOpenHowToPlay={setOpenHowToPlay}
                />
              </div>
            </Fade>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default Homepage;

