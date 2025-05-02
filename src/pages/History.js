import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './History.css';

const History = () => {
  const [savedMessages, setSavedMessages] = useState([]);

  // In a real app, you would load saved messages from storage here
  useEffect(() => {
    // Placeholder for loading saved messages
    const loadedMessages = JSON.parse(localStorage.getItem('savedMessages')) || [];
    setSavedMessages(loadedMessages);
  }, []);

  return (
    <div className="history-container">
      <header className="history-header">
        <h1>Saved Messages</h1>
        <span className="soul-ai-label">Soul AI</span>
      </header>

      <div className="messages-list">
        {savedMessages.length > 0 ? (
          savedMessages.map((item, index) => (
            <div key={index} className="message-item">
              <strong>You:</strong> {item.question}
              <p><strong>Bot:</strong> {item.answer}</p>
            </div>
          ))
        ) : (
          <p>No saved messages yet.</p>
        )}
      </div>

      <div className="back-link">
        <Link to="/">Back to Chat</Link>
      </div>
    </div>
  );
};

export default History;
