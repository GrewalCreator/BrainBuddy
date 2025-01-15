import React, { useState, useEffect, useRef } from "react";
import "../assets/css/ChatBox.css";
import chatbotIcon from "../assets/images/chatbot-icon.png";
import { Typewriter } from 'react-simple-typewriter';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = {
      id: 1, // Fixed ID for the welcome message
      text: "Hello! I'm BuddyAI, your personal Tutor & Education Assistant! How can I help you today?",
      sender: "bot",
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");

      setIsLoading(true);

      try {

        const response = await fetch("/generateAI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: inputValue }),
        });

        const data = await response.json();

        if (data.error) {
          // Handle error from the backend
          const errorMessage = {
            id: messages.length + 2,
            text: `Error: ${data.error}`,
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } else {

          const botMessage = {
            id: messages.length + 2,
            text: data.answer,
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (error) {
        console.error("Error:", error);
        const errorMessage = {
          id: messages.length + 2,
          text: "An error occurred while processing your message.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };


  if (isMinimized || (isMobile && !isMinimized)) {
    return (
      <button className="chatIcon" onClick={toggleMinimize}>
        💬 {/* Chat icon */}
      </button>
    );
  }


  return (
    <div className="chatBox">

      <div className="chatHeader">
        <div className="chatHeaderContent">
          <img src={chatbotIcon} alt="BuddyAI" className="chatbotIcon" />
          <span className="chatbotName">BuddyAI</span>
        </div>
        <button onClick={toggleMinimize} className="controlButton">
          ✕
        </button>
      </div>

      <div className="messagesContainer">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "user" ? "userMessage" : "botMessage"
            }`}
          >
            {message.text}
          </div>
        ))}
        {/* Show typing indicator when loading */}
        {isLoading && (
          <div className="botMessage">
            <div className="typingIndicator">
              <span> </span>
              <span>•</span>
              <span>•</span>
              <span>•</span>
              <span> </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="inputContainer">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isLoading} // Disable input while loading
        />
        <button
          onClick={handleSendMessage}
          className="sendButton"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
