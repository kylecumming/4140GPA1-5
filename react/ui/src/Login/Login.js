import React, { useState } from "react";
import Axios from "axios";
import '../Login/Login.css';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const login = () => {
        Axios.post(`http://localhost:3000/api/client/login`, {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                window.location.href = '/home'
                setLoginStatus("Logged in");
            }

        });
    };

    return (
        <div class="loginPage">
            <h1>Client Login</h1>
            <div>
                <label for="Username" style={{ margin: '10px' }}>Username</label>
                <input type='Username' name='Username' id="Username" placeholder='Enter Username' required onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <div>
                <label for="Password" style={{ margin: '10px' }}>Password</label>
                <input type='Password' name='Password' placeholder='Enter Password' required onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <button style={{ margin: '10px' }} onClick={login}>Log In</button>

            <h4>{loginStatus}</h4>
        </div>
    )

}

export default Login;

