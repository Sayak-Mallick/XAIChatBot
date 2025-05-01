import React, { useContext } from 'react';
//styles
import "./SuggestCard.css";
//contexts
import { ThemeContext } from '../../AllContexts';

const SuggestCard = props => {
    //props
    const { mainText, subText, handleFormInput } = props;
    // ..contexts
    const [theme, setTheme] = useContext(ThemeContext);
    return (
        <div className={`SuggestCard SuggestCardTheme-${theme}`} onClick={()=> handleFormInput(mainText)}>
            <span className='SuggestCard-mainText'>{mainText}</span>
            <span className='SuggestCard-subtext'>{subText}</span>
        </div>
    );
};

export default SuggestCard;