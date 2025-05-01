import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useConversation } from '../context/ConversationContext';
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown, FaFilter, FaChevronRight } from 'react-icons/fa';

const HistoryContainer = styled.div`
  padding: 1.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  color: var(--text-color);
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  background-color: var(--white);
  color: var(--text-color);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: var(--gray-100);
  }
`;

const FilterMenu = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 5rem;
  width: 240px;
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  padding: 1rem;
  z-index: 10;
`;

const FilterOption = styled.div`
  margin-bottom: 0.5rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  background-color: var(--white);
`;

const ConversationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ConversationCard = styled.div`
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

const ConversationHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray-200);
`;

const ConversationTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0;
`;

const ConversationDate = styled.span`
  font-size: 0.875rem;
  color: var(--text-light);
`;

const ConversationContent = styled.div`
  padding: 1rem;
`;

const ConversationPreview = styled.p`
  margin-bottom: 1rem;
  color: var(--text-light);
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const FeedbackDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: ${({ $active }) => ($active ? 'var(--warning)' : 'var(--gray-300)')};
  font-size: 1rem;
`;

const ThumbsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ThumbsItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-light);
  font-size: 0.875rem;

  svg {
    margin-right: 0.25rem;
    color: ${({ $isLiked }) => 
      $isLiked ? ($isLiked === 'up' ? 'var(--success)' : 'var(--danger)') : 'var(--gray-400)'};
  }
`;

const CommentPreview = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--gray-200);
  font-style: italic;
  color: var(--text-light);
  font-size: 0.875rem;
`;

const ViewButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background-color: var(--gray-100);
  color: var(--primary-color);
  font-weight: 500;
  transition: var(--transition);

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: var(--gray-200);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-light);
`;

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const countFeedback = (messages) => {
  let likes = 0;
  let dislikes = 0;

  messages.forEach(message => {
    if (message.sender === 'bot' && message.feedback) {
      if (message.feedback.liked === true) likes += 1;
      if (message.feedback.liked === false) dislikes += 1;
    }
  });

  return { likes, dislikes };
};

const HistoryPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('all');
  const { conversations } = useConversation();
  const navigate = useNavigate();

  const filteredConversations = conversations.filter(conv => {
    if (ratingFilter === 'all') return true;
    if (ratingFilter === 'rated' && conv.feedback.rating) return true;
    if (ratingFilter === 'unrated' && !conv.feedback.rating) return true;
    if (ratingFilter === '5star' && conv.feedback.rating === 5) return true;
    if (ratingFilter === '4star' && conv.feedback.rating === 4) return true;
    if (ratingFilter === '3star' && conv.feedback.rating === 3) return true;
    if (ratingFilter === '2star' && conv.feedback.rating === 2) return true;
    if (ratingFilter === '1star' && conv.feedback.rating === 1) return true;
    return false;
  });

  const handleViewConversation = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <HistoryContainer>
      <PageHeader>
        <PageTitle>Conversation History</PageTitle>
        <FilterButton onClick={() => setShowFilter(!showFilter)}>
          <FaFilter /> Filter
        </FilterButton>
        
        {showFilter && (
          <FilterMenu>
            <FilterOption>
              <FilterLabel>Rating</FilterLabel>
              <FilterSelect 
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Conversations</option>
                <option value="rated">With Feedback</option>
                <option value="unrated">Without Feedback</option>
                <option value="5star">5 Star</option>
                <option value="4star">4 Star</option>
                <option value="3star">3 Star</option>
                <option value="2star">2 Star</option>
                <option value="1star">1 Star</option>
              </FilterSelect>
            </FilterOption>
          </FilterMenu>
        )}
      </PageHeader>
      
      <ConversationsList>
        {filteredConversations.length === 0 ? (
          <EmptyState>
            No conversations match your filter criteria.
          </EmptyState>
        ) : (
          filteredConversations.map((conversation) => {
            const { likes, dislikes } = countFeedback(conversation.messages);
            const firstUserMessage = conversation.messages.find(m => m.sender === 'user');
            
            return (
              <ConversationCard key={conversation.id}>
                <ConversationHeader>
                  <ConversationTitle>{conversation.title}</ConversationTitle>
                  <ConversationDate>
                    {conversation.messages.length > 0 && 
                      formatDate(conversation.messages[0].timestamp)}
                  </ConversationDate>
                </ConversationHeader>
                
                <ConversationContent>
                  {firstUserMessage && (
                    <ConversationPreview>
                      {firstUserMessage.text}
                    </ConversationPreview>
                  )}
                  
                  <FeedbackDisplay>
                    <StarRating>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} $active={conversation.feedback?.rating >= star}>
                          {conversation.feedback?.rating >= star ? (
                            <FaStar />
                          ) : (
                            <FaRegStar />
                          )}
                        </Star>
                      ))}
                    </StarRating>
                    
                    <ThumbsContainer>
                      <ThumbsItem $isLiked="up">
                        <FaThumbsUp /> {likes}
                      </ThumbsItem>
                      <ThumbsItem $isLiked="down">
                        <FaThumbsDown /> {dislikes}
                      </ThumbsItem>
                    </ThumbsContainer>
                  </FeedbackDisplay>
                  
                  {conversation.feedback?.comment && (
                    <CommentPreview>
                      "{conversation.feedback.comment}"
                    </CommentPreview>
                  )}
                </ConversationContent>
                
                <ViewButton onClick={() => handleViewConversation(conversation.id)}>
                  View Conversation <FaChevronRight size={12} />
                </ViewButton>
              </ConversationCard>
            );
          })
        )}
      </ConversationsList>
    </HistoryContainer>
  );
};

export default HistoryPage;
