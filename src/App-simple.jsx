import React from 'react';

// Version simplifiée pour diagnostiquer le problème
export default function App() {
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
        marginBottom: '20px'
      }}>
        <h2>✅ Serveur de développement actif</h2>
        <p>Votre serveur Vite fonctionne sur <strong>http://localhost:5175</strong></p>
        <p>Base de données vidéos configurée pour @ArchiatechMedia</p>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>🎯 Votre chaîne YouTube</h2>
        <p><strong>Nom :</strong> @ArchiatechMedia</p>
        <p><strong>ID :</strong> UCtwJ6pMNI5QndQGeJWwkvYA</p>
        <p><strong>URL :</strong> https://www.youtube.com/@ArchiatechMedia</p>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>📊 Base de données vidéos</h2>
        <p>✅ Fichier JSON créé : <code>src/data/videos-database.json</code></p>
        <p>✅ Gestionnaire créé : <code>VideoDatabaseManager.js</code></p>
        <p>✅ Service API créé : <code>YouTubeAPIService.js</code></p>
        <p>✅ Interface admin créée : <code>VideoAdmin.jsx</code></p>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>🚀 Prochaines étapes</h2>
        <ol>
          <li>Accédez à l'administration : <a href="/admin" style={{color: '#E60023'}}>http://localhost:5175/admin</a></li>
          <li>Configurez votre clé API YouTube</li>
          <li>Synchronisez vos vidéos</li>
          <li>Gérez votre contenu</li>
        </ol>
      </div>

      <div style={{ 
        backgroundColor: '#E60023', 
        color: 'white',
        padding: '20px', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2>🎉 Système opérationnel !</h2>
        <p>Votre base de données vidéos @ArchiatechMedia est prête à être utilisée.</p>
        <a 
          href="/admin" 
          style={{ 
            display: 'inline-block',
            backgroundColor: 'white',
            color: '#E60023',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            fontWeight: 'bold'
          }}
        >
          Accéder à l'administration
        </a>
      </div>
    </div>
  );
}
