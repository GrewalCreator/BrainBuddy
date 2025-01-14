import React, { useState, useEffect, useRef } from "react";
import "../assets/css/ChatBox.css"; // Import the CSS file

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false); // State to manage minimized state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State to detect mobile devices
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const messagesEndRef = useRef(null); // Ref for auto-scrolling to the bottom

  // Display welcome message after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomeMessage = {
        id: messages.length + 1,
        text: "Hello! I'm a chatbot. How can I help you today?",
        sender: "bot",
      };
      setMessages([welcomeMessage]);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Run only once when the component mounts

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll to the bottom when messages change
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
      setMessages([...messages, newMessage]);
      setInputValue("");

      setIsLoading(true); // Start loading

      try {
        // Send the user's message to the Flask backend
        const response = await fetch("http://localhost:5000/generateAI", {
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
          // Display the AI's response
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
        setIsLoading(false); // Stop loading
      }
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Toggle minimized state
  };

  // If minimized or on mobile, show only the icon
  if (isMinimized || (isMobile && !isMinimized)) {
    return (
      <button className="chatIcon" onClick={toggleMinimize}>
        💬 {/* Chat icon */}
      </button>
    );
  }

  // Render the full chat box
  return (
    <div className="chatBox">
      {/* Chat Header with Minimize Icon */}
      <div className="chatHeader">
        <button onClick={toggleMinimize} className="controlButton">
          🗕 {/* Minimize icon */}
        </button>
      </div>

      {/* Messages Container */}
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
        {/* Empty div for auto-scrolling */}
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
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isLoading} // Disable input while loading
        />
        <button
          onClick={handleSendMessage}
          className="sendButton"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
