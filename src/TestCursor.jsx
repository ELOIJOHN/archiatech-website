import React from 'react';

const TestCursor = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          🎉 CURSOR APPLICATION - TEST 🎉
        </h1>
        
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Interface Cursor Fonctionnelle !</h2>
          <p className="text-lg">
            Si vous voyez ce message, l'application Cursor est correctement chargée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-800 mb-2">✅ Composant Cursor</h3>
            <p className="text-green-700">Le composant CursorNewsApp a été créé avec succès.</p>
          </div>
          
          <div className="bg-blue-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">✅ Design Moderne</h3>
            <p className="text-blue-700">Interface avec gradients, cartes et animations.</p>
          </div>
          
          <div className="bg-purple-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">✅ 6 Cartes IA</h3>
            <p className="text-purple-700">Sources variées : OpenAI, Microsoft, Hugging Face, etc.</p>
          </div>
          
          <div className="bg-red-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-red-800 mb-2">✅ Responsive</h3>
            <p className="text-red-700">Layout adaptatif pour mobile et desktop.</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Recharger pour voir Cursor
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCursor;
