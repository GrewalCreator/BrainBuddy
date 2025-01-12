// components/DeckPreview.jsx
import { Link } from 'react-router-dom';

const DeckPreview = ({ title, path }) => {
  return (
    <Link
      to={path}
      className="bg-white rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-serif mb-4">{title}</h3>
      <span className="text-sage-600">Preview of past deck</span>
    </Link>
  );
};

export default DeckPreview;
