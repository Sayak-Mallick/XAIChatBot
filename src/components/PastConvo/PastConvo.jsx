import React, { useEffect, useState } from 'react';
//styles
import "./PastConvo.css"
//components
import ConvoCard from '../ConvoCard/ConvoCard';
//contexts
import { ThemeContext } from '../../AllContexts';



const PastConvo = () => {
    //states
    const [convos, setConvos] = useState([]);
    //side effects
    useEffect(()=> {
        loadConvos();
    }, []);
    //functions
    const loadConvos = () => {
        const allConvos = window.localStorage.getItem("pastConversations");
        if(allConvos) setConvos(JSON.parse(allConvos));
    }
    const displayCards = () => convos.map(item => {
        const {id, conversation} = item;
        return <ConvoCard id={id} key={id} conversation={conversation} />
    });

    return (
        <div className='PastConvo'>
            <h4>Conversation History</h4>
            <div className='pastConvoBody'>
                {convos.length ? displayCards() : <h2>No Past Conversations Found</h2> }
            </div>
        </div>
    );
};

export default PastConvo;