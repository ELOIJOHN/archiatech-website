import React from 'react';

export default function AppTest() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">ArchiAtech Test</h1>
        <p className="text-xl">Si vous voyez ceci, React fonctionne !</p>
        <div className="mt-8">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Bouton de test
          </button>
        </div>
      </div>
    </div>
  );
}
