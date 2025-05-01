import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConversationProvider } from './context/ConversationContext';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <ConversationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/chat" replace />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="chat/:conversationId" element={<ChatPage />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConversationProvider>
    </>
  );
}

export default App;
