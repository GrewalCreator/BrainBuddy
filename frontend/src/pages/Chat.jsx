import React, { useState } from "react";
import "../assets/css/chat.css";

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/generateAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnswer(data.answer);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">AI Tutor</h1>
      <p className="chat-description">Ask a question, and the AI will provide a detailed answer!</p>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="4"
        />
      </div>

      <div className="chat-send-container">
        <button
          onClick={handleSend}
          className="button btn-primary"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {answer && (
        <div className="chat-answer-box">
          <h2 className="chat-answer-title">Answer:</h2>
          <p className="chat-answer-content">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
