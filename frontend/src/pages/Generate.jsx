import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/generate.css';
import Navbar from '../components/NavBar';

const Generate = () => {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (!topic || !grade) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      // Send request to backend
      await axios.post('/generateFlashcards', {
        topic,
        grade,
        additionalInfo,
      });

      setSuccessMessage(`Flashcards generated`);

    } catch (error) {
      console.error('Error generating flashcards:', error);
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="generate-container">
      <h1 className="generate-title">Generate Flashcards</h1>
      <form className="generate-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="" disabled>Select a topic</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Literature">Literature</option>
            <option value="Geography">Geography</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade Level</label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          >
            <option value="" disabled>Select a grade level</option>
            <option value="Elementary">Elementary</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
            <option value="University/College">College</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="additionalInfo">Additional Details (Optional)</label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Provide additional details or specify any special requirements."
          />
        </div>

        <button
          type="button"
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
    </div>
  );
};

export default Generate;
