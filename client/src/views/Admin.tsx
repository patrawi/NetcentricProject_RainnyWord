import {
  Box,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { SocketContext } from "../context/SocketContext";
import { form } from "../types/type";
export interface AdminProp {
  Login: (details: form) => void;
  error: string;
}

const Adminpage: React.FC<AdminProp> = () => {
  const baseURL: string = "http://localhost:8000";
  const [login, setLogin] = useState<any>({ status: "", token: "" });
  const [auth, setAuth] = useState<any>({ message: "", status: "" });
  const [start, setStart] = useState<any>({ message: "", status: "" });
  const [reset, setReset] = useState<any>({ message: "", status: "" });
  const classes = useStyles();
  const { socket, lobbyTime } = useContext(SocketContext);

  const adminUser = {
    username: "admin",
    password: "admin123",
  };

  const [user, setUser] = useState<form>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const Login = (user: form) => {
    if (
      user.username === adminUser.username &&
      user.password === adminUser.password
    ) {
      setUser({
        username: user.username,
        password: user.password,
      });
      axios.post(baseURL + "/login", {}).then((res) => {
        setLogin(res.data);
      });
      axios
        .post(
          baseURL + "/adminauth",
          {},
          { headers: { Authorization: `Bearer ${login.token}` } }
        )
        .then((res) => {
          setAuth(res.data);
          if (auth.status === "success") {
            alert(auth.message);
          } else {
            setUser({
              username: "",
              password: "",
            });
            alert("Unexpected error occurred! Please try again.");
          }
        });
    } else {
      setError("Details do not match");
    }
  };

  const Logout = () => {
    setUser({
      username: "",
      password: "",
    });
  };

  const Reset = () => {
    axios
      .post(
        baseURL + "/reset",
        {},
        { headers: { Authorization: `Bearer ${login.token}` } }
      )
      .then((res) => {
        setReset(res.data);
        alert("Game reset");
      });
  };

  const Start = () => {
    axios
      .post(
        baseURL + "/startgame",
        {},
        { headers: { Authorization: `Bearer ${login.token}` } }
      )
      .then((res) => {
        setStart(res.data);
        if (socket) {
          socket.emit("startLobbyCountdown");
          socket.emit("startGameCountdown");
        }
        alert(start.message);
      });
  };

  return (
    <Box
      className="Adminpage"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      {user.username !== "" ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Welcome, Admin
            </Typography>
            <Box mt={5}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={Start}
              >
                Start
              </Button>
            </Box>
            <Box mt={5}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={Reset}
              >
                Reset
              </Button>
            </Box>
            <Box mt={5}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={Logout}
              >
                Sign out
              </Button>
            </Box>
          </div>
        </Container>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </Box>
  );
};

export default Adminpage;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
