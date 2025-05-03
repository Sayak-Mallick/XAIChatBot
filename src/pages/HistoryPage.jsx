import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

const HistoryPage = () => {
  const { conversations, loadConversation } = useChat();
  const navigate = useNavigate();

  const handleViewConversation = (id) => {
    loadConversation(id);
    navigate('/');
  };

  const getStarRating = (rating) => {
    return Array(5)
      .fill('★')
      .map((star, index) => (
        <span
          key={index}
          style={{ color: index < rating ? '#FFD700' : '#666' }}
        >
          {star}
        </span>
      ));
  };

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1rem',
      width: '100%'
    }}
      data-testid="history-container">
      <h2>Past Conversations</h2>

      <div style={{ marginTop: '2rem' }}>
        {conversations.length === 0 ? (
          <p>No conversations yet. Start chatting with Bot AI!</p>
        ) : (
          conversations.map(conversation => (
            <div
              key={conversation.id}
              data-testid="conversation-item"
              style={{
                backgroundColor: '#2c2c2c',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                cursor: 'pointer'
              }}
              onClick={() => handleViewConversation(conversation.id)}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <h3 style={{ margin: 0 }}>{conversation.title}</h3>
                {conversation.rating > 0 && (
                  <div style={{ fontSize: '1.2rem' }}>
                    {getStarRating(conversation.rating)}
                  </div>
                )}
              </div>

              <div style={{ color: '#888', fontSize: '0.9rem' }}>
                {conversation.messages.length} messages
              </div>

              {conversation.messages.length > 0 && (
                <div style={{
                  marginTop: '0.5rem',
                  backgroundColor: '#1a1a1a',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
                  data-testid="message-preview">
                  <strong>Last message:</strong> {conversation.messages[conversation.messages.length - 1].text.substring(0, 50)}
                  {conversation.messages[conversation.messages.length - 1].text.length > 50 ? '...' : ''}
                </div>
              )}

              {conversation.feedback && (
                <div style={{
                  marginTop: '0.5rem',
                  fontStyle: 'italic',
                  color: '#aaa'
                }}>
                  "{conversation.feedback}"
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
