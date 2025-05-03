import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '1rem',
        borderTop: '1px solid #444',
        backgroundColor: '#1a1a1a'
      }}
      data-testid="message-form"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message Bot AI..."
        data-testid="message-input"
        style={{
          flex: 1,
          padding: '0.6em 1.2em',
          fontSize: '1em',
          borderRadius: '8px',
          border: '1px solid #444',
          backgroundColor: '#242424',
          color: 'rgba(255, 255, 255, 0.87)'
        }}
      />
      <button
        type="submit"
        data-testid="send-button"
        style={{
          padding: '0.6em 1.2em',
          fontSize: '1em',
          borderRadius: '8px',
          border: '1px solid transparent',
          fontWeight: 500,
          backgroundColor: '#646cff',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Ask
      </button>
    </form>
  );
};

export default MessageInput;
