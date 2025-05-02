import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

const Header = () => {
  const location = useLocation();
  const isHistory = location.pathname === '/history';
  const { startNewConversation } = useChat();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#1a1a1a',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0 }}>Bot AI</h1>
      <nav>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '1rem',
          margin: 0,
          padding: 0
        }}>
          <li>
            <Link to="/" style={{
              color: !isHistory ? '#646cff' : 'white',
              textDecoration: 'none',
              fontWeight: !isHistory ? 'bold' : 'normal'
            }}>
              Chat
            </Link>
          </li>
          <li>
            <Link to="/history" style={{
              color: isHistory ? '#646cff' : 'white',
              textDecoration: 'none',
              fontWeight: isHistory ? 'bold' : 'normal'
            }}>
              Past Conversations
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => startNewConversation()} style={{
              color: 'white',
              textDecoration: 'none',
              backgroundColor: '#646cff',
              padding: '0.3rem 0.8rem',
              borderRadius: '4px'
            }}>
              New Chat
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
