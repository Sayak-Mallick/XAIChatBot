import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../AllContexts';
//styles
import "./ChatBody.css";
//assets
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import likeOutlinedIcon from "../../assets/like-outline-black.svg";
import dislikeOutlinedIcon from "../../assets/dislike-outline-black.svg";
import sampleData from "../../assets/sampleData.json";
//components
import ChatCard from '../ChatCard/ChatCard';
import Form from '../Form/Form';
import Intro from '../Intro/Intro';
//helper functions
import { createTimeStamp, findQuestionFromSampleData, saveChatToLocal } from '../../functions/functions';

const ChatBody = props => {
    //props
    const { currentChat, addChatMsg, clearCurrentChat, likeDislikeReply } = props;
    //context
    const [theme, setTheme] = useContext(ThemeContext);
    //side effects
    useEffect(()=>{
        if(!currentChat) return
        scrollToBottom();
    }, [currentChat])
    //functions
    const handleFormInput = text => {

        // create relevant response from form input
        // create new chat cards from form input and response
        // add to currentChats

        const responseArr = findQuestionFromSampleData(sampleData, text);

        const userCard = {
            icon: icon2,
            name: "you",
            message: text,
            time: createTimeStamp(),
            id: `you-${new Date() / 1}`,
        }

        const botCard = {
            icon: icon1,
            name: "bot ai",
            message: responseArr?.[0]?.response || "something went wrong...",
            time: createTimeStamp(),
            id: `botAI-${new Date() / 1}`,
            like: likeOutlinedIcon,
            dislike: dislikeOutlinedIcon,
            // like: "/src/assets/like-outline-black.svg",
            // dislike: "src/assets/dislike-outline-black.svg"
        }

        addChatMsg(userCard, botCard);
    }
    const displayCards = () => {

        if(!currentChat || !currentChat.length) return [];

        return currentChat.map(card => {
            const { icon, name, message, time, id, like, dislike } = card;
            let customClass
            if(name === "bot ai") customClass = "botCard";
            else customClass = "userCard"
            return <ChatCard like={like} dislike={dislike} id={id} likeDislikeReply={likeDislikeReply} customClass={customClass} key={id} icon={icon} name={name} message={message} time={time}/>
        })
    }
    const saveChat = () => {
        if(!currentChat || !currentChat.length) return alert("No Conversation to save.")
        saveChatToLocal(currentChat);
        clearCurrentChat();
        alert("Conversation saved!")
    }
    // Function to scroll to the bottom of the div
    function scrollToBottom() {
        var container = document.getElementById("cardsWrapper");
        if(!container) return;
        container.scrollTop = container.scrollHeight;
    }

    return (
        <div className={`ChatBody ChatBodyTheme-${theme}`}>
        {
            currentChat?.length ?
            <>
                <div className='cardsWrapper' id="cardsWrapper">
                    {displayCards()}
                </div>
                <Form handleFormInput={handleFormInput} saveChat={saveChat}/>
            </>
            :
            <>
                <Intro handleFormInput={handleFormInput}/>
                <Form handleFormInput={handleFormInput} />
            </>
        }
            
        </div>
    );
};

export default ChatBody;