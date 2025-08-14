import Scene3D from './components/Scene3D';
import ScrollIndicator from './components/ScrollIndicator';
import { HomePage } from './components/HomePage';
import { Page } from './components/Page';
import { ContactPage } from './components/ContactPage';
import { HiddenSection } from './components/HiddenSection';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Indicatore di scroll con debug */}
      <ScrollIndicator showDebug={true} />
      
      {/* Scena 3D fissa in background */}
      <Scene3D />
      
      {/* Contenuto scrollabile in overlay */}
      <div className="content-overlay">
        {/* 0. Homepage - Sempre visibile */}
        <HomePage />
        
        {/* 1. Social Solutions Lab - Durata estesa per lettura completa */}
        <HiddenSection triggerStart={0.08} triggerEnd={0.32}>
          <Page
            title="🌐 Social Solutions Lab"
            subtitle="Soluzioni Web Professionali"
            description="La nostra divisione digitale specializzata in soluzioni web professionali. Creiamo siti web moderni, e-commerce performanti e strategie di digital advertising che trasformano le idee in successi digitali concreti."
            features={[
              "🖥️ Siti Web Professionali e Responsive",
              "🛒 E-commerce Avanzati e Scalabili", 
              "📈 Digital Advertising e Social Media Marketing",
              "🔍 SEO e Ottimizzazione Performance",
              "⚡ Applicazioni Web Progressive (PWA)",
              "🎨 UI/UX Design e Branding"
            ]}
            backgroundColor="rgba(0, 255, 255, 0.1)"
            sectionIndex={1}
          />
        </HiddenSection>
        
        {/* 2. iHyperactive - Durata estesa per lettura completa */}
        <HiddenSection triggerStart={0.28} triggerEnd={0.52}>
          <Page
            title="⚡ iHyperactive"
            subtitle="Creatività Digitale Estrema"
            description="Il brand che spinge i confini della creatività digitale oltre ogni limite. iHyperactive è sinonimo di innovazione radicale, design visionario e soluzioni che anticipano il futuro dell'interazione digitale."
            features={[
              "🚀 Progetti Sperimentali e Innovativi",
              "🎮 Esperienze Interattive Immersive",
              "🤖 Integrazione AI e Machine Learning",
              "🌟 Design Futuristico e Avanguardista",
              "💫 Realtà Aumentata e Virtuale",
              "⚡ Automazione e Smart Solutions"
            ]}
            backgroundColor="rgba(255, 0, 255, 0.1)"
            sectionIndex={2}
          />
        </HiddenSection>
        
        {/* 3. PVRN® & Missing Clubs® - Durata estesa per lettura completa */}
        <HiddenSection triggerStart={0.48} triggerEnd={0.72}>
          <Page
            title="🎵 PVRN® & Missing Clubs®"
            subtitle="Universo Musicale Innovativo"
            description="Due brand musicali complementari che ridefiniscono l'esperienza sonora contemporanea. PVRN® si concentra su sonorità pure ed essenziali, mentre Missing Clubs® esplora territori musicali inesplorati e culture underground."
            features={[
              "🎶 Produzione Musicale Originale",
              "🎧 Curating e Playlist Esclusive",
              "🎤 Artist Development e Management",
              "🎪 Eventi e Live Performance",
              "📀 Label Services e Distribuzione",
              "🎨 Visual Art e Music Videos"
            ]}
            backgroundColor="rgba(255, 255, 0, 0.1)"
            sectionIndex={3}
          />
        </HiddenSection>
        
        {/* 4. EyesJuice */}
        <Page
          title="�️ EyesJuice"
          subtitle="Visual Storytelling"
          description="Il laboratorio creativo dedicato alla comunicazione visiva innovativa. EyesJuice trasforma concetti astratti in narrazioni visive potenti, creando identità memorabili e contenuti che catturano l'immaginazione."
          features={[
            "📸 Fotografia Professionale e Artistica",
            "🎬 Video Production e Motion Graphics",
            "🎨 Graphic Design e Visual Identity",
            "✨ Art Direction e Creative Consulting",
            "📱 Content Creation per Social Media",
            "🖼️ Installazioni Artistiche Digitali"
          ]}
          backgroundColor="rgba(233, 30, 99, 0.2)"
          sectionIndex={4}
        />
        
        {/* 5. Contatti */}
        <ContactPage />
      </div>
    </div>
  );
}

export default App;
