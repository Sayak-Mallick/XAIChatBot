import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HistoryPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Group messages by conversations (for demo purposes, consider all messages as one conversation)
  const conversations = messages.length > 0 ? [messages] : [];

  return (
    <div className="history-container">
      <div className="nav-links">
        <Link to="/">New Chat</Link>
      </div>
      <h2>Past Conversations</h2>
      
      {conversations.length > 0 ? (
        conversations.map((conversation, index) => (
          <div key={index} className="history-item">
            <h3>Conversation {index + 1}</h3>
            {conversation.map(msg => (
              <div key={msg.id} className="message">
                <p><strong>{msg.type === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No past conversations found</p>
      )}
    </div>
  );
}

export default HistoryPage;
