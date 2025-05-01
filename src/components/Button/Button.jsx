import React, { useContext } from 'react';
//styles
import "./Button.css";
//contexts
import { ThemeContext } from '../../AllContexts';

const Button = props => {
    //props
    const { clickFunction, text, type, customClass } = props;
    //context
    const [theme, setTheme] = useContext(ThemeContext)
    return (
        <button onClick={clickFunction} className={`Button ButtonTheme-${theme} ${customClass}`} type={type} >
            {text || "text"}
        </button>
    );
};

export default Button;