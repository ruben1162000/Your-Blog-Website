import styled, { keyframes, css } from 'styled-components';
import { Link } from "react-router-dom";
const theme = {
    primary: "#d1045d",
    secondary: "#ff9cc7",
    font1url: "https://fonts.googleapis.com/css2?family=Potta+One&display=swap",
    font1fam: "'Potta One', cursive",
    font2url: "https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap",
    font2fam: "'Hachi Maru Pop', cursive"
}

const Label = styled.label`
    font-family: ${(props) => props.theme.font1fam};
    font-size: 6 rem;
    color : ${props => props.theme.primary};
`;

const Input = styled.input`
    outline: none;
    border-radius: 10px;
    background-color: ${props => props.theme.secondary};
    border:none;
    &:focus{
        box-shadow : 0 0 10px ${props => props.theme.primary};
    };
`;

const Button = styled.button`
    background-color: ${props => props.theme.secondary};
    font-family: ${(props) => props.theme.font1fam};
    font-size: 6 rem;
    color : ${props => props.theme.primary};
    outline:none;
    &:active,:focus{
        outline:none;
    };

`;

const Ltag = styled(Link)`
    text-decoration:none;
    font-family: ${(props) => props.theme.font1fam};
    font-size: 6 rem;
    color : ${props => props.theme.primary};
    &:hover{
        text-decoration:none;
        text-shadow : 0 0 10px ${props => props.theme.secondary};
    };
`;

const Atag = styled.a`
    text-decoration:none;
    font-family: ${(props) => props.theme.font1fam};
    font-size: 6 rem;
    color : ${props => props.theme.primary};
    &:hover{
        text-decoration:none;
        text-shadow : 0 0 10px ${props => props.theme.secondary};
    };
`;

const noisestrGen = () => {
    let noisestr = "";
    const steps = 20;
    for (let i = 0; i < steps; i++) {
        let top = Math.random() * 100 + 1;
        let bottom = Math.random() * (101 - top) + 1;
        noisestr += `${i / steps * 100}%{clip-path: inset(${top}% 0 ${bottom}% 0);}\n\n`;
    }
    return noisestr;
};

const noiseAnim = keyframes`
    ${noisestrGen()}
`;

const Perror = styled.p`
    position: relative;
    &:before {
        content: attr(data-text);
        position: absolute;
        width: 100%;
        height: 100%;
        text-shadow: -1px -1px 2px red;
        color: red;
        overflow: hidden;
        animation: ${noiseAnim} 10s infinite linear alternate-reverse;
    };
    
`;

const formTheme = { theme, Label, Input, Button, Atag, Ltag, Perror };
export default formTheme;