import { Link } from 'react-router-dom';
import "../assets/css/home.css";
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">
          <Typewriter
            words={['Welcome to Your AI Teaching Companion']}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="home-description">
          Learn, revise, and master concepts with ease using AI-generated flashcards.
        </p>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <h3 className="feature-title">AI Tutor</h3>
          <p className="feature-description">
            Ask the AI any question and receive detailed explanations instantly.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Flashcard Generator</h3>
          <p className="feature-description">
            Create flashcards for any topic and start learning effectively.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Interactive Quizzes</h3>
          <p className="feature-description">
            Test your knowledge with dynamic quizzes tailored to your needs.
          </p>
        </div>
      </div>

      <div className="button-container">
        <Link to="/generate" className="button">Create a New Deck</Link>
        <Link to="/chat" className="button">Ask AI a Question</Link>
      </div>
    </div>
  );
};

export default Home;
