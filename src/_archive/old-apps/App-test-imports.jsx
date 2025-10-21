import React from 'react';

// Test des imports avec try/catch dans des fonctions
const testImport = async (importPath, componentName) => {
  try {
    const module = await import(importPath);
    return { success: true, component: module.default, name: componentName };
  } catch (error) {
    return { success: false, error: error.message, name: componentName };
  }
};

export default function App() {
  const [testResults, setTestResults] = React.useState([]);
  const [isTesting, setIsTesting] = React.useState(true);

  React.useEffect(() => {
    const runTests = async () => {
      const tests = [
        testImport('./components/NavigationBar.jsx', 'NavigationBar'),
        testImport('./components/HeroSection.jsx', 'HeroSection'),
        testImport('./components/ServicesSection.jsx', 'ServicesSection'),
        testImport('./components/ApprocheSection.jsx', 'ApprocheSection'),
        testImport('./components/Avantages.jsx', 'Avantages'),
        testImport('./components/VideoSection.jsx', 'VideoSection'),
        testImport('./components/NewsSection.jsx', 'NewsSection'),
        testImport('./components/ContactSection.jsx', 'ContactSection'),
        testImport('./components/ArchiAgent.jsx', 'ArchiAgent')
      ];

      const results = await Promise.all(tests);
      setTestResults(results);
      setIsTesting(false);
    };

    runTests();
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        color: '#E60023',
        marginBottom: '20px'
      }}>
        Test des Imports ArchiAtech
      </h1>
      
      {isTesting ? (
        <div style={{ 
          background: 'rgba(230, 0, 35, 0.1)', 
          border: '1px solid rgba(230, 0, 35, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#E60023', marginBottom: '10px' }}>
            🔄 Test en cours...
          </h2>
          <p>Vérification des imports des composants...</p>
        </div>
      ) : (
        <div>
          <div style={{ 
            background: 'rgba(230, 0, 35, 0.1)', 
            border: '1px solid rgba(230, 0, 35, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h2 style={{ color: '#E60023', marginBottom: '10px' }}>
              📊 Résultats des Tests
            </h2>
            <p>Voici l'état de chaque composant :</p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            {testResults.map((result, index) => (
              <div key={index} style={{ 
                marginBottom: '10px',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: result.success ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                border: result.success ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(244, 67, 54, 0.3)'
              }}>
                <div style={{ 
                  color: result.success ? '#4CAF50' : '#F44336',
                  fontWeight: 'bold'
                }}>
                  {result.success ? '✅' : '❌'} {result.name}
                </div>
                {!result.success && (
                  <div style={{ 
                    color: '#F44336',
                    fontSize: '0.9rem',
                    marginTop: '5px',
                    fontFamily: 'monospace'
                  }}>
                    Erreur: {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
