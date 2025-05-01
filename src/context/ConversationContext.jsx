import { createContext, useContext, useState, useEffect } from 'react';
import { sampleConversations } from '../data/sampleData';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load conversations from sampleData initially
    setConversations(sampleConversations);
    setLoading(false);
  }, []);

  const startNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Conversation",
      messages: [],
      feedback: {
        rating: null,
        comment: null
      }
    };
    
    setConversations([...conversations, newConversation]);
    setCurrentConversation(newConversation);
    return newConversation;
  };

  const addMessage = (conversationId, message) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          title: conv.messages.length === 0 ? message.text.substring(0, 30) + "..." : conv.title
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Update current conversation if it's the active one
    if (currentConversation && currentConversation.id === conversationId) {
      const updatedConv = updatedConversations.find(conv => conv.id === conversationId);
      setCurrentConversation(updatedConv);
    }
  };

  const addBotResponse = (conversationId, userMessage) => {
    // Simulate bot response
    const botMessage = {
      id: Date.now(),
      sender: "bot",
      text: userMessage.toLowerCase().includes("sorry") 
        ? "Sorry, Did not understand your query!"
        : `This is a response to your question about "${userMessage}"`,
      timestamp: new Date().toISOString(),
      feedback: {
        liked: null,
        rating: null,
        comment: null
      }
    };
    
    addMessage(conversationId, botMessage);
    return botMessage;
  };

  const updateMessageFeedback = (conversationId, messageId, feedback) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: conv.messages.map(msg => {
            if (msg.id === messageId) {
              return {
                ...msg,
                feedback: { ...msg.feedback, ...feedback }
              };
            }
            return msg;
          })
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Update current conversation if it's the active one
    if (currentConversation && currentConversation.id === conversationId) {
      const updatedConv = updatedConversations.find(conv => conv.id === conversationId);
      setCurrentConversation(updatedConv);
    }
  };

  const updateConversationFeedback = (conversationId, feedback) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          feedback: { ...conv.feedback, ...feedback }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Update current conversation if it's the active one
    if (currentConversation && currentConversation.id === conversationId) {
      const updatedConv = updatedConversations.find(conv => conv.id === conversationId);
      setCurrentConversation(updatedConv);
    }
  };

  const selectConversation = (conversationId) => {
    const selected = conversations.find(conv => conv.id === conversationId);
    setCurrentConversation(selected || null);
  };

  return (
    <ConversationContext.Provider 
      value={{
        conversations,
        currentConversation,
        loading,
        startNewConversation,
        addMessage,
        addBotResponse,
        updateMessageFeedback,
        updateConversationFeedback,
        selectConversation
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
