import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import responses from '../data/responses.json';
import './ChatInterface.css';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowerCaseMessage = message.toLowerCase();

    // Get response from responses object or default message
    const botResponse = responses[lowerCaseMessage] || "Sorry, Did not understand your query!";
    setResponse(botResponse);
  };

  const saveMessage = () => {
    if (message && response) {
      const newSavedMessage = { question: message, answer: response };
      setSavedMessages([...savedMessages, newSavedMessage]);
      // In a real app, you might save to local storage or a backend here
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Bot AI</h1>
        <span className="soul-ai-label">Soul AI</span>
      </header>

      <div className="chat-area">
        {response && <p className="bot-response">{response}</p>}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message Bot AI..."
          className="chat-input"
        />
        <button type="submit" className="ask-button">Ask</button>
        <button type="button" className="save-button" onClick={saveMessage}>Save</button>
      </form>

      <div className="history-link">
        <Link to="/history">View Saved Messages</Link>
      </div>
    </div>
  );
};

export default ChatInterface;
