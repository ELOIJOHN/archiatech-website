function App() {
  return (
    <div style={{
      padding: '50px',
      backgroundColor: '#1f2937',
      color: 'white',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '4rem',
        marginBottom: '2rem',
        background: 'linear-gradient(45deg, #dc2626, #ef4444)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        ArchiAtech
      </h1>
      
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '3rem',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          🎯 Site Fonctionnel
        </h2>
        
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          React + Vite + Tailwind CSS
        </p>
        
        <button 
          onClick={() => alert('✅ Tout fonctionne parfaitement !')}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 15px 35px rgba(220, 38, 38, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(220, 38, 38, 0.3)';
          }}
        >
          🚀 Test Final
        </button>
        
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '10px'
        }}>
          <h3 style={{ color: '#22c55e', marginBottom: '1rem' }}>
            ✅ Système Opérationnel
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.9rem' }}>
            <div>⚛️ React</div>
            <div>⚡ Vite</div>
            <div>🎨 CSS</div>
            <div>📱 JS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
