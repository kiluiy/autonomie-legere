# 🏗️ Architecture Technique - Autonomie Légère

## Vue d'ensemble

Application web modulaire pour le calcul d'installations autonomes, commençant par l'énergie solaire et évolutive vers d'autres aspects (eau, alimentation, chauffage).

## Structure du projet

```
autonomie-legere/
├── autonomie-app/                    # Application React
│   ├── src/
│   │   ├── modules/                  # Modules métier (évolutifs)
│   │   │   └── energie/
│   │   │       └── solaire/
│   │   │           └── calculateur.js
│   │   ├── data/                     # Données statiques
│   │   │   └── appareils-types.js
│   │   ├── utils/                    # Utilitaires
│   │   │   └── storage.js
│   │   ├── components/               # Composants réutilisables (futur)
│   │   ├── App.jsx                   # Composant principal
│   │   ├── App.css                   # Styles
│   │   └── main.jsx                  # Point d'entrée
│   ├── public/                       # Assets statiques
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json                   # Config déploiement
├── GUIDE_DEMARRAGE.md
├── ARCHITECTURE.md                   # Ce fichier
└── README.md
```

## Modules

### Module Énergie Solaire (v1.0)

#### Fichier : `src/modules/energie/solaire/calculateur.js`

Contient toutes les fonctions de calcul pour dimensionner une installation solaire.

##### Fonctions principales

**1. `calculerConsommationJournaliere(appareils)`**
- Calcule la consommation totale en Wh/jour
- Formule : `Σ (puissance × heures_utilisation)`

**2. `dimensionnerPanneaux(consommation, coeffEnsoleillement, rendement)`**
```javascript
// Heures d'ensoleillement équivalentes
heuresEnsoleillement = 5h × coefficientEnsoleillement

// Puissance crête nécessaire
puissanceCrete = consommation / (heuresEnsoleillement × rendement)

// Nombre de panneaux 300W
nombrePanneaux = ceil(puissanceCrete / 300)
```

**3. `dimensionnerBatterie(consommation, joursAutonomie, profondeurDecharge, tension)`**
```javascript
// Capacité en Wh
capaciteWh = (consommation × joursAutonomie) / profondeurDecharge

// Capacité en Ah
capaciteAh = capaciteWh / tension

// Profondeur de décharge :
// - Plomb : 0.5 (50% max)
// - Lithium : 0.8 (80% max)
```

**4. `dimensionnerOnduleur(appareils, coeffSimultaneite, coeffDemarrage)`**
```javascript
// Puissance totale
puissanceTotale = Σ puissance_appareils

// Puissance simultanée (70% des appareils en même temps)
puissanceSimultanee = puissanceTotale × 0.7

// Puissance pic (démarrages moteurs, compresseurs)
puissancePic = puissanceSimultanee × 2

// Onduleur recommandé : puissance standard supérieure au pic
```

**5. `dimensionnerRegulateur(puissancePanneaux, tensionBatterie, coeffSecurite)`**
```javascript
// Courant max des panneaux
courantMax = (puissancePanneaux / tensionBatterie) × 1.25

// Arrondi à l'intensité standard supérieure
```

**6. `dimensionnerCables(puissance, tension, longueur, chuteMaxAdmise)`**
```javascript
// Intensité
I = puissance / tension

// Section minimale (loi d'Ohm)
Section = (2 × ρ × I × L) / (U × ΔU)

// Avec :
// - ρ = 0.0175 Ω·mm²/m (résistivité cuivre à 20°C)
// - I = intensité (A)
// - L = longueur câble (m)
// - U = tension (V)
// - ΔU = chute tension admise (3% = 0.03)

// Arrondi à la section normalisée supérieure
```

**7. `genererListeMateriel(dimensions)`**
- Génère la liste complète du matériel nécessaire
- Organisée par catégories (Production, Stockage, Conversion, etc.)

### Module Data

#### Fichier : `src/data/appareils-types.js`

**Structure des données :**
```javascript
{
  categorie: [
    {
      nom: string,                // Nom de l'appareil
      puissance: number,          // Puissance en Watts
      heuresUtilisation: number,  // Heures par jour
      categorie: string           // Catégorie
    }
  ]
}
```

**Catégories disponibles :**
- cuisine (9 appareils)
- electromenager (4 appareils)
- eclairage (5 appareils)
- multimedia (6 appareils)
- informatique (6 appareils)
- chauffage (5 appareils)
- eau (4 appareils)
- autres (8 appareils)

**Profils prédéfinis :**
- `tiny-house` : Habitat minimaliste 15-20m²
- `van-amenage` : Véhicule aménagé nomade
- `studio` : Petit appartement 25-35m²
- `maison-petite` : Maison 50-80m²

### Module Stockage

#### Fichier : `src/utils/storage.js`

Gestion de la persistance des données avec localStorage.

**API :**
```javascript
// Projets
sauvegarderProjet(projet)
chargerTousProjets()
chargerProjet(id)
supprimerProjet(id)

// Projet actuel
definirProjetActuel(id)
getProjetActuel()

// Utilitaires
creerNouveauProjet(nom, type)
exporterProjetJSON(projet)
importerProjetJSON(file)
```

**Structure d'un projet :**
```javascript
{
  id: string,                    // Timestamp
  nom: string,
  type: string,                  // 'solaire', 'eau', etc.
  appareils: Array,
  parametres: {
    region: string,
    coefficientEnsoleillement: number,
    joursAutonomie: number,
    tensionBatterie: number,
    typeBatterie: string
  },
  resultats: Object,
  dateCreation: string,
  dateModification: string
}
```

## Architecture Frontend

