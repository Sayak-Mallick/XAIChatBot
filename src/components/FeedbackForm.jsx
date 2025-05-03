import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const FeedbackForm = ({ conversationId }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { updateConversationFeedback } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateConversationFeedback(conversationId, rating, feedback);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h3 style={{ color: '#646cff' }}>Thank you for your feedback!</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', borderTop: '1px solid #444' }}>
      <h3>Rate this conversation</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: star <= rating ? '#FFD700' : '#666'
                }}
              >
                ★
              </button>
            ))}
          </div>
          <div>{rating} / 5</div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="feedback" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Share your thoughts about this conversation:
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6em 1.2em',
              fontSize: '1em',
              borderRadius: '8px',
              border: '1px solid #444',
              backgroundColor: '#242424',
              color: 'rgba(255, 255, 255, 0.87)',
              minHeight: '100px'
            }}
          />
        </div>

        <button
          type="submit"
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
          Save
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
