import axios from 'axios';
import { stringify } from 'querystring';
import React, { useState } from 'react';
import LoginForm, { LoginProps } from '../components/LoginForm';

import {form} from '../types/type';


export interface AdminProp {
    Login: (details: form) => void;
    error: string;
}

const Adminpage : React.FC<AdminProp> = () => {
    const baseURL: string = "http://localhost:8000";
    const [login, setLogin] = useState<any>({status: "", token: ""});
    const [auth, setAuth] = useState<any>({message: "", status: ""});
    const [start, setStart] = useState<any>({message: "", status: ""})
    const [reset, setReset] = useState<any>({message: "", status: ""})

    const adminUser = {
        username: "admin",
        password: "admin123"
    }

    const [user, setUser] = useState<form>({
        username: "", 
        password: ""
    });

    const [error, setError] = useState("");

    const Login = (user: form) => {

        if (user.username == adminUser.username && user.password == adminUser.password){
            setUser({
                username: user.username,
                password: user.password
            });
            axios.post(baseURL + "/login", {}).then( res => {
                setLogin(res.data);
            });
            axios.post(baseURL + "/adminauth", {}, { headers: {"Authorization" : `Bearer ${login.token}`} }).then( res => {
                setAuth(res.data);
                if (auth.status == "success") {
                    alert(auth.message);
                } else {
                    setUser({
                        username: "",
                        password: ""
                    });
                    alert("Unexpected error occured! Please try again.");
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
        console.log("Reset game");
        axios.post(baseURL + "/reset", {}, { headers: {"Authorization" : `Bearer ${login.token}`} }).then( res => {
            setReset(res.data);
            alert("Game reset");
        });
    };

    const Start = () => {
        console.log("Start game");
        axios.post(baseURL + "/startgame", {}, { headers: {"Authorization" : `Bearer ${login.token}`} }).then( res => {
            setStart(res.data);
            alert(start.message);
        });
    };




    return(
        <div className="Adminpage">
            {(user.username != "") ? (
                <div className="welcome">
                    <h2>Welcome, Admin</h2>
                    <button onClick={Start}> Start</button>
                    <button onClick={Reset}> Reset</button>
                    <button onClick={Logout} >Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error} />
            )}
        </div>
    )
}


export default Adminpage;
