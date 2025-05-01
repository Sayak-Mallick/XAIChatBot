import React, { useContext } from 'react';
//styles
import "./SideBar.css";
//assets
import icon1 from "../../assets/icon1.png";
import penIcon from "../../assets/pen.png";
import closeBlackIcon from "../../assets/closeBlack.svg";
import closeWhiteIcon from "../../assets/closeWhite.svg";
//contexts
import { ThemeContext } from '../../AllContexts';
import Button from '../Button/Button';

const SideBar = props => {
    //props
    const { handleSideBar, sidebarON, handlePastConvo, newChatClick } = props;
    //context
    const [theme, setTheme] = useContext(ThemeContext)

    //functions
    const sideBarForLarge = () => {
        return (
            <aside className={`SideBar SideBarTheme-${theme} SideBar-large`}>
                <div onClick={newChatClick} className={`sideBarHead sideBarHeadTheme=${theme}`}>
                    <img src={icon1} alt="app icon" className='appLogo'/>
                    <h2>New Chat</h2>
                    <img src={penIcon} alt='pen icon' className='penIcon'/>
                    
                </div>
                <div className='sideBarBody'>
                    <Button clickFunction={handlePastConvo} text={"Past Conversations"} customClass="pastConvo"/>
                </div>
            </aside>
        )}

    const sideBarForSmall = () => {
        return (
            <aside className={`SideBar SideBarTheme-${theme} SideBar-small`}>
                <div onClick={newChatClick} className={`sideBarHead sideBarHeadTheme=${theme}`}>
                    <img src={icon1} alt="app icon" className='appLogo'/>
                    <h2>New Chat</h2>
                    <img src={penIcon} alt='pen icon' className='penIcon'/>
                    
                </div>
                <div className='sideBarBody'>
                    <Button clickFunction={handlePastConvo} text={"Past Conversations"} customClass="pastConvo"/>
                </div>
                {
                    sidebarON ? 
                    <img onClick={handleSideBar} src={closeBlackIcon} alt="close button" className='closeSideBarButton'/>
                    :
                    null
                }
            </aside>
        )
    }

    return (
        <>
            {sideBarForLarge()}
            {sidebarON ? sideBarForSmall() : null}
        </>
    );
};

export default SideBar;