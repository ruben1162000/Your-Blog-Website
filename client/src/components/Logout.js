import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import formTheme from "../themes/formTheme";
const Logout = () => {
    const [loggingOut, setLoggingOut] = useState(true);
    const { Ltag } = formTheme;
    const { userData, setUserData } = useContext(UserContext);
    useEffect(() => {
        localStorage.setItem("auth-token", "");
        localStorage.setItem("auth-token", "");
        setUserData({ token: "", username: "" });
        setLoggingOut(false);
    }, []);
    return (
        <div>
            {
                loggingOut ?
                    <div>Logging out....</div> :
                    <div>{"Logged out successfully :"} <Ltag to="/">Go to home page</Ltag></div>
            }
        </div>
    );
}

export default Logout;