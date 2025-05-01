import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaRobot, FaHistory, FaPlus, FaBars } from 'react-icons/fa';
import { useConversation } from '../context/ConversationContext';

const SidebarContainer = styled.aside`
  width: 280px;
  background-color: var(--white);
  border-right: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: var(--transition);

  @media (max-width: 768px) {
    position: fixed;
    z-index: 100;
    width: 240px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-240px')};
    box-shadow: ${({ isOpen }) => (isOpen ? 'var(--shadow-lg)' : 'none')};
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--gray-200);
`;

const Title = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 0;
  margin-left: 0.75rem;
  color: var(--primary-color);
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  width: calc(100% - 2rem);
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-light);
  }
`;

const NavLinkContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
`;

const NavLinks = styled.div`
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: ${({ $active }) => ($active ? 'var(--primary-color)' : 'var(--text-color)')};
  background-color: ${({ $active }) => ($active ? 'var(--gray-100)' : 'transparent')};
  border-radius: var(--border-radius);
  margin-bottom: 0.25rem;
  font-weight: ${({ $active }) => ($active ? '500' : 'normal')};
  transition: var(--transition);

  &:hover {
    background-color: var(--gray-100);
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const ConversationList = styled.div`
  margin-top: 1rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 101;
  padding: 0.5rem;
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  font-size: 1.25rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { startNewConversation } = useConversation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewChat = () => {
    const newConversation = startNewConversation();
    navigate(`/chat/${newConversation.id}`);
    setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <MobileMenuButton onClick={toggleSidebar}>
        <FaBars />
      </MobileMenuButton>
      
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <FaRobot size={24} color="var(--primary-color)" />
          <Title><span>Soul AI</span></Title>
        </SidebarHeader>
        
        <NewChatButton onClick={handleNewChat}>
          <FaPlus size={14} style={{ marginRight: '0.5rem' }} /> New Chat
        </NewChatButton>
        
        <NavLinkContainer>
          <NavLinks>
            <StyledLink to="/" $active={location.pathname === '/'}>
              <FaRobot /> Chat with Bot
            </StyledLink>
            <StyledLink to="/history" $active={location.pathname === '/history'}>
              <FaHistory /> Past Conversations
            </StyledLink>
          </NavLinks>
        </NavLinkContainer>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
