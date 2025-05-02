import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const Message = ({ message, conversationId }) => {
  const { updateMessageFeedback } = useChat();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleLike = (liked) => {
    updateMessageFeedback(conversationId, message.id, { liked });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        maxWidth: '80%',
        alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: message.sender === 'user' ? '#646cff' : '#2c2c2c',
        color: message.sender === 'user' ? 'white' : 'rgba(255, 255, 255, 0.87)'
      }}
      onMouseEnter={() => message.sender === 'bot' && setShowFeedback(true)}
      onMouseLeave={() => setShowFeedback(false)}
    >
      <div style={{
        fontSize: '0.8rem',
        marginBottom: '0.5rem',
        color: message.sender === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#888'
      }}>
        {message.sender === 'user' ? 'You' : <span>Soul AI</span>}
      </div>

      {message.sender === 'bot' ? (
        <p data-testid="bot-message" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.text}</p>
      ) : (
        <div style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.text}</div>
      )}

      {message.sender === 'bot' && showFeedback && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '0.5rem',
            gap: '0.5rem'
          }}
        >
          <button
            onClick={() => handleLike(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: message.feedback?.liked === true ? '#4CAF50' : '#fff',
              padding: '2px'
            }}
          >
            👍
          </button>
          <button
            onClick={() => handleLike(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: message.feedback?.liked === false ? '#F44336' : '#fff',
              padding: '2px'
            }}
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
