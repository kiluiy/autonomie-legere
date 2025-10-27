# ⚡ Autonomie Légère

> **Application web progressive pour dimensionner votre installation solaire et progresser vers l'autonomie complète.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/votre-username/autonomie-legere)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff.svg)](https://vitejs.dev/)

---

## 🎯 Vue d'ensemble

**Autonomie Légère** est une plateforme évolutive qui vous aide à calculer et dimensionner vos installations pour une autonomie progressive :

- ✅ **Module Énergie Solaire** (v1.0) - Opérationnel
- 🔜 Module Eau (récupération, filtration)
- 🔜 Module Alimentation (potager, permaculture)
- 🔜 Module Chauffage (isolation, poêle)

---

## ✨ Fonctionnalités v1.0

### 🔋 Énergie Solaire

- **Calcul de consommation** : Inventaire de vos appareils électriques
- **Dimensionnement précis** :
  - Panneaux solaires (puissance crête, nombre)
  - Batteries Lithium ou Plomb (capacité Ah/Wh)
  - Onduleur (puissance nominale/pic)
  - Régulateur MPPT/PWM
  - Câbles (sections adaptées)
  - Protections électriques complètes

- **Base de données** : 50+ appareils avec consommations réelles
- **4 profils prédéfinis** : Tiny House, Van, Studio, Maison
- **7 régions** : Coefficients d'ensoleillement adaptés
- **Export** : Sauvegarde JSON, impression

---

## 🚀 Démarrage rapide

### Installation

```bash
cd autonomie-app
npm install
```

### Lancement

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173)

### Build production

```bash
npm run build
```

---

## 📚 Documentation

### 📖 Commencez ici

➡️ **[INDEX.md](INDEX.md)** - Guide de navigation dans toute la documentation

### Documents principaux

| Document | Description |
|----------|-------------|
| **[RECAP_PROJET.md](RECAP_PROJET.md)** | Vue d'ensemble complète du projet ⭐ |
| **[GUIDE_DEMARRAGE.md](GUIDE_DEMARRAGE.md)** | Guide pratique d'utilisation |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | Documentation technique détaillée |
| **[ROADMAP.md](ROADMAP.md)** | Feuille de route et évolutions |
| **[COMMANDES.md](COMMANDES.md)** | Référence de toutes les commandes |

---

## 🌐 Déploiement

### Sur Vercel (gratuit)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Connectez votre repo GitHub
3. Cliquez "Deploy"

➡️ En ligne en 2 minutes !

