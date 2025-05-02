import { createContext, useState, useEffect, useContext } from 'react';
import sampleData from '../data/sampleData.json';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load conversations from sample data
    setConversations(sampleData.conversations);
    setLoading(false);
  }, []);

  const startNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: `Conversation ${conversations.length + 1}`,
      messages: [],
      rating: 0,
      feedback: ""
    };
    setConversations([...conversations, newConversation]);
    setCurrentConversation(newConversation);
    return newConversation;
  };

  const sendMessage = (text) => {
    if (!currentConversation) {
      const newConv = startNewConversation();
      addMessageToConversation(newConv.id, 'user', text);
      return;
    }

    addMessageToConversation(currentConversation.id, 'user', text);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = text.trim() ?
        `This is a response to: "${text}"` :
        "Sorry, Did not understand your query!";

      addMessageToConversation(currentConversation.id, 'bot', botResponse);
    }, 1000);
  };

  const addMessageToConversation = (conversationId, sender, text) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        const newMessage = {
          id: conv.messages.length + 1,
          sender,
          text,
          timestamp: new Date().toISOString()
        };

        if (sender === 'bot') {
          newMessage.feedback = {
            liked: null,
            comment: ""
          };
        }

        return {
          ...conv,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);

    if (currentConversation && currentConversation.id === conversationId) {
      setCurrentConversation(updatedConversations.find(c => c.id === conversationId));
    }
  };

  const updateMessageFeedback = (conversationId, messageId, feedback) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map(msg => {
          if (msg.id === messageId) {
            return {
              ...msg,
              feedback: {
                ...msg.feedback,
                ...feedback
              }
            };
          }
          return msg;
        });

        return {
          ...conv,
          messages: updatedMessages
        };
      }
      return conv;
    });

    setConversations(updatedConversations);

    if (currentConversation && currentConversation.id === conversationId) {
      setCurrentConversation(updatedConversations.find(c => c.id === conversationId));
    }
  };

  const updateConversationFeedback = (conversationId, rating, feedback) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          rating,
          feedback
        };
      }
      return conv;
    });

    setConversations(updatedConversations);

    if (currentConversation && currentConversation.id === conversationId) {
      setCurrentConversation(updatedConversations.find(c => c.id === conversationId));
    }
  };

  const loadConversation = (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        loading,
        startNewConversation,
        sendMessage,
        updateMessageFeedback,
        updateConversationFeedback,
        loadConversation
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

export default ChatContext;
