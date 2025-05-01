import React from 'react';
//styles
import "./ConvoCard.css"
//components
import ChatCard from '../ChatCard/ChatCard';
//contexts
import { ThemeContext } from '../../AllContexts';

const ConvoCard = ({id, conversation}) => {
    //functions
    const displayCards = () => {
        return conversation.map(card => {
            const { icon, name, message, time, id, like, dislike } = card;
            return <ChatCard like={like} dislike={dislike} customClass="insidePast" key={id} icon={icon} name={name} message={message} time={time}/>
        })
    }
    return (
        <div className='ConvoCard'>
            {displayCards()}
        </div>
    )
}

export default ConvoCard;