import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import formTheme from "../themes/formTheme";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const Signup = () => {
    const token = localStorage.getItem("auth-token");
    if (token)
        history.push('/');
    const [allErrMsg, setallErrMsg] = useState("");
    const [emailErrMsg, setemailErrMsg] = useState("");
    const [usernameErrMsg, setusernameErrMsg] = useState("");
    const [passErrMsg, setpassErrMsg] = useState("");
    const [repassErrMsg, setrepassErrMsg] = useState("");
    const history = useHistory();
    const { theme, Label, Input, Button, Ltag, Perror } = formTheme;

    const submitUser = async (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        const givenData = {
            username: elements.username.value,
            email: elements.email.value,
            pass: elements.pass.value,
            repass: elements.repass.value
        };
        setallErrMsg("");
        setemailErrMsg("");
        setusernameErrMsg("");
        setpassErrMsg("");
        setrepassErrMsg("");
        try {
            const res = await axios.post("/api/user/signup", givenData);
            const { status, data } = res;
            localStorage.setItem("auth-token", data.token);
            localStorage.setItem("username", data.username);
            history.push('/');
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    eval(`set${data.name}("${data.msg}")`);
                }
                else if (status === 500) {
                    history.push("/Error500");
                }
            }
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <form className="signup-form display-flex" onSubmit={submitUser} >
                {allErrMsg && <div className="form-item m-5 row"><Perror style={{ fontSize: "20px" }} className="col-12 text-danger" data-text={`*${allErrMsg}`}>*{allErrMsg}</Perror></div>}

                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="email">Email id : </Label>
                    <Input className="col-2" type="email" name="email" id="email" />
                </div>

                {
                    emailErrMsg &&
                    <div className="form-item m-5 row">
                        <Perror style={{ fontSize: "20px" }} className="col-12 text-danger" data-text={`*${emailErrMsg}`}>*{emailErrMsg}</Perror>
                    </div>
                }

                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="username" >Username: </Label>
                    <Input className="col-2" type="text" name="username" id="username" />
                    {usernameErrMsg && <p >*{usernameErrMsg}</p>}
                </div>

                {
                    usernameErrMsg &&
                    <div className="form-item m-5 row">
                        <Perror style={{ fontSize: "20px" }} className="col-12 text-danger" data-text={`*${usernameErrMsg}`}>*{usernameErrMsg}</Perror>
                    </div>
                }

                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="pass" >Password : </Label>
                    <Input className="col-2" type="password" name="pass" id="pass" />
                </div>

                {
                    passErrMsg &&
                    <div className="form-item m-5 row">
                        <Perror style={{ fontSize: "20px" }} className="col-12 text-danger" data-text={`*${passErrMsg}`}>*{passErrMsg}</Perror>
                    </div>
                }

                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="repass" >Enter Password Again: </Label>
                    <Input className="col-2" type="password" name="repass" id="repass" />
                </div>

                {
                    repassErrMsg &&
                    <div className="form-item m-5 row">
                        <Perror style={{ fontSize: "20px" }} className="col-12 text-danger" data-text={`*${repassErrMsg}`}>*{repassErrMsg}</Perror>
                    </div>
                }

                <div className="form-item m-5 row">
                    <Button className="col-2 rounded-pill btn" type="submit">Create</Button>
                    <Ltag className="col-2" to="/login">Already have an Account?</Ltag>
                </div>
            </form>
        </ThemeProvider>
    );
};

export default Signup;