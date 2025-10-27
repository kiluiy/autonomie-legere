# 🛠️ Commandes Utiles - Autonomie Légère

## 🚀 Commandes de base

### Démarrer l'application en développement

```bash
cd autonomie-app
npm run dev
```

➡️ Ouvre [http://localhost:5173](http://localhost:5173)

### Builder pour production

```bash
cd autonomie-app
npm run build
```

➡️ Génère le dossier `dist/` optimisé

### Prévisualiser le build production

```bash
cd autonomie-app
npm run preview
```

➡️ Test du build avant déploiement

## 📦 Installation

### Première installation

```bash
cd autonomie-app
npm install
```

### Réinstallation propre (en cas de problème)

```bash
cd autonomie-app
rm -rf node_modules package-lock.json
npm install
```

## 🔧 Développement

### Lancer avec logs détaillés

```bash
cd autonomie-app
npm run dev -- --debug
```

### Lancer sur un port spécifique

```bash
cd autonomie-app
npm run dev -- --port 3000
```

### Lancer et exposer sur réseau local

```bash
cd autonomie-app
npm run dev -- --host
```

➡️ Accessible depuis mobile sur même réseau

## 🌐 Déploiement

### Déployer sur Vercel (CLI)

#### Installation Vercel CLI (une seule fois)

```bash
npm install -g vercel
```

#### Connexion Vercel

```bash
vercel login
```

#### Déployer (production)

```bash
cd autonomie-app
vercel --prod
```

#### Déployer (preview)

```bash
cd autonomie-app
vercel
```

### Déployer via GitHub + Vercel (recommandé)

#### 1. Initialiser Git

```bash
cd autonomie-app
git init
```

#### 2. Ajouter tous les fichiers

```bash
git add .
```

#### 3. Premier commit

```bash
git commit -m "Initial commit - Autonomie Légère v1.0"
```

#### 4. Créer dépôt GitHub

Via l'interface web : [github.com/new](https://github.com/new)

#### 5. Connecter le dépôt

```bash
git remote add origin https://github.com/VOTRE-USERNAME/autonomie-legere.git
git branch -M main
git push -u origin main
```

#### 6. Connecter à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. "New Project"
3. Importez votre repo GitHub
4. Cliquez "Deploy"

### Mises à jour après modifications

```bash
git add .
git commit -m "Description de vos modifications"
git push
```

➡️ Vercel redéploie automatiquement !

## 🧪 Tests et vérifications

### Vérifier le build

```bash
cd autonomie-app
npm run build
npm run preview
```

### Vérifier la taille du bundle

```bash
cd autonomie-app
npm run build
```

➡️ Affiche tailles des fichiers et gzip

### Tester sur mobile (même réseau)

```bash
cd autonomie-app
npm run dev -- --host
```

➡️ Récupérez l'IP réseau affichée
➡️ Ouvrez depuis mobile : `http://192.168.X.X:5173`

## 📝 Modifications du code

### Ajouter un appareil

Éditez : `src/data/appareils-types.js`

```javascript
export const appareilsTypes = {
  cuisine: [
    { nom: 'Nouvel appareil', puissance: 100, heuresUtilisation: 2, categorie: 'cuisine' },
    // ...
  ]
}
```

### Ajouter une région

Éditez : `src/utils/storage.js`

```javascript
export const regionsEnsoleillement = {
  'ma-region': { nom: 'Ma Région', coefficient: 0.75 },
  // ...
}
```

### Modifier les couleurs

Éditez : `src/App.css`

```css
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Changez les codes couleur */
}

.btn-primary {
  background: #667eea;
  /* Changez la couleur */
}
```

### Modifier les calculs

Éditez : `src/modules/energie/solaire/calculateur.js`

Exemple : changer le rendement système

```javascript
export function dimensionnerPanneaux(
  consommationJournaliere,
  coefficientEnsoleillement = 0.7,
  rendementSysteme = 0.85  // ← Modifier ici
) {
  // ...
}
```

## 🗂️ Structure fichiers importants

```
autonomie-app/
├── src/
│   ├── modules/energie/solaire/
│   │   └── calculateur.js          ← Formules de calcul
│   ├── data/
│   │   └── appareils-types.js      ← Base appareils
│   ├── utils/
│   │   └── storage.js              ← Sauvegarde localStorage
│   ├── App.jsx                     ← Interface principale
│   ├── App.css                     ← Styles
│   └── main.jsx                    ← Point d'entrée
├── public/                         ← Assets (images, etc.)
├── index.html                      ← HTML racine
├── package.json                    ← Dépendances
├── vite.config.js                  ← Config Vite
└── vercel.json                     ← Config Vercel
```

## 🐛 Dépannage

### L'app ne démarre pas

```bash
cd autonomie-app
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur "port already in use"

```bash
# Option 1 : Utiliser un autre port
npm run dev -- --port 3000

# Option 2 : Tuer le processus sur le port
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Linux/Mac
lsof -ti:5173 | xargs kill
```

### Erreur de build

```bash
# Vérifier les erreurs
npm run build

# Si échec, nettoyer et réinstaller
rm -rf dist node_modules
npm install
npm run build
```

### Données perdues

Les données sont en localStorage du navigateur.

**Pour sauvegarder :**
1. Ouvrez l'app
2. Cliquez "Exporter en JSON"
3. Sauvegardez le fichier

**Pour restaurer :**
L'import JSON sera ajouté dans v1.1

En attendant :
1. F12 (DevTools)
2. Console
3. `localStorage.setItem('autonomie_projets', '[CONTENU_JSON]')`

### Cache navigateur

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

## 📊 Analytics (optionnel)

### Ajouter Google Analytics

1. Créer compte GA4
2. Ajouter dans `index.html` :

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔐 Variables d'environnement (futur)

Pour API externes (v2.0+)

### Créer fichier `.env.local`

```bash
cd autonomie-app
touch .env.local
```

### Contenu

```
VITE_API_KEY=votre_cle_api
VITE_API_URL=https://api.example.com
```

### Utilisation dans le code

```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

### Sur Vercel

Ajouter via l'interface web :
Settings → Environment Variables

## 📚 Documentation

### Générer documentation (futur)

```bash
npm install -g jsdoc
jsdoc src/ -r -d docs/
```

## 🔄 Mise à jour dépendances

### Vérifier versions outdated

```bash
cd autonomie-app
npm outdated
```

### Mettre à jour

```bash
# Mineures (recommandé)
npm update

# Majeures (attention breaking changes)
npm install react@latest react-dom@latest
```

## 🎨 Personnalisation avancée

### Changer le titre et meta

Éditez : `index.html`

```html
<head>
  <title>Votre Titre</title>
  <meta name="description" content="Votre description">
</head>
```

### Changer l'icône

Remplacez : `public/vite.svg` par votre icône

### Ajouter PWA (app installable)

```bash
npm install vite-plugin-pwa -D
```

Éditez : `vite.config.js`

```javascript
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

## 💾 Backup

### Sauvegarder le projet

```bash
# Compresser
tar -czf autonomie-backup-$(date +%Y%m%d).tar.gz autonomie-app/

# Ou ZIP
zip -r autonomie-backup-$(date +%Y%m%d).zip autonomie-app/
```

### Sur GitHub (recommandé)

```bash
git push origin main
```

➡️ Backup automatique dans le cloud

## 🚀 Performance

### Analyser bundle size

```bash
npm install -g vite-bundle-visualizer
cd autonomie-app
npx vite-bundle-visualizer
```

### Optimiser images (si ajoutées)

```bash
npm install vite-plugin-imagemin -D
```

## 📱 Tester responsive

### Dans navigateur

F12 → Mode responsive

### Sur vrais devices

```bash
npm run dev -- --host
```

Scannez QR code affiché

## ✅ Checklist avant déploiement

- [ ] `npm run build` sans erreurs
- [ ] Tester en local avec `npm run preview`
- [ ] Vérifier responsive (mobile/tablette)
- [ ] Tester tous les profils
- [ ] Vérifier sauvegarde/export
- [ ] README à jour
- [ ] Commit sur Git
- [ ] Push sur GitHub

## 🎉 C'est tout !

Vous avez maintenant toutes les commandes pour développer, tester et déployer votre application.

**Bon développement ! 🚀**

---

Pour toute question : consultez la documentation dans les fichiers README, GUIDE_DEMARRAGE, et ARCHITECTURE.
