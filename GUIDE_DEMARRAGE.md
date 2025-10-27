# 🚀 Guide de Démarrage Rapide - Autonomie Légère

## ✅ Ce qui a été créé

Votre application **Autonomie Légère** est prête ! Voici ce qui a été développé :

### 📁 Structure du projet

```
autonomie-app/
├── src/
│   ├── modules/
│   │   └── energie/
│   │       └── solaire/
│   │           └── calculateur.js      # Toute la logique de calcul
│   ├── data/
│   │   └── appareils-types.js          # 50+ appareils prédéfinis
│   ├── utils/
│   │   └── storage.js                  # Gestion localStorage
│   ├── components/                     # (pour futurs modules)
│   ├── App.jsx                         # Application principale
│   └── App.css                         # Styles modernes
├── README.md                           # Documentation complète
└── vercel.json                         # Config déploiement
```

### 🎨 Fonctionnalités implémentées

1. **4 sections interactives** :
   - Gestion des appareils électriques
   - Configuration des paramètres
   - Résultats du dimensionnement
   - Liste matériel complète

2. **Profils prédéfinis** :
   - Tiny House
   - Van Aménagé
   - Studio / T1
   - Petite Maison

3. **Calculs techniques** :
   - Panneaux solaires (puissance crête, nombre)
   - Batterie (capacité Ah/Wh, type)
   - Onduleur (puissance nominale/pic)
   - Régulateur de charge (MPPT/PWM)
   - Câbles (sections adaptées)
   - Protections électriques

4. **Base de données** :
   - 50+ appareils électriques
   - Consommations moyennes réalistes
   - 8 catégories (cuisine, multimédia, etc.)

## 🏃 Lancer l'application

### En local (maintenant)

```bash
cd autonomie-app
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173)

### Tester l'application

1. Cliquez sur un **profil prédéfini** (ex: "Tiny House")
2. Allez dans l'onglet **"2. Paramètres"**
3. Choisissez votre région et paramètres
4. Cliquez sur **"Calculer mon installation"**
5. Consultez les **résultats** et la **liste matériel**

## 🌐 Déployer sur Vercel (GRATUIT)

### Méthode simple (recommandée)

#### Étape 1 : Créer un compte GitHub
1. Allez sur [github.com](https://github.com)
2. Créez un compte gratuit

#### Étape 2 : Publier votre code
```bash
cd autonomie-app

# Initialiser Git
git init
git add .
git commit -m "Application Autonomie Légère - Module Solaire v1.0"

# Créer un dépôt sur GitHub (via l'interface web)
# Puis connecter votre dépôt local :
git remote add origin https://github.com/VOTRE-USERNAME/autonomie-legere.git
git branch -M main
git push -u origin main
```

#### Étape 3 : Déployer sur Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte gratuit (connectez-vous avec GitHub)
3. Cliquez **"New Project"**
4. Sélectionnez votre dépôt **"autonomie-legere"**
5. Vercel détecte automatiquement Vite
6. Cliquez **"Deploy"**

✨ **C'est tout !** Votre app sera en ligne en ~2 minutes sur :
`https://votre-projet.vercel.app`

### Méthode alternative (CLI)

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter
vercel login

# Déployer depuis le dossier autonomie-app
cd autonomie-app
vercel

# Suivre les instructions
# Répondre "Y" aux questions
```

## 📱 Utilisation de l'application

### 1. Ajouter vos appareils

**Option A - Profil prédéfini** :
- Cliquez sur un profil (Tiny House, Van, etc.)
- Les appareils types sont chargés automatiquement

**Option B - Manuellement** :
- Choisissez une catégorie (cuisine, multimédia...)
- Sélectionnez un appareil
- Cliquez "Ajouter"

**Option C - Personnalisé** :
- Cliquez "+ Personnalisé"
- Entrez nom, puissance (W), heures d'utilisation

### 2. Ajuster les valeurs

- Modifiez la puissance des appareils si nécessaire
- Ajustez les heures d'utilisation quotidienne
- La consommation totale se calcule automatiquement

### 3. Configurer les paramètres

- **Région** : Choisissez votre zone géographique (affecte l'ensoleillement)
- **Jours d'autonomie** : Nombre de jours sans soleil à prévoir (recommandé : 2-3)
- **Tension batterie** : 12V (petit), 24V (recommandé), 48V (gros système)
- **Type batterie** : Plomb (économique) ou Lithium (performant)

### 4. Calculer

Cliquez **"Calculer mon installation"** pour obtenir :
- Nombre de panneaux solaires nécessaires
- Capacité de batterie
- Puissance onduleur
- Régulateur de charge
- Sections de câbles
- Liste matériel complète

### 5. Exporter

- **Exporter JSON** : Sauvegarde externe de votre projet
- **Imprimer** : Version papier de la liste matériel

## 🔮 Évolutions futures

### Prochaines fonctionnalités

1. **Recherche automatique de produits** :
   - API pour scraper Amazon, ManoMano, AutoSolar
   - Comparaison de prix en temps réel
   - Liens directs vers les produits

2. **Module Eau** :
   - Calcul surface de toit pour récupération
   - Dimensionnement cuve
   - Système de filtration

3. **Module Alimentation** :
   - Surface potager nécessaire
   - Rotation des cultures
   - Autonomie alimentaire

4. **Module Chauffage** :
   - Calcul besoins thermiques
   - Dimensionnement poêle à bois
   - Isolation optimale

5. **Schéma électrique** :
   - Génération automatique du plan de câblage
   - Export PDF professionnel

6. **Communauté** :
   - Partage de projets
   - Retours d'expérience
   - Forum d'entraide

### Architecture évolutive

Le projet est structuré en modules :
```
modules/
├── energie/
│   ├── solaire/    ✅ FAIT
│   └── eolien/     🔜 À venir
├── eau/            🔜 À venir
├── alimentation/   🔜 À venir
└── chauffage/      🔜 À venir
```

Chaque nouveau module pourra être développé indépendamment !

## 🛠️ Personnalisation

### Ajouter des appareils à la base

Éditez [src/data/appareils-types.js](autonomie-app/src/data/appareils-types.js) :

```javascript
cuisine: [
  { nom: 'Mon appareil', puissance: 500, heuresUtilisation: 2, categorie: 'cuisine' },
  // ...
]
```

### Modifier les régions

Éditez [src/utils/storage.js](autonomie-app/src/utils/storage.js) :

```javascript
export const regionsEnsoleillement = {
  'ma-region': { nom: 'Ma Région', coefficient: 0.75 },
  // ...
}
```

### Personnaliser les couleurs

Éditez [src/App.css](autonomie-app/src/App.css) :

```css
.header {
  background: linear-gradient(135deg, #VOTRE_COULEUR1, #VOTRE_COULEUR2);
}
```

## ❓ Support

### Problèmes courants

**L'app ne démarre pas** :
```bash
cd autonomie-app
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Erreur de build** :
```bash
npm run build
# Vérifier les erreurs dans la console
```

**Données perdues** :
- Les données sont en localStorage (navigateur)
- Exportez en JSON régulièrement pour sauvegarder

### Besoin d'aide ?

Le code est entièrement commenté et documenté. Chaque fonction explique ce qu'elle fait !

## 🎉 Félicitations !

Vous avez maintenant une application complète pour dimensionner votre installation solaire !

**Prochaines étapes** :
1. ✅ Testez avec vos propres appareils
2. ✅ Déployez sur Vercel
3. ✅ Partagez avec votre communauté
4. 🔜 Proposez des améliorations

---

**Autonomie Légère** - Vers l'autonomie énergétique 🌍⚡
