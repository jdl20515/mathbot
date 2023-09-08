
import React, { useState } from 'react';

const apiKey = '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'; // Read API key from environment variable

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input) {
      // Add user message to state
      setMessages([...messages, { text: input, type: 'user' }]);

      // Add a system message with custom instructions
      setMessages([
        ...messages,
        {
          text: 'You are a teacher. Please provide assistance as you would in a classroom.',
          type: 'system',
        },
      ]);

      // Make API request to ChatGPT using fetch
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages, // Include all messages in the conversation
            max_tokens: 50,
            temperature: 0.8,
          }),
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();

        // Add assistant's reply to state
        setMessages([...messages, { text: data.choices[0].text, type: 'assistant' }]);
      } catch (error) {
        console.error('Error fetching response:', error);
      }

      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {/* Display messages */}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;