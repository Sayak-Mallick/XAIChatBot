import { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import { useConversation } from '../context/ConversationContext';

const ChatInputContainer = styled.form`
  display: flex;
  padding: 1rem;
  background-color: var(--white);
  border-top: 1px solid var(--gray-200);
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: var(--transition);
  height: 42px;
  max-height: 120px;
  overflow-y: auto;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: var(--gray-400);
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  min-width: 42px;
  margin-left: 0.75rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-light);
  }

  &:disabled {
    background-color: var(--gray-300);
    cursor: not-allowed;
  }
`;

const ChatInput = ({ conversationId }) => {
  const [message, setMessage] = useState('');
  const { addMessage, addBotResponse } = useConversation();

  const handleChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message.trim(),
      timestamp: new Date().toISOString()
    };
    
    addMessage(conversationId, userMessage);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      addBotResponse(conversationId, userMessage.text);
    }, 500);
  };

  return (
    <ChatInputContainer onSubmit={handleSubmit}>
      <TextArea
        value={message}
        onChange={handleChange}
        placeholder="Message Bot AI..."
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <SendButton type="submit" disabled={!message.trim()}>
        <FaPaperPlane size={16} />
      </SendButton>
    </ChatInputContainer>
  );
};

export default ChatInput;
