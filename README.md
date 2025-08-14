# 🚀 Three.js Scrollytelling 3D Project

Un'esperienza 3D immersiva che combina React, Three.js e GSAP per creare un sito web scrollytelling moderno e cinematografico.

## ✨ Caratteristiche Principali

- **🎬 Scroll Infinito**: Esperienza di navigazione fluida e continua senza inizio né fine
- **🎯 Camera Cinematografica**: Movimento della camera basato su keyframe per transizioni fluide
- **🎨 Animazioni GSAP**: Animazioni di entrata, parallax e typewriter per un'esperienza visiva ricca
- **🔮 Modelli 3D**: Integrazione di modelli GLTF esterni (Space Helmet e Suzanne)
- **📱 Design Responsivo**: Ottimizzato per tutti i dispositivi
- **⚡ Performance**: Ottimizzazioni GPU e lazy loading per prestazioni ottimali
- **3D Engine**: Three.js
- **3D React**: @react-three/fiber, @react-three/drei
- **Animation**: GSAP ScrollTrigger (prossimamente)
- **Styling**: CSS3 con CSS Variables

## 📁 Struttura del Progetto

```
src/
├── components/
│   ├── Hero/              # Hero section con titolo animato
│   ├── Scene3D/           # Scena Three.js principale
│   ├── Objects/           # Modelli e oggetti 3D (prossimamente)
│   ├── CameraController/  # Controller movimento camera (prossimamente)
│   └── Footer/            # Footer del sito (prossimamente)
├── hooks/                 # Custom React hooks
├── App.tsx               # Componente principale
├── index.css             # Stili globali
└── main.tsx              # Entry point
```

## ✨ Features Implementate (Step 3 - Ordinato)

- ✅ **Setup completo**: Vite + React + TypeScript + Three.js
- ✅ **Hero Section**: Titolo animato con gradiente e effetti CSS
- ✅ **Scena 3D verticale**: Camera con movimento strettamente dall'alto al basso
- ✅ **7 modelli ordinati**: GLTF posizionati in sequenza verticale (Y: 2 → -4)
- ✅ **8 keyframe sequenziali**: Navigazione ordinata tra tutti i modelli
- ✅ **Zoom cinematografici**: FOV da 40° (close-up) a 80° (panoramica)
- ✅ **Movimento verticale ordinato**: Duck → Avocado → Helmet → Suzanne → Duck2 → Helmet2 → Avocado2
- ✅ **Contenuto sincronizzato**: 8 sezioni corrispondenti ai keyframe della camera
- ✅ **Performance**: Lazy loading, preloading e transizioni fluide

### � Sistema Camera Avanzato
**Movimento verticale con focus sui modelli**:
- **8 keyframe strategici** per inquadrature cinematografiche
- **FOV dinamico** da 35° (extreme close-up) a 75° (wide shot)
- **Transizioni ultra-fluide** con smooth factor 0.06
- **Target precisi** su ogni singolo modello 3D
- **6 sezioni dedicate** per ogni modello principale

## 🎯 Roadmap

### Step 2: Modelli 3D Placeholder
- [ ] Cubetti, sfere e forme geometriche animate
- [ ] Textures e materiali ottimizzati
- [ ] Posizionamento lungo il percorso di scroll

### Step 3: Camera Controller
- [ ] Movimento camera sincronizzato con scroll
- [ ] Curve di movimento fluide
- [ ] Interpolazione smooth tra keyframe

### Step 4: Animazioni Avanzate
- [ ] GSAP ScrollTrigger integration
- [ ] Animazioni oggetti 3D
- [ ] Transizioni tra sezioni

### Step 5: Ottimizzazioni
- [ ] Lazy loading modelli GLTF
- [ ] Instancing per performance
- [ ] Progressive enhancement

## 🎨 Personalizzazione

### Colori
I colori principali sono definiti in `src/index.css`:

```css
:root {
  --primary-color: #646cff;    /* Blu principale */
  --secondary-color: #61dafb;  /* Ciano Three.js */
  --text-light: rgba(255, 255, 255, 0.87);
  --text-dark: #213547;
  --bg-dark: #0a0a0a;
  --bg-light: #ffffff;
}
```

### Responsive Design
Il design è completamente responsivo con breakpoint a:
- Mobile: `max-width: 480px`
- Tablet: `max-width: 768px`
- Desktop: `min-width: 769px`

## 🔧 Development

### Comandi Disponibili

```bash
npm run dev          # Server di sviluppo
npm run build        # Build di produzione
npm run preview      # Preview build locale
npm run lint         # Linting TypeScript
```

### Debug Three.js

Durante lo sviluppo, la scena include OrbitControls temporanei per debug. Saranno rimossi nel controller finale.

## 📱 Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

Requisiti per WebGL 2.0 e ES2020.

## 🤝 Contributing

Il progetto è strutturato in modo modulare per facilitare lo sviluppo:

1. Ogni componente ha la sua cartella con `.tsx`, `.css` e `index.ts`
2. Hooks personalizzati in `src/hooks/`
3. Commenti dettagliati per ogni funzione importante
4. TypeScript strict mode abilitato

## 📝 License

MIT License - vedi [LICENSE](LICENSE) file per dettagli.

---

**Stato attuale**: Step 1 completato ✅
**Prossimo**: Step 2 - Aggiunta modelli 3D placeholder
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
