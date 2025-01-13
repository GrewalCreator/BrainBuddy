import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import "../assets/css/home.css";

const Home = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-6 text-gray-800">
            Welcome to Your AI Flashcard Companion
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn, revise, and master concepts with ease using AI-generated flashcards.
          </p>
          <Link to="/generate">
            <Button>Create a New Deck</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
