import React from 'react';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  return (
    <section className="contact-section" data-section={5}>
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">💫 Contatti</h1>
          <h2 className="contact-subtitle">Iniziamo il tuo progetto insieme</h2>
        </div>
        
        <div className="contact-body">
          <p className="contact-description">
            Hai un'idea innovativa? Vuoi trasformare la tua visione in realtà digitale? 
            Il team di TheWolfHolding è qui per ascoltarti e creare soluzioni su misura 
            che superano le aspettative.
          </p>
          
          <div className="contact-grid">
            <div className="contact-card">
              <h3>📧 Email</h3>
              <p>info@thewolfholding.com</p>
              <p>progetti@thewolfholding.com</p>
            </div>
            
            <div className="contact-card">
              <h3>📱 Social Media</h3>
              <p>@TheWolfHolding</p>
              <p>LinkedIn | Instagram | Twitter</p>
            </div>
            
            <div className="contact-card">
              <h3>🌍 Sede</h3>
              <p>Italia</p>
              <p>Servizi in tutto il mondo</p>
            </div>
            
            <div className="contact-card">
              <h3>💼 Partnerships</h3>
              <p>partnerships@thewolfholding.com</p>
              <p>Collaborazioni strategiche</p>
            </div>
          </div>
          
          <div className="contact-form-section">
            <h3>Inizia la conversazione</h3>
            <div className="contact-buttons">
              <button className="contact-btn primary">
                📞 Chiamaci
              </button>
              <button className="contact-btn secondary">
                💬 Chat Live
              </button>
              <button className="contact-btn tertiary">
                📝 Invia Brief
              </button>
            </div>
          </div>
          
          <div className="scroll-top">
            <p>Torna all'inizio per esplorare ancora</p>
            <div className="scroll-arrow-up">↑</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
