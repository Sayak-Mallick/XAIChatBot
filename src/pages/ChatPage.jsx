import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { useConversation } from '../context/ConversationContext';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
`;

const EmptyStateTitle = styled.h2`
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const EmptyStateText = styled.p`
  color: var(--text-light);
  max-width: 500px;
`;

const FeedbackSection = styled.div`
  padding: 1.5rem;
  background-color: var(--white);
  border-top: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
`;

const FeedbackTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => ($active ? 'var(--warning)' : 'var(--gray-300)')};
  font-size: 1.5rem;
  padding: 0.25rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--warning);
  }
`;

const FeedbackCommentArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  resize: vertical;
  font-family: inherit;
  margin-bottom: 1rem;
  min-height: 100px;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const SaveButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  align-self: flex-start;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-light);
  }
`;

const LoadingText = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
`;

const ChatPage = () => {
  const { conversationId } = useParams();
  const { 
    currentConversation, 
    loading, 
    selectConversation, 
    startNewConversation, 
    updateConversationFeedback 
  } = useConversation();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // If no conversationId provided, create a new one
    if (!conversationId) {
      const newConversation = startNewConversation();
      navigate(`/chat/${newConversation.id}`);
      return;
    }

    // Convert conversationId to number since it comes from URL as string
    selectConversation(Number(conversationId) || parseInt(conversationId));
  }, [conversationId, loading, startNewConversation, selectConversation, navigate]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentConversation?.messages]);

  const handleRatingClick = (rating) => {
    if (!currentConversation) return;
    
    updateConversationFeedback(currentConversation.id, {
      rating: currentConversation.feedback.rating === rating ? null : rating
    });
  };

  const handleCommentChange = (e) => {
    if (!currentConversation) return;
    
    updateConversationFeedback(currentConversation.id, {
      comment: e.target.value
    });
  };

  const handleSaveFeedback = () => {
    // Additional actions if needed when feedback is saved
    // For now, we'll just alert the user
    alert('Feedback saved successfully!');
  };

  if (loading) {
    return <LoadingText>Loading conversation...</LoadingText>;
  }

  if (!currentConversation) {
    return (
      <EmptyState>
        <EmptyStateTitle>Conversation not found</EmptyStateTitle>
        <EmptyStateText>
          The conversation you're looking for doesn't exist or has been deleted.
        </EmptyStateText>
      </EmptyState>
    );
  }

  return (
    <ChatContainer>
      <MessagesContainer>
        {currentConversation.messages.length === 0 ? (
          <EmptyState>
            <EmptyStateTitle>Start a new conversation with Bot AI</EmptyStateTitle>
            <EmptyStateText>
              Type a message below to start chatting with Bot AI. You can ask questions,
              get information, or just have a friendly conversation.
            </EmptyStateText>
          </EmptyState>
        ) : (
          currentConversation.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              conversationId={currentConversation.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <ChatInput conversationId={currentConversation.id} />

      {currentConversation.messages.length > 0 && (
        <FeedbackSection>
          <FeedbackTitle>How was your conversation?</FeedbackTitle>
          
          <StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarButton
                key={star}
                onClick={() => handleRatingClick(star)}
                $active={currentConversation.feedback.rating >= star}
              >
                {currentConversation.feedback.rating >= star ? (
                  <FaStar />
                ) : (
                  <FaRegStar />
                )}
              </StarButton>
            ))}
          </StarRating>
          
          <FeedbackCommentArea
            placeholder="Tell us more about your experience..."
            value={currentConversation.feedback.comment || ''}
            onChange={handleCommentChange}
          />
          
          <SaveButton type="button" onClick={handleSaveFeedback}>
            Save Feedback
          </SaveButton>
        </FeedbackSection>
      )}
    </ChatContainer>
  );
};

export default ChatPage;