### Composants React

#### `App.jsx`
Composant principal contenant :
- State management (useState, useEffect)
- Navigation par onglets
- 4 composants sections

**State principal :**
```javascript
const [projetActuel, setProjetActuel] = useState(null);
const [appareils, setAppareils] = useState([]);
const [resultats, setResultats] = useState(null);
const [ongletActif, setOngletActif] = useState('appareils');
const [parametres, setParametres] = useState({...});
```

**Composants sections :**
1. `AppareilsSection` : Gestion inventaire appareils
2. `ParametresSection` : Configuration installation
3. `ResultatsSection` : Affichage dimensionnement
4. `MaterielSection` : Liste matériel + export

### Gestion des données

**Sauvegarde automatique :**
```javascript
useEffect(() => {
  if (projetActuel) {
    sauvegarderProjet({
      ...projetActuel,
      appareils,
      parametres,
      resultats
    });
  }
}, [appareils, parametres, resultats]);
```

**Chargement initial :**
```javascript
useEffect(() => {
  const projet = getProjetActuel();
  if (projet) {
    // Restaurer le projet
  } else {
    // Créer nouveau projet par défaut
  }
}, []);
```

## Styles CSS

### Architecture CSS

**Organisation :**
```css
/* Réinitialisation globale */
* { box-sizing: border-box; }

/* Layout principal */
.app
  .header
  .tabs
  .main
    .section
  .footer

/* Composants */
.profils
.ajouter-appareil
.liste-appareils
.parametres-grid
.resultats-grid
.materiel-actions

/* Utilitaires */
.btn-primary, .btn-secondary, .btn-danger
.input-small
.total
.vide
.info-box
```

**Design System :**
- Palette : Violet (#667eea) / Violet foncé (#764ba2)
- Typographie : Système (San Francisco, Segoe UI, Roboto)
- Espacements : Multiples de 0.5rem
- Ombres : 3 niveaux
- Animations : Transitions 0.2-0.3s

**Responsive :**
- Desktop first
- Breakpoint : 768px
- Grid adaptatif avec `repeat(auto-fit, minmax(...))`

## Déploiement

### Configuration Vercel

**Fichier : `vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Build :**
- Vite génère les assets optimisés dans `dist/`
- HTML, CSS, JS minifiés
- Assets avec hash pour cache-busting

**Environnement de production :**
- CDN global Vercel
- HTTPS automatique
- Compression gzip/brotli
- Cache headers optimisés

## Évolution future

### Architecture modulaire

**Ajouter un nouveau module (exemple : Eau) :**

1. Créer le dossier et les fichiers :
```
src/modules/eau/
  ├── calculateur.js        # Logique métier
  └── index.js
```

2. Créer les données :
```javascript
// src/data/eau-types.js
export const sourcesEau = {
  'pluie': { rendement: 0.8 },
  'puits': { profondeur: 10 },
  // ...
}
```

3. Ajouter au composant principal :
```javascript
// App.jsx
import { calculerRecuperationEau } from './modules/eau/calculateur';

// Nouveau state
const [moduleActif, setModuleActif] = useState('solaire');

// Nouvelle section
{moduleActif === 'eau' && <EauSection />}
```

4. Ajouter navigation :
```javascript
<nav className="modules-nav">
  <button onClick={() => setModuleActif('solaire')}>
    Énergie
  </button>
  <button onClick={() => setModuleActif('eau')}>
    Eau
  </button>
</nav>
```

### API Backend (future)

**Fonctionnalités nécessitant un backend :**

1. **Scraping produits** :
```javascript
// api/produits/[query].js (Vercel Serverless Function)
export default async function handler(req, res) {
  const { query } = req.query;
  const produits = await scraperAmazon(query);
  res.json(produits);
}
```

2. **Base de données partagée** :
- Supabase (PostgreSQL gratuit)
- Partage de projets communauté
- Statistiques globales

3. **Authentification** :
- OAuth GitHub/Google
- Projets privés/publics

### Progressive Web App (PWA)

**À ajouter :**
- Service Worker pour cache offline
- Manifest.json pour installation
- Icons et splash screens

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Autonomie Légère',
        short_name: 'Autonomie',
        theme_color: '#667eea'
      }
    })
  ]
}
```

## Formules scientifiques

### Électricité

**Loi d'Ohm :**
```
U = R × I
R = ρ × L / S
```

**Puissance :**
```
P = U × I
P = U² / R
P = R × I²
```

**Énergie :**
```
E (Wh) = P (W) × t (h)
E (kWh) = E (Wh) / 1000
```

**Capacité batterie :**
```
Q (Ah) = E (Wh) / U (V)
```

### Solaire

**Irradiation :**
```
Production (Wh) = Puissance_crête (Wc) × Heures_ensoleillement × Rendement
```

**Rendement global :**
```
η_global = η_panneau × η_régulateur × η_batterie × η_onduleur
η_global ≈ 0.85 (15% de pertes)
```

**Température :**
```
Puissance_réelle = Puissance_nominale × (1 - 0.004 × (T - 25°C))
```

## Bonnes pratiques

### Code

- Fonctions pures pour les calculs
- Commentaires explicatifs
- Noms de variables descriptifs
- Pas de magic numbers
- Validation des entrées

### Performance

- Calculs uniquement au clic (pas en temps réel)
- localStorage pour persistance (pas de DB nécessaire v1)
- Lazy loading des modules futurs
- Optimisation images

### UX

- Feedback immédiat
- Sauvegarde automatique
- Profils prédéfinis
- Export des données
- Design responsive

---

**Autonomie Légère** - Architecture évolutive et modulaire
