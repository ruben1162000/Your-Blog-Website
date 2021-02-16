import { useContext, useEffect, useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, Label, Input, Button, Atag } from "../themes/Themes";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const Login = () => {
    const { userData, setUserData } = useContext("UserContext");
    const [allErrMsg, setAllErrMsg] = useState("");
    const userLoginForm = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (userData.token)
            history.push('/');
    }, []);

    const submitUser = async (e) => {
        e.preventDefault();
        const givenData = new FormData(userLoginForm.current);
        setAllErrMsg("");
        try {
            const res = await axios.post("/api/user/login", givenData);
            const { status, data } = res;
            setUserData(data);
            history.push('/');
        } catch (error) {
            const { status, data } = error.response;
            if (status == 400) {
                setAllErrMsg(data.allErrMsg);
            }
            else if (status == 500) {
                //redirect 500 page
            }
        }

    };

    return (
        <ThemeProvider theme={theme}>
            {allErrMsg && <p style="color:red">*{allErrMsg}</p>}
            <form className="display-flex" ref={userLoginForm}>
                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="username" >Username or Email: </Label>
                    <Input className="col-2" type="text" name="username" id="username" />
                </div>
                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="pass" >Password : </Label>
                    <Input className="col-2" type="password" name="pass" id="pass" />
                </div>
                <div className="form-item m-5 row">
                    <Button className="col-2 rounded-pill" onClick={submitUser}>Sign In</Button>
                    <Atag className="col-2" href="/signup"> Create an account? </Atag>
                </div>
            </form>
        </ThemeProvider>
    );
};

export default Login;