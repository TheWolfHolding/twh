import Hero from './components/Hero';
import Scene3D from './components/Scene3D';
import ScrollIndicator from './components/ScrollIndicator';
import AnimatedSection from './components/AnimatedSection';
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
        <Hero />
        
        {/* Sezione 1: Helmet - Prima Apparizione */}
        <AnimatedSection
          title="🌐 Social Solutions Lab"
          description="La nostra divisione digitale specializzata in soluzioni web professionali. Creiamo siti web moderni, e-commerce performanti e strategie di digital advertising che trasformano le idee in successi digitali concreti."
          details={{
            title: "� Servizi Digitali",
            content: [
              "• Siti Web Professionali e Responsive",
              "• E-commerce Avanzati e Scalabili", 
              "• Digital Advertising e Social Media Marketing",
              "• SEO e Ottimizzazione Performance"
            ]
          }}
          backgroundColor="rgba(33, 150, 243, 0.1)"
          height="100vh"
          sectionIndex={0}
        />
        
        {/* Sezione 2: Suzanne - Prima Apparizione */}
        <AnimatedSection
          title="🐵 Suzanne Monkey - Welcome"
          description="L'iconica mascotte di Blender fa il suo ingresso trionfale. Suzanne rappresenta la creatività open source e l'innovazione della community 3D mondiale. La sua presenza elegante e le rotazioni ipnotiche creano un ponte tra tradizione e modernità."
          details={{
            title: "� Prima Presentazione",
            content: [
              "• Storia: Mascotte di Blender dal 2002",
              "• Simbolismo: Community open source",
              "• Movimento: Rotazione elegante",
              "• Carattere: Accogliente e familiare"
            ]
          }}
          backgroundColor="rgba(233, 30, 99, 0.1)"
          height="100vh"
          sectionIndex={1}
        />
        
        {/* Sezione 3: Helmet - Seconda Apparizione */}
        <AnimatedSection
          title="⚡ Space Helmet - Deep Analysis"
          description="Il ritorno del casco spaziale con una prospettiva completamente nuova. Questa volta esploriamo i dettagli più intimi: ogni graffio racconta una storia, ogni riflesso rivela segreti di missioni spaziali perdute nel tempo."
          details={{
            title: "� Analisi Approfondita",
            content: [
              "• Vista: Close-up dettagliato",
              "• Focus: Danni e usura realistica",
              "• Illuminazione: Drammatica e cinematografica",
              "• Narrativa: Storie di esplorazione spaziale"
            ]
          }}
          backgroundColor="rgba(156, 39, 176, 0.15)"
          height="100vh"
          sectionIndex={2}
        />
        
        {/* Sezione 4: Suzanne - Finale Infinito */}
        <AnimatedSection
          title="🐵 Suzanne Evolution - Infinite Loop"
          description="Il gran finale del nostro viaggio coincide con l'evoluzione di Suzanne. Più maestosa e sicura, rappresenta la maturità raggiunta nell'esplorazione 3D. Da qui il ciclo ricomincia infinitamente, simboleggiando l'eterna ricerca della perfezione artistica."
          details={{
            title: "♾️ Ciclo Infinito",
            content: [
              "• Evoluzione: Versione più matura e consapevole",
              "• Movimento: Orbitale e ipnotico",
              "• Significato: Completamento del viaggio",
              "• Loop: Ripartenza automatica dall'inizio"
            ]
          }}
          backgroundColor="rgba(233, 30, 99, 0.2)"
          height="100vh"
          sectionIndex={3}
        />
      </div>
    </div>
  );
}

export default App;
