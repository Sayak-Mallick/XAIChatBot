import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown, FaUser, FaRobot } from 'react-icons/fa';
import { useConversation } from '../context/ConversationContext';

const MessageContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  background-color: ${({ $isUser }) => ($isUser ? 'var(--gray-100)' : 'var(--white)')};
  position: relative;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  background-color: ${({ $isUser }) => 
    $isUser ? 'var(--primary-color)' : 'var(--secondary-color)'};
  color: var(--white);
`;

const MessageContent = styled.div`
  flex: 1;
`;

const MessageText = styled.p`
  margin: 0;
  white-space: pre-wrap;
`;

const MessageTime = styled.span`
  display: block;
  font-size: 0.75rem;
  color: var(--text-light);
  margin-top: 0.5rem;
`;

const FeedbackContainer = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  background-color: var(--gray-100);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;

  ${MessageContainer}:hover & {
    opacity: 1;
  }
`;

const FeedbackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => ($active ? 'var(--primary-color)' : 'var(--gray-400)')};
  font-size: 1rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  transition: var(--transition);
  
  &:hover {
    color: ${({ $active, $isThumbsDown }) => 
      $active ? ($isThumbsDown ? 'var(--danger)' : 'var(--primary-color)') : 
      ($isThumbsDown ? 'var(--danger)' : 'var(--primary-color)')};
  }
`;

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatMessage = ({ message, conversationId }) => {
  const { updateMessageFeedback } = useConversation();
  const isUser = message.sender === 'user';
  
  const handleLike = () => {
    updateMessageFeedback(conversationId, message.id, { 
      liked: message.feedback?.liked === true ? null : true 
    });
  };
  
  const handleDislike = () => {
    updateMessageFeedback(conversationId, message.id, { 
      liked: message.feedback?.liked === false ? null : false 
    });
  };

  return (
    <MessageContainer $isUser={isUser}>
      <IconWrapper $isUser={isUser}>
        {isUser ? <FaUser /> : <FaRobot />}
      </IconWrapper>
      
      <MessageContent>
        <MessageText>{message.text}</MessageText>
        <MessageTime>{formatTime(message.timestamp)}</MessageTime>
      </MessageContent>
      
      {!isUser && (
        <FeedbackContainer>
          <FeedbackButton 
            onClick={handleLike} 
            $active={message.feedback?.liked === true}
          >
            <FaThumbsUp />
          </FeedbackButton>
          
          <FeedbackButton 
            onClick={handleDislike} 
            $active={message.feedback?.liked === false}
            $isThumbsDown
          >
            <FaThumbsDown />
          </FeedbackButton>
        </FeedbackContainer>
      )}
    </MessageContainer>
  );
};

export default ChatMessage;
