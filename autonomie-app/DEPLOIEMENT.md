# 🚀 Guide de déploiement - Autonomie Légère

## Méthode 1 : Vercel (Recommandée - GRATUIT)

### Option A : Déploiement via GitHub (le plus simple)

1. **Créer un dépôt GitHub**
   ```bash
   # Initialiser Git si pas déjà fait
   git init
   git add .
   git commit -m "Initial commit - Autonomie Légère"

   # Créer un repo sur https://github.com/new
   # Puis lier et pousser :
   git remote add origin https://github.com/VOTRE_USERNAME/autonomie-legere.git
   git branch -M main
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Aller sur https://vercel.com
   - Cliquer sur "Sign Up" (ou "Log In")
   - Choisir "Continue with GitHub"
   - Autoriser Vercel à accéder à vos repos
   - Cliquer sur "New Project"
   - Importer votre repo `autonomie-legere`
   - Vérifier la configuration :
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Cliquer sur "Deploy"

3. **C'est tout !** 🎉
   - Votre app sera en ligne en 2-3 minutes
   - URL : `https://autonomie-legere.vercel.app` (ou similaire)
   - Chaque push sur GitHub redéploie automatiquement !

### Option B : Déploiement via CLI Vercel

1. **Installer Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Se connecter**
   ```bash
   vercel login
   ```

3. **Déployer**
   ```bash
   cd autonomie-app
   vercel
   ```

4. **Répondre aux questions :**
   - Set up and deploy? `Y`
   - Which scope? (choisir votre compte)
   - Link to existing project? `N`
   - Project name? `autonomie-legere`
   - In which directory? `./`
   - Override settings? `N`

5. **Déploiement en production**
   ```bash
   vercel --prod
   ```

---

## Méthode 2 : Netlify (Alternative gratuite)

1. **Via Netlify Drop**
   - Aller sur https://app.netlify.com/drop
   - Faire `npm run build` localement
   - Glisser-déposer le dossier `dist/` sur Netlify
   - C'est en ligne immédiatement !

2. **Via CLI Netlify**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

---

## Méthode 3 : GitHub Pages (Gratuit mais plus limité)

1. **Installer gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Modifier package.json**
   Ajouter :
   ```json
   {
     "homepage": "https://VOTRE_USERNAME.github.io/autonomie-legere",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Déployer**
   ```bash
   npm run deploy
   ```

4. **Configurer GitHub Pages**
   - Aller dans Settings → Pages
   - Source: `gh-pages` branch
   - Save

---

## 📝 Configuration des variables d'environnement

### Si vous avez configuré les APIs (Amazon, Google)

#### Sur Vercel :
1. Aller dans votre projet sur Vercel
2. Settings → Environment Variables
3. Ajouter :
   - `VITE_AMAZON_ACCESS_KEY`
   - `VITE_AMAZON_SECRET_KEY`
   - `VITE_AMAZON_ASSOCIATE_TAG`
   - `VITE_GOOGLE_API_KEY`
   - `VITE_GOOGLE_SEARCH_ENGINE_ID`
4. Redéployer

#### Sur Netlify :
1. Site settings → Build & deploy → Environment
2. Ajouter les mêmes variables
3. Redéployer

---

## 🌐 Domaine personnalisé (optionnel)

### Vercel
1. Project Settings → Domains
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions

### Netlify
1. Domain settings → Add custom domain
2. Suivre les instructions DNS

---

## ✅ Vérifications post-déploiement

- [ ] L'application se charge correctement
- [ ] Les calculs fonctionnent
- [ ] Le localStorage fonctionne
- [ ] Les liens vers les produits s'ouvrent
- [ ] Les APIs sont configurées (si applicable)
- [ ] Tester sur mobile

---

## 🔄 Mises à jour

### Avec GitHub + Vercel/Netlify
```bash
git add .
git commit -m "Mes modifications"
git push
```
→ Déploiement automatique !

### Avec CLI
```bash
vercel --prod
# ou
netlify deploy --prod
```

---

## 💡 Conseils

- ✅ Utilisez Vercel ou Netlify pour la simplicité
- ✅ Liez avec GitHub pour les mises à jour auto
- ✅ Activez HTTPS (automatique sur Vercel/Netlify)
- ✅ Configurez un domaine personnalisé si souhaité
- ⚠️ N'oubliez pas de configurer les variables d'environnement si vous utilisez les APIs

---

## 📞 Support

- Vercel Docs : https://vercel.com/docs
- Netlify Docs : https://docs.netlify.com
- GitHub Pages : https://pages.github.com

---

**Votre calculateur sera accessible 24/7 gratuitement !** 🎉
