import React, { useContext, useState } from 'react';
//styles
import "./Form.css";
//contexts
import { ThemeContext } from '../../AllContexts';
import Button from '../Button/Button';

const Form = props => {
    //props
    const { handleFormInput, saveChat } = props;
    //states
    const [text, setText] = useState("");
    // ..contexts
    const [theme, setTheme] = useContext(ThemeContext);
    //functions
    const handleSubmit = event => {
        event.preventDefault();
        handleFormInput(text);
        setText("");
    }
    return (
        <div className='Form-wrapper'>
            <form className='Form' onSubmit={handleSubmit}>
                <input value={text} onChange={e => setText(e.target.value)} required />
                <Button text="ask" type="submit" />
            </form>
            <Button text="save" clickFunction={saveChat}/>
        </div>
    );
};

export default Form;