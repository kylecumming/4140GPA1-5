import React, { useEffect, useState } from "react";
import Axios from "axios";
import '../Login/Login.css';
import Cookies from "js-cookie";

<<<<<<< HEAD
 function Login(){
    /*Used code from https://www.codegrepper.com/code-examples/javascript/get+browser+cookies+javascript
for setCookie Function
*/
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
=======
function Login() {
>>>>>>> 379d3411b7c2ac40cc46faa85d9609d7af356099

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userid, setUserid] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;
    const login = () => {
        Axios.post(`http://localhost:3000/api/client/login`, {
            username: username,
            password: password,
            userid: userid,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
<<<<<<< HEAD
            }else{
                setCookie("userid", userid, 10);
=======
            } else {
>>>>>>> 379d3411b7c2ac40cc46faa85d9609d7af356099
                window.location.href = '/home'
                setLoginStatus("Logged in");
            }

        });
    };

<<<<<<< HEAD
    useEffect(()=>{
        Axios.get("http://localhost:3000/api/client/login").then((response) =>{
        if(response.data.loggedIn === true){
            setLoginStatus(response.data.user[0].username);
        }
        });
    }, []);
    
        return(
            <div class="loginPage">
                <h1>Client Login</h1>
                <div>
                    <label for="Username">Username</label>
                    <input type='Username' name='Username' id="Username" placeholder='Enter Username' required onChange={(e)=> {setUsername(e.target.value)}}/>
                </div>
                <div>
                    <label for="Password">Password</label>
                    <input type='Password' name='Password' placeholder='Enter Password' required onChange={(e)=> {setPassword(e.target.value)}}/>
                </div>
                <div>
                    <label for="userid">ClientId</label>
                    <input type='userid' name='userid' placeholder='Enter UserId' required onChange={(e)=> {setUserid(e.target.value)}}/>
                </div>
                    <button onClick={login}>Log In</button>
                
                <h1>{loginStatus}</h1>
=======
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
>>>>>>> 379d3411b7c2ac40cc46faa85d9609d7af356099
            </div>
            <button style={{ margin: '10px' }} onClick={login}>Log In</button>

            <h4>{loginStatus}</h4>
        </div>
    )

}

export default Login;

