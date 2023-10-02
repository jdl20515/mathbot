import React, { useState, useRef, useEffect } from 'react';
import './ChatComponent.css'; // Import the CSS file

function ChatComponent() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
      e.preventDefault()

      // Adding user's message
      setMessages((prev) => [...prev, { type: 'user', text: input }])

      const response = await fetch('http://localhost:3001/', {
          // <-- Fixed typo here
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              prompt: input,
          }),
      })

      if (response.ok) {
          const data = await response.json()
          setMessages((prev) => [
              ...prev,
              { type: 'bot', text: data.bot.trim() },
          ])
      } else {
          const err = await response.text()
          alert(err)
      }

      setInput('')
  }
  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);
 
  return (
    <div className="chat-container">
      <h1>MathBot</h1>
      <p>Your friendly math assistant</p>
      <div className="chat-messages" ref={chatContainerRef}>
        {/* Display messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-${message.type === 'user' ? 'user' : 'assistant'}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="border rounded p-2 w-3/4"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
