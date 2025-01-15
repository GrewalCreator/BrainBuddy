import React, { useState } from "react";

function Chat() {
  const [question, setQuestion] = useState(""); // To store the user's question
  const [answer, setAnswer] = useState(""); // To store the AI's answer
  const [loading, setLoading] = useState(false); // To show a loading indicator
  const [error, setError] = useState(""); // To handle errors

  const handleSend = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError(""); // Clear any previous error
    setLoading(true); // Show loading indicator

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
        setAnswer(data.answer); // Set the AI's answer
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1>AI Tutor</h1>
      <p>Ask a question, and the AI will provide a detailed answer!</p>

      <div style={{ marginBottom: "20px" }}>
        <textarea
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="4"
          cols="50"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <button
        onClick={handleSend}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {answer && (
        <div style={{ marginTop: "20px" }}>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
