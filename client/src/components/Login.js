import { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import formTheme from "../themes/formTheme";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../contexts/UserContext';
const Login = () => {
    const token = localStorage.getItem("auth-token");
    const history = useHistory();
    if (token) {
        history.replace("/");
    }
    const username = localStorage.getItem("username");
    const { userData, setUserData } = useContext(UserContext);
    const [allErrMsg, setAllErrMsg] = useState("");
    const { theme, Label, Input, Button, Ltag, Perror } = formTheme;

    const submitUser = async (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        const givenData = {
            username: elements.username.value,
            pass: elements.pass.value
        };
        setAllErrMsg("");
        try {
            const res = await axios.post("/api/user/login", givenData);
            const { status, data } = res;
            localStorage.setItem("auth-token", data.token);
            localStorage.setItem("username", data.username);
            setUserData({ token: data.token, username: data.username });
            history.push('/');
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status == 400) {
                    setAllErrMsg(data.allErrMsg);
                }
                else if (status == 500) {
                    history.push("/Error500");
                }
            }
        }

    };

    return (
        <ThemeProvider theme={theme}>
            {
                allErrMsg &&
                <div className="form-item m-5 row">
                    <Perror style={{ fontSize: "20px" }} className="col-12 text-danger" data-text={"*" + allErrMsg}>*{allErrMsg}</Perror>
                </div>
            }
            <form className="display-flex" onSubmit={submitUser}>
                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="username" >Username or Email: </Label>
                    <Input className="col-2" type="text" name="username" id="username" />
                </div>
                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="pass" >Password : </Label>
                    <Input className="col-2" type="password" name="pass" id="pass" />
                </div>
                <div className="form-item m-5 row">
                    <Button className="col-2 rounded-pill btn" type="submit">Sign In</Button>
                    <Ltag className="col-2" to="/signup"> Create an account? </Ltag>
                </div>
            </form>
        </ThemeProvider>
    );
};

export default Login;