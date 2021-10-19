import React, { useState } from 'react';
import LoginForm, { LoginProps, form } from '../components/LoginForm';


export interface AdminProp {
    Login: (details: form) => void;
    error: string;
}

const Adminpage : React.FC<AdminProp> = () => {
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
        console.log(user);

        if (user.username == adminUser.username && user.password == adminUser.password){
            console.log("Logged in");
            setUser({
                username: user.username,
                password: user.password
            });
        } else {
            alert("Details do not match");
            setError("Details do not match")
        }
    }

    function Logout(){
        setUser({
            username: "", 
            password: ""
        });
    }

    return(
        <div className="Adminpage">
            {(user.username != "") ? (
                <div className="welcome">
                    <h2>Welcome, Admin</h2>
                    <button> Start</button>
                    <button> Reset</button>
                    <button onClick={Logout} >Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error} />
            )}
        </div>
    )
}


export default Adminpage;
