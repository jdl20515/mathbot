import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

function ChatComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Adding user's message
    setMessages((prev) => [...prev, { type: 'user', text: input }]);

    const response = await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: data.bot.trim() },
      ]);
    } else {
      const err = await response.text();
      alert(err);
    }

    setInput('');
  };

  useEffect(() => {
    // Scroll chat container to the bottom whenever messages are updated
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8">MathBot</h1>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-100 p-1 ">

        <div className="chat-messages w-10/12 h-90 overflow-y-auto mb-8 flex flex-col p-4 bg-gray-100 rounded-lg" ref={chatContainerRef}>
          {messages.map((message, index) => (
        
            <div
              key={index}
              className={`message p-4 rounded mb-4 text-lg max-w-xl ${
                message.type === 'user' ? 'bg-blue-200 text-blue-800 self-end text-left' : 'bg-gray-300 text-gray-800 self-start text-left'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="w-8/12 flex items-center p-4 bg-white rounded-lg shadow-md mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border-none p-3 focus:outline-none text-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatComponent;
