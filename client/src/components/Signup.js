import { useContext, useEffect, useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, Label, Input, Button, Atag } from "../themes/Themes";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const Signup = () => {
    const { userData, setUserData } = useContext("UserContext");
    const [allErrMsg, setallErrMsg] = useState("");
    const [emailErrMsg, setemailErrMsg] = useState("");
    const [usernameErrMsg, setusernameErrMsg] = useState("");
    const [passErrMsg, setpassErrMsg] = useState("");
    const [repassErrMsg, setrepassErrMsg] = useState("");
    const userSignupForm = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (userData.token)
            history.push('/');
    }, []);

    const submitUser = async (e) => {
        e.preventDefault();
        const givenData = new FormData(userSignupForm.current);
        setallErrMsg("");
        setemailErrMsg("");
        setusernameErrMsg("");
        setpassErrMsg("");
        setrepassErrMsg("");
        try {
            const res = await axios.post("/api/user/signup", givenData);
            const { status, data } = res;
            setUserData(data);
            history.push('/');
        } catch (error) {
            const { status, data } = error.response;
            if (status == 400) {
                eval(`set${data.name}("${data.msg}")`);
            }
            else if (status == 500) {
                //redirect 500 page
            }
        }

    };

    return (
        <ThemeProvider theme={theme}>
            {allErrMsg && <p style="color:red">*{allErrMsg}</p>}
            <form className="signup-form display-flex" ref={userSignupForm}>
                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="email">Email id : </Label>
                    <Input className="col-2" type="email" name="email" id="email" />
                    {emailErrMsg && <p style="color:red">*{emailErrMsg}</p>}
                </div>

                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="username" >Username: </Label>
                    <Input className="col-2" type="text" name="username" id="username" />
                    {usernameErrMsg && <p style="color:red">*{usernameErrMsg}</p>}
                </div>

                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="pass" >Password : </Label>
                    <Input className="col-2" type="password" name="pass" id="pass" />
                    {passErrMsg && <p style="color:red">*{passErrMsg}</p>}
                </div>

                <div className="form-item m-5 row">
                    <Label className="col-2" htmlFor="repass" >Enter Password Again: </Label>
                    <Input className="col-2" type="password" name="repass" id="repass" />
                    {repassErrMsg && <p style="color:red">*{repassErrMsg}</p>}
                </div>

                <div className="form-item m-5 row">
                    <Button className="col-2 rounded-pill" onClick={submitUser}>Create</Button>
                    <Atag className="col-2" href="/login">Already have an Account?</Atag>
                </div>
            </form>
        </ThemeProvider>
    );
};

export default Signup;