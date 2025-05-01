import React, { useContext } from 'react';
// styles
import "./Intro.css";
// assets
import icon1 from "../../assets/icon1.png";
// contexts
import { ThemeContext } from '../../AllContexts';
import SuggestCard from '../SuggestCard/SuggestCard';


const cardText1 = "Hi, what is the weather";
const cardText2 = "Hi, what is my location";
const cardText3 = "Hi, what is the temperature";
const cardText4 = "Hi, how are you";
const subText = "Get immediate AI generated response";

const Intro = ({handleFormInput}) => {
    //context
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <div className={`Intro IntroTheme-${theme}`}>
            <div className='introQuestion'>
                <h1>How Can I Help You Today?</h1>
                <img src={icon1} alt="bot ai" />
            </div>
            <div className='introCards'>
                <SuggestCard handleFormInput={handleFormInput} mainText={cardText1} subText={subText}/>
                <SuggestCard handleFormInput={handleFormInput} mainText={cardText2} subText={subText}/>
                <SuggestCard handleFormInput={handleFormInput} mainText={cardText3} subText={subText}/>
                <SuggestCard handleFormInput={handleFormInput} mainText={cardText4} subText={subText}/>
            </div>
        </div>
    );
};

export default Intro;