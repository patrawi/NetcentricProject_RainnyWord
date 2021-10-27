import React, { useState } from 'react';

import { AdminProp } from '../views/Admin';
import { form } from '../types/type';
import { Avatar, Button, Card, CardActions, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';
export interface LoginProps {
}

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: "#ffb300"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const LoginForm : React.FC<AdminProp> = ({ Login, error }) => {
    const classes = useStyles();
    const [details, setDetails] = useState<form>({
        username: "", 
        password: ""
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Login(details);
    }


    return(
        // <form onSubmit={(submitHandler)}>
        //     <div className="form-inner">
        //         <h2>Login</h2>
        //         {(error != "") ? ( <div className="error">{error}</div>) : ""}
        //         <div className="form-group">
        //             <label htmlFor="username">Username:</label>
        //             <input type="text" name="username" id="username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, username: e.target.value})} value={details.username} />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="password">Password:</label>
        //             <input type="password" name="password" id="username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, password: e.target.value})} value={details.password} />
        //         </div>
        //         <input type="submit" value="LOGIN" />
        //     </div>
        // </form>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
                Admin Sign in
            </Typography>
            {(error != "") ? ( <div className="error">{error}</div>) : ""}
            <form className={classes.form} noValidate onSubmit={(submitHandler)}>
            <Card className={classes.card}>
                <CardActions>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Username"
                        type="username"
                        id="username"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, username: e.target.value})} value={details.username}
                    />
                </CardActions>
                <CardActions>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, password: e.target.value})} value={details.password}
                    />
                </CardActions>
            </Card>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Sign In
            </Button>
            </form>
        </div>
        </Container>
    )
}


export default LoginForm;
