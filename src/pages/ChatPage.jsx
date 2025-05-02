import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import FeedbackForm from '../components/FeedbackForm';

const ChatPage = () => {
  const { currentConversation, startNewConversation } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!currentConversation) {
      startNewConversation();
    }
  }, [currentConversation, startNewConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  if (!currentConversation) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%'
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #444',
        backgroundColor: '#1a1a1a'
      }}>
        <h2>{currentConversation.title}</h2>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {currentConversation.messages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            margin: 'auto',
            color: '#888'
          }}>
            <h3>Start a conversation with Bot AI</h3>
            <p>Ask a question to get started</p>
          </div>
        ) : (
          currentConversation.messages.map(message => (
            <Message
              key={message.id}
              message={message}
              conversationId={currentConversation.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {currentConversation.messages.length > 0 &&
        currentConversation.messages.filter(m => m.sender === 'bot').length > 0 &&
        !currentConversation.rating ? (
        <FeedbackForm conversationId={currentConversation.id} />
      ) : null}

      <MessageInput />
    </div>
  );
};

export default ChatPage;
