import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatComponent.css'; // Import the CSS file

const apiKey = 'API KEY HERE'; // Read API key from an environment variable
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    const systemMessage = {
      text: 'Make sure to explain every answer. You are a world class educator, dedicated to helping college students understanding of multivariable calculus with little mathematical background. Your main objective is to equip these students with the necessary tools and resources to embark on a journey of self-directed learning in these complex subjects. Your mission is to transform abstract and elusive concepts into straightforward, easily comprehensible ideas, ensuring that students can grasp these fundamental principles with confidence.', // Customize your system message text
      type: 'system',
    };
    if (input) {
      // Make API request to ChatGPT
      try {
        const response = await axios.post(
          apiUrl,
          {
            prompt: [systemMessage.text, input].join('\n'),
            max_tokens: 1000, // Adjust the number of max tokens as needed
            temperature: 0.1, // Adjust the temperature as needed
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );

        // Update messages with user input and AI response
        setMessages([
          ...messages,
          { text: input, type: 'user' },
          { text: response.data.choices[0].text, type: 'assistant' },
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
        console.log('API Error Response:', error.response); // Log the response for more details
        setErrorMessage('An error occurred. Please try again.');
      }

      // Clear the input
      setInput('');
    }
  };

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
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
