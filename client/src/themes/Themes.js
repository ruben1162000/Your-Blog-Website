import styled from 'styled-components';
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

module.exports = { theme, Label, Input, Button, Atag };