
import React, { useState } from 'react';
import axios from 'axios';

const apiKey = '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'; // Read API key from environment variable
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';


const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input) {
      // Add user message to state
      setMessages([...messages, { text: input, type: 'user' }]);
  
      // Make API request to ChatGPT
      try {
        const response = await axios.post(
          apiUrl,
          {
            prompt: input,
            max_tokens: 50,
            temperature: 0.8,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );
  
        // Add assistant's reply to state
        setMessages([...messages, { text: response.data.choices[0].text, type: 'assistant' }]);
      } catch (error) {
        console.error('Error fetching response:', error);
        console.log('API Error Response:', error.response); // Log the response for more details
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