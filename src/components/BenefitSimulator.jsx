import React, { useState } from 'react';
import { TrendingUp, Clock, Euro } from 'lucide-react';

/**
 * An interactive component to simulate the benefits of AI implementation.
 * It calculates estimated time saved, cost reduction, and efficiency gains.
 */
function BenefitSimulator() {
  // State for form inputs
  const [numEmployees, setNumEmployees] = useState(10);
  const [processToOptimize, setProcessToOptimize] = useState('Gestion des factures');

  // State for calculation results
  const [results, setResults] = useState(null);

  /**
   * Handles the form submission and calculates the estimated benefits.
   */
  const handleCalculate = (e) => {
    e.preventDefault();

    // Simple simulation logic
    const timeSaved = numEmployees * 5; // Estimated hours saved per month
    const costReduced = timeSaved * 50; // Estimated cost reduction (€50/hour)
    const efficiencyGain = 10 + Math.floor(numEmployees / 10); // Efficiency gain in %

    setResults({
      timeSaved,
      costReduced,
      efficiencyGain: Math.min(efficiencyGain, 40), // Cap the gain at 40%
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-bold text-gray-900">Simulateur de Bénéfices IA</h3>
        <p className="text-lg text-gray-600 mt-2">Estimez le ROI de votre projet d'automatisation.</p>
      </div>

      {/* Simulation Form */}
      <form onSubmit={handleCalculate} className="grid md:grid-cols-3 gap-6 items-end mb-12">
        <div className="md:col-span-1">
          <label htmlFor="numEmployees" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre d'employés
          </label>
          <input
            type="number"
            id="numEmployees"
            value={numEmployees}
            onChange={(e) => setNumEmployees(Number(e.target.value))}
            min="1"
            className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            required
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="processToOptimize" className="block text-sm font-medium text-gray-700 mb-2">
            Processus à optimiser
          </label>
          <input
            type="text"
            id="processToOptimize"
            value={processToOptimize}
            onChange={(e) => setProcessToOptimize(e.target.value)}
            placeholder="Ex: Support client, RH..."
            className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            required
          />
        </div>
        <div className="md:col-span-1">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
          >
            Lancer la simulation
          </button>
        </div>
      </form>

      {/* Results Display */}
      {results && (
        <div className="results-container animate-fade-in">
          <h4 className="text-2xl font-bold text-center text-gray-800 mb-8">Résultats estimés pour le processus : <span className="text-red-600">{processToOptimize}</span></h4>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            
            {/* Time Saved */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <p className="text-5xl font-bold text-blue-600">{results.timeSaved}h</p>
              <p className="text-gray-600 font-medium">Heures gagnées / mois</p>
            </div>

            {/* Cost Reduced */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Euro className="w-8 h-8" />
              </div>
              <p className="text-5xl font-bold text-green-600">{results.costReduced.toLocaleString('fr-FR')}</p>
              <p className="text-gray-600 font-medium">Coûts réduits / mois</p>
            </div>

            {/* Efficiency Gain */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <p className="text-5xl font-bold text-red-600">+{results.efficiencyGain}%</p>
              <p className="text-gray-600 font-medium">Gain d'efficacité</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// Add a simple fade-in animation in your global CSS (e.g., src/index.css)
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
*/

export default BenefitSimulator;
