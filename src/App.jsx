import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }])
    
    // Simulate bot response (replace with actual API call in production)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Response to: "${input}"`, sender: 'bot' }])
    }, 500)
    
    setInput('')
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Bot AI</h1>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">Send a message to start chatting with Bot AI</div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Bot AI..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  )
}

export default App
