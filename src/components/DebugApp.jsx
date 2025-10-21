import React from 'react';

const DebugApp = ({ onNavigate }) => {
  const handleAdminClick = () => {
    if (onNavigate) {
      onNavigate('admin');
    } else {
      // Fallback: navigation directe
      window.location.href = '/admin';
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#E60023', marginBottom: '20px' }}>
        🎬 ArchiAtech - Base de Données Vidéos
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h2>✅ Serveur de développement actif</h2>
        <p>Votre serveur Vite fonctionne sur <strong>http://localhost:5175</strong></p>
        <p>Base de données vidéos configurée pour @ArchiatechMedia</p>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h2>📺 Votre chaîne YouTube</h2>
        <p><strong>Nom :</strong> @ArchiatechMedia</p>
        <p><strong>ID :</strong> UCtwJ6pMNI5QndQGeJWwkvYA</p>
        <p><strong>URL :</strong> https://www.youtube.com/@ArchiatechMedia</p>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h2>📊 Base de données vidéos</h2>
        <p>✅ Fichier JSON créé : src/data/videos-database.json</p>
        <p>✅ Gestionnaire créé : VideoDatabaseManager.js</p>
        <p>✅ Service API créé : YouTubeAPIService.js</p>
        <p>✅ Interface admin créée : VideoAdmin.jsx</p>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h2>🚀 Prochaines étapes</h2>
        <p>Accédez à l'administration : <strong>http://localhost:5175/admin</strong></p>
        <p>Configurez votre clé API YouTube</p>
        <p>Synchronisez vos vidéos</p>
        <p>Gérez votre contenu</p>
      </div>

      <div style={{ 
        backgroundColor: '#E60023', 
        padding: '20px', 
        borderRadius: '8px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2>🎬 Système opérationnel !</h2>
        <p>Votre base de données vidéos @ArchiatechMedia est prête à être utilisée.</p>
        <button 
          onClick={handleAdminClick}
          style={{ 
            backgroundColor: 'white',
            color: '#E60023',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Accéder à l'administration
        </button>
      </div>
    </div>
  );
};

export default DebugApp;
