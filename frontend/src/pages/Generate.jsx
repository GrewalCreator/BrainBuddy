// pages/Generate.jsx
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Button from '../components/Button';

const Generate = () => {
  const subjects = ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry'];
  
  return (
    <div className="min-h-screen bg-cream-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-center mb-12">
          Select a concept to generate your flashcards
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {subjects.map((subject) => (
            <div key={subject} className="bg-white rounded-lg p-6 flex flex-col items-center justify-between">
              <h3 className="text-xl font-serif mb-4">{subject}</h3>
              <Button>Generate</Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Generate;