import React from 'react';
import HeroTextEffectComponent from './HeroTextEffectComponent';

const TextEffectDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <HeroTextEffectComponent />
      
      {/* Informations sur l'effet */}
      <div className="absolute bottom-8 left-8 right-8 bg-black/50 backdrop-blur-xl rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">🎨 Effet Lumière ArchiAtech</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Couleurs :</strong> Blanc pur (#FFFFFF) + Rouge ArchiAtech (#E60023)</p>
            <p><strong>Typo :</strong> Inter/Poppins Bold (900)</p>
            <p><strong>Effets :</strong> Lueur rouge, halo bleu-gris, ombre portée</p>
          </div>
          <div>
            <p><strong>Animation :</strong> Pulsation subtile + reflet lumineux</p>
            <p><strong>Responsive :</strong> Adaptatif 4K à mobile</p>
            <p><strong>Style :</strong> Futuriste, professionnel, minimaliste</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEffectDemo;
