import React, { useState, useContext } from "react";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Fade,
  Modal,
} from "@material-ui/core";
import { HowToPlayModal } from "../components/HowToPlayModal";

import { socket } from "../services/Socket";

import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const useStyles = makeStyles((theme) => ({
    root:{

    },
    title : {
        fontSize: "5em",
        fontWeight: "bold",
    },
    inputBox : {
        backgroundColor : "#D2A677",
        width : "50%",
        margin : "0 auto",
        padding : "2em",
        borderRadius: 20,
    },
    activeBtn : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

  }));


interface HomepageProp {
    
}

const Homepage: React.FC<HomepageProp> = () => {
  const classes = useStyles();
  const { setUser } = useContext(AppContext);
  const [name, setName] = useState<string>("");
  const [openHowToPlay, setOpenHowToPlay] = useState(false);

  const changeNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAddPlayer = async () => {
    setUser({
      name: name,
      id: socket.id,
      score: 0,
    });
    socket.emit("onAddPlayer", name);
  };

  return (
    <>
      <Container style={{ width: "50%" }}>
        <Box>
          <Typography className={classes.title} variant="h1" align="center">
            Rainy Word
          </Typography>
        </Box>
        <Box mt={3} />
        <Card className={classes.inputBox}>
          <CardContent>
            <Typography variant="h6">Please Enter Your Name</Typography>
          </CardContent>
          <CardActions>
            <TextField
              id="name"
              label="Your Name"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeNameHandle(e);
              }}
              fullWidth
            />
          </CardActions>
        </Card>

        <Box className={classes.activeBtn}>
          <Link
            to={{
              pathname: "/Lobby",
              state: {
                name: name,
              },
            }}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddPlayer}
            >
              Connect
            </Button>
          </Link>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setOpenHowToPlay(true)}

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
    </>
  );
};

export default Homepage;


