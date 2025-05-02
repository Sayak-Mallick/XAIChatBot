import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <ChatProvider>
        <div className="app-container" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
        </div>
      </ChatProvider>
    </Router>
  );
}

export default App;
