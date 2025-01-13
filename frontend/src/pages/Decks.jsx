// pages/Decks.jsx
import NavBar from '../components/NavBar';
import DeckPreview from '../components/DeckPreview';

const Decks = () => {
  const decks = ['Algebra', 'Calculus', 'Geometry'];
  
  return (
    <div className="min-h-screen bg-cream-50">
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-center mb-12">
          Your Decks
        </h1>
        
        <div className="flex items-center justify-center space-x-6">
          <button className="bg-sage-600 rounded-full p-4">←</button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <DeckPreview key={deck} title={deck} path={`/study/${deck.toLowerCase()}`} />
            ))}
          </div>
          <button className="bg-sage-600 rounded-full p-4">→</button>
        </div>
      </main>
    </div>
  );
};

export default Decks;