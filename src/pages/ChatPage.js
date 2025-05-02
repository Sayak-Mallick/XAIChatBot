import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import responseData from '../data/responses.json';

function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { id: Date.now(), type: 'user', text: input }
    ];

    // Generate bot response
    let botResponse;
    const questionInData = Object.keys(responseData).find(
      key => key.toLowerCase() === input.toLowerCase()
    );
    
    if (questionInData) {
      botResponse = responseData[questionInData];
    } else {
      botResponse = "I don't have an answer for that question.";
    }

    // Add bot message
    newMessages.push({
      id: Date.now() + 1,
      type: 'bot',
      text: botResponse
    });

    setMessages(newMessages);
    setInput('');
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <div className="nav-links">
        <Link to="/" onClick={handleNewChat}>New Chat</Link>
        <Link to="/history">Past Conversations</Link>
      </div>
      
      <div className="message-container">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <p><strong>{msg.type === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          aria-label="Ask a question"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;
