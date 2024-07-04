import React,{ useEffect, useState } from "react";
import axios from "axios";

export default function LoginForm () {

    const [login,setLogin] = useState({
        username: "",
        password: ""
    });

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [hideLoginForm, setHideLoginForm] = useState(false);

    const [error, setError] = useState();
    const [loggingIn,setLoggingIn] = useState(false);
    const [token,setToken] = useState();

    const userName = (e) => {
        setLogin({ ...login, username: e.target.value })
       
    }
    const uPassword = (e) => {
        setLogin({ ...login, password: e.target.value })
       
    }

    const loginFormBtn = () => {

        setShowLoginForm(true)
    
    }

    const submitLoginForm = (e) => {
        e.preventDefault();
        setLoggingIn(true);
       
        axios.post('http://localhost/react-wp/wp-json/jwt-auth/v1/token', login)

            .then((res) => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_nicename', res.data.user_nicename);
                localStorage.setItem('user_email', res.data.user_email);
                localStorage.setItem('user_display_name', res.data.user_display_name);
                
                //const updatedForm = [...login, res.data];
                setToken(res.data.token);
                sessionStorage.setItem('token',res.data.token);
                setLogin({ ...login, username: '',password:'' });
                
            })
            .catch((err) => {
                //setError(new Error("Incorrect email or password"));
                setError("Incorrect email or password");
                setLoggingIn(false);
                console.log(err)
                
        });
    }

    return (
        <>
        {!showLoginForm && (<div className="post-div login-button">
            <button className="button" id="login-btn-id" onClick={loginFormBtn}>Login</button>
        </div>)}
        
        {
            showLoginForm && (<div className="login posts-wrap" id="login-form-id">
            
                <div className="container">
                    {!loggingIn && error && <div className="error">{error}</div>}
                    {loggingIn && <div className="logged-in">Logged In...</div>}
                    {!loggingIn &&
                    (<div className="row post-div">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" value={login.username} name="uname" onChange={userName} required />
                    
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" value={login.password} name="password" onChange={uPassword} required />
                            <div className="login-button">  
                        <button type="submit" onClick={submitLoginForm} className="button">Submit</button>
                        </div>
                    </div>)   
                    }
                </div>
                
            </div>)
        }
        {token ? 'JWT Token is Set...' : ''}
        
        
        </>
    );
}