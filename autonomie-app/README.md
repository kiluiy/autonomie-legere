# ⚡ Autonomie Légère

Application web progressive pour dimensionner votre installation solaire autonome.

## 🎯 Fonctionnalités

### Module Énergie Solaire (v1.0)

- **Inventaire des appareils électriques** : Base de données de 50+ appareils avec consommations moyennes
- **Profils prédéfinis** : Tiny House, Van Aménagé, Studio, Petite Maison
- **Calculs précis** :
  - Consommation journalière (Wh/jour)
  - Dimensionnement panneaux solaires
  - Capacité batterie (Lithium ou Plomb)
  - Puissance onduleur
  - Régulateur de charge (MPPT/PWM)
  - Section câbles électriques
  - Protections électriques

- **Paramétrages avancés** :
  - Coefficient d'ensoleillement par région
  - Jours d'autonomie souhaités
  - Tension système (12V/24V/48V)
  - Type de batterie

- **Liste matériel complète** : Export de la liste de courses pour votre installation
- **Sauvegarde automatique** : Vos projets sont sauvegardés localement
- **Export JSON** : Exportez vos calculs pour sauvegarde externe

## 🚀 Évolutions futures

- **Module Eau** : Récupération eau de pluie, filtration, autonomie
- **Module Alimentation** : Potager, permaculture, calcul surfaces cultivables
- **Module Chauffage** : Isolation, poêle à bois, dimensionnement
- **Recherche produits** : API pour trouver les articles sur sites marchands
- **Comparateur de prix** : Meilleurs tarifs pour votre matériel
- **Schéma électrique** : Génération automatique du plan de câblage
- **Communauté** : Partage de projets et retours d'expérience

## 🛠️ Technologies

- **Frontend** : React 18 + Vite
- **Stockage** : localStorage (données navigateur)
- **Styling** : CSS moderne avec animations
- **Déploiement** : Vercel (gratuit)

## 📦 Installation locale

```bash
# Cloner le projet
cd autonomie-app

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Ouvrir http://localhost:5173
```

## 🌐 Déploiement sur Vercel

### Option 1 : Via GitHub (recommandé)

1. Créer un compte GitHub gratuit
2. Créer un dépôt et pusher le code :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/autonomie-legere.git
git push -u origin main
```

3. Créer un compte Vercel gratuit sur [vercel.com](https://vercel.com)
4. Cliquer "New Project"
5. Importer votre dépôt GitHub
6. Vercel détecte automatiquement Vite
7. Cliquer "Deploy"

Votre app sera en ligne en 2 minutes sur `votre-projet.vercel.app` !

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

## 📱 Progressive Web App (PWA)

L'application est installable sur mobile et desktop. Elle fonctionne hors-ligne après la première visite.

## 🧮 Formules de calcul

### Panneaux Solaires
```
Puissance crête (Wc) = Consommation journalière (Wh) / (Heures ensoleillement × Rendement système)
Heures ensoleillement = 5h × Coefficient régional
Rendement système ≈ 0.85 (pertes batteries, câbles, etc.)
```

### Batterie
```
Capacité (Wh) = (Consommation journalière × Jours autonomie) / Profondeur décharge
Profondeur décharge : 0.5 (Plomb) ou 0.8 (Lithium)
Capacité (Ah) = Capacité (Wh) / Tension batterie
```

### Onduleur
```
Puissance nominale = Somme puissances × Coefficient simultanéité (0.7)
Puissance pic = Puissance nominale × Coefficient démarrage (2)
```

### Câbles
```
Section (mm²) = (2 × ρ × I × L) / (U × Chute tension admise)
ρ = 0.0175 Ω·mm²/m (résistivité cuivre)
Chute tension admise = 3%
```

## 🤝 Contribution

Ce projet est open source. Les contributions sont les bienvenues !

## 📄 Licence

MIT License - Libre d'utilisation

## 👨‍💻 Auteur

Projet **Autonomie Légère** - Pour un monde plus autonome et résilient

---

**Note** : Les calculs sont donnés à titre indicatif. Pour une installation réelle, consultez un professionnel certifié.
