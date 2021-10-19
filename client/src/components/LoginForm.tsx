import React, { useState } from 'react';
import Login from '../views/Admin';
import { AdminProp } from '../views/Admin';

export interface LoginProps {
}

export type form = {
    username: string;
    password: string;
}

const LoginForm : React.FC<AdminProp> = ({ Login, error }) => {
    const [details, setDetails] = useState<form>({
        username: "", 
        password: ""
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(details);
        Login(details);
    }


    return(
        <form onSubmit={(submitHandler)}>
            <div className="form-inner">
                <h2>Login</h2>
                {(error != "") ? ( <div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, username: e.target.value})} value={details.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    )
}


export default LoginForm;
