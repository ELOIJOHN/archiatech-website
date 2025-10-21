import React from 'react';

function App() {
  console.log('App component is rendering');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#dc2626', 
        fontSize: '48px', 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        🚨 ArchiAtech - Test Debug 🚨
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#374151', marginBottom: '20px' }}>
          ✅ Diagnostic Réussi !
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '10px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚛️</div>
            <div style={{ fontWeight: 'bold', color: '#059669' }}>React OK</div>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '10px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
            <div style={{ fontWeight: 'bold', color: '#059669' }}>Vite OK</div>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '10px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎨</div>
            <div style={{ fontWeight: 'bold', color: '#059669' }}>CSS OK</div>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '10px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📱</div>
            <div style={{ fontWeight: 'bold', color: '#059669' }}>JS OK</div>
          </div>
        </div>
        
        <button 
          onClick={() => {
            alert('🎉 Interaction fonctionnelle !');
            console.log('Button clicked successfully');
          }}
          style={{ 
            backgroundColor: '#dc2626', 
            color: 'white', 
            padding: '15px 30px', 
            border: 'none', 
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🚀 Test Interaction
        </button>
        
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#fef2f2', 
          borderRadius: '10px',
          border: '1px solid #fecaca'
        }}>
          <h3 style={{ color: '#dc2626', marginBottom: '15px' }}>📋 Prochaines étapes :</h3>
          <ul style={{ textAlign: 'left', color: '#374151', lineHeight: '1.6' }}>
            <li>✅ Vérification des composants de base</li>
            <li>🔍 Diagnostic des imports manquants</li>
            <li>🔧 Correction des erreurs de composants</li>
            <li>🎯 Restauration du site complet</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
