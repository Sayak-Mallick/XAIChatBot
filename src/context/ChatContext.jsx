import { createContext, useState, useEffect, useContext } from 'react';
import sampleData from '../data/sampleData.json';

const ChatContext = createContext();

// Key for storing conversations in localStorage
const STORAGE_KEY = 'botai_conversations';

// Dictionary of predefined questions and answers
const predefinedAnswers = {
  "Can you explain RESTful APIs?": "RESTful APIs are designed around the REST (Representational State Transfer) architecture, which uses HTTP requests to access and manipulate data. They follow a stateless, client-server, cacheable communications protocol.",
  "What can you tell me about React?": "React is a JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating interactive web applications.",
  "How do I use useState in React?": "useState is a React Hook that lets you add state to functional components. The hook takes an initial state value as an argument and returns an array with the current state value and a function to update it."
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load conversations from localStorage first
    const savedConversations = localStorage.getItem(STORAGE_KEY);

    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    } else {
      // Fallback to sample data if nothing in localStorage
      setConversations(sampleData.conversations);
    }
    setLoading(false);
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

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

    // Look for predefined answers first
    let botResponse;
    if (!text.trim()) {
      botResponse = "Sorry, Did not understand your query!";
    } else if (predefinedAnswers[text]) {
      botResponse = predefinedAnswers[text];
    } else {
      botResponse = "Sorry, Did not understand your query!";
    }

    // Simulate bot response
    setTimeout(() => {
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
