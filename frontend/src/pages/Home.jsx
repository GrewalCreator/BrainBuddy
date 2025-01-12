// pages/Home.jsx
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import DeckPreview from '../components/DeckPreview';

const Home = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif mb-4">
            Master any concept with the power of AI-generate flashcards
          </h1>
          <Link to="/generate">
            <Button>Get Started</Button>
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-serif mb-8">Your Decks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DeckPreview title="Preview of past deck" path="/decks/1" />
            <DeckPreview title="Preview of past deck" path="/decks/2" />
            <DeckPreview title="Preview of past deck" path="/decks/3" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;