**Guide complet** : [GUIDE_DEMARRAGE.md](GUIDE_DEMARRAGE.md#-déployer-sur-vercel-gratuit)

---

## 🛠️ Technologies

- **Frontend** : React 18 + Vite
- **Stockage** : localStorage (navigateur)
- **Styling** : CSS moderne
- **Déploiement** : Vercel (gratuit)
- **Architecture** : Modulaire et évolutive

---

## 📊 Formules de calcul

### Panneaux Solaires
```
Puissance crête (Wc) = Consommation (Wh/j) / (5h × Coeff × 0.85)
```

### Batterie
```
Capacité (Ah) = (Consommation × Jours autonomie) / (Profondeur décharge × Tension)
```

### Onduleur
```
Puissance = Σ Appareils × 0.7 (simultanéité) × 2 (pic)
```

### Câbles
```
Section (mm²) = (2 × 0.0175 × I × L) / (U × 0.03)
```

**Détails complets** : [ARCHITECTURE.md](ARCHITECTURE.md#formules-scientifiques)

---

## 📸 Captures d'écran

### Interface principale
*(Application moderne avec interface à onglets)*

### Résultats de calcul
*(Cartes visuelles avec tous les dimensionnements)*

### Liste matériel
*(Liste complète pour votre installation)*

---

## 🗺️ Roadmap

### ✅ v1.0 - Module Énergie Solaire (Actuel)
- Calculs complets installation solaire
- Base de données appareils
- Profils prédéfinis
- Interface moderne

### 🚀 v1.1 - Améliorations (Court terme)
- Graphiques consommation
- Mode hybride (avec réseau)
- Adaptation saisonnière
- PWA complète

### 🌊 v2.0 - Module Eau (Moyen terme)
- Récupération eau de pluie
- Dimensionnement cuve
- Filtration et traitement

### 🥕 v3.0 - Module Alimentation
- Dimensionnement potager
- Permaculture
- Autonomie alimentaire

### 🔥 v4.0 - Module Chauffage
- Calcul déperditions
- Dimensionnement poêle
- Isolation optimale

**Roadmap complète** : [ROADMAP.md](ROADMAP.md)

---

## 🎯 Cas d'usage

### Pour particuliers
- Dimensionner votre installation solaire
- Comparer configurations
- Estimer budget matériel
- Préparer votre projet

### Pour professionnels
- Outil de pré-dimensionnement
- Support commercial
- Formation
- Validation calculs

### Pour collectifs
- Habitat participatif
- Éco-village
- Tiny house village
- Communauté van life

---

## 🤝 Contribution

Ce projet est **open source**. Les contributions sont les bienvenues !

### Comment contribuer

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez (`git commit -m 'Add AmazingFeature'`)
4. Pushez (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Domaines de contribution

- 🐛 **Bugs** : Signalement et corrections
- ✨ **Fonctionnalités** : Nouvelles features
- 📝 **Documentation** : Améliorations
- 🌍 **Traductions** : i18n
- 🎨 **Design** : UX/UI
- 🧪 **Tests** : Qualité code

---

## 📄 Licence

Ce projet est sous licence **MIT** - libre d'utilisation.

Voir [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Projet Autonomie Légère**

*Pour un monde plus autonome et résilient*

---

## 🌟 Remerciements

- Communauté open source
- Utilisateurs testeurs
- Contributeurs futurs

---

## 📞 Support

### Documentation complète

Toutes les réponses sont dans la documentation :

- **Débuter** : [GUIDE_DEMARRAGE.md](GUIDE_DEMARRAGE.md)
- **Comprendre** : [ARCHITECTURE.md](ARCHITECTURE.md)
- **Référence** : [COMMANDES.md](COMMANDES.md)
- **Navigation** : [INDEX.md](INDEX.md)

### Problèmes

En cas de bug :
1. Consultez [COMMANDES.md - Dépannage](COMMANDES.md#-dépannage)
2. Vérifiez les issues GitHub
3. Ouvrez une nouvelle issue si nécessaire

---

## 🎉 Fonctionnalités clés

- ✅ **Gratuit** : 100% gratuit, hébergement compris
- ✅ **Open Source** : Code ouvert et modifiable
- ✅ **Privacy-first** : Données en local uniquement
- ✅ **Responsive** : Mobile, tablette, desktop
- ✅ **Évolutif** : Architecture modulaire
- ✅ **Documenté** : Documentation exhaustive
- ✅ **Performant** : Rapide et optimisé
- ✅ **Moderne** : Technologies récentes

---

## 📊 Statistiques

- **1200+ lignes** de code JavaScript/React
- **450+ lignes** de CSS moderne
- **2000+ lignes** de documentation
- **50+ appareils** dans la base
- **7 fonctions** de calcul principales
- **4 profils** habitat prédéfinis

---

## 🚀 Commandes rapides

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Déploiement Vercel
vercel --prod
```

---

## 🎯 Objectif du projet

**Rendre l'autonomie accessible à tous** en fournissant des outils de calcul gratuits, précis et faciles à utiliser.

L'autonomie énergétique est la première étape vers une autonomie complète (eau, alimentation, chauffage).

---

## 🌱 Vision

Créer une **plateforme complète d'autonomie** couvrant tous les aspects :
- Énergie
- Eau
- Alimentation
- Chauffage
- Déchets
- Habitat

Une communauté où chacun peut partager son expérience et aider les autres dans leur parcours vers l'autonomie.

---

## ⭐ Pour aller plus loin

### Documentation complète
➡️ Commencez par [INDEX.md](INDEX.md) pour naviguer dans toute la documentation

### Déployer votre installation
➡️ Suivez le guide complet dans [GUIDE_DEMARRAGE.md](GUIDE_DEMARRAGE.md)

### Comprendre le code
➡️ Consultez [ARCHITECTURE.md](ARCHITECTURE.md) pour la doc technique

### Voir les évolutions
➡️ Découvrez [ROADMAP.md](ROADMAP.md) pour la vision long terme

---

**Commencez votre parcours vers l'autonomie dès aujourd'hui ! ⚡🌍**

*Autonomie Légère - v1.0*
