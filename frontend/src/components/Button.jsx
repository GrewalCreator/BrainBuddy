// components/Button.jsx
const Button = ({ children, onClick, className = '' }) => {
    return (
      <button 
        onClick={onClick}
        className={`bg-sage-600 text-white px-6 py-2 rounded-md hover:bg-sage-700 transition-colors ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;