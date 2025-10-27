# 🚀 DÉPLOIEMENT EN LIGNE - GUIDE RAPIDE

## ✅ Étape 1 : Créer le repo GitHub (2 min)

1. **Aller sur GitHub**
   - Ouvre https://github.com/new
   - Connecte-toi si nécessaire

2. **Créer le repository**
   - Repository name : `autonomie-legere`
   - Description : `Calculateur d'installation solaire pour habitats autonomes`
   - Public ou Private : **Public** (recommandé pour Vercel gratuit)
   - ❌ Ne pas cocher "Add README" (on l'a déjà)
   - Cliquer "Create repository"

3. **Copier l'URL du repo**
   - GitHub affiche l'URL : `https://github.com/TON_USERNAME/autonomie-legere.git`
   - Copie cette URL

## ✅ Étape 2 : Pousser le code sur GitHub (1 min)

Ouvre un terminal et tape :

```bash
cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère"

# Remplace TON_USERNAME par ton vrai username GitHub
git remote add origin https://github.com/TON_USERNAME/autonomie-legere.git

git push -u origin main
```

✅ **Ton code est maintenant sur GitHub !**

## ✅ Étape 3 : Déployer sur Vercel (2 min)

1. **Aller sur Vercel**
   - Ouvre https://vercel.com/signup
   - Clique "Continue with GitHub"
   - Autorise Vercel à accéder à GitHub

2. **Importer le projet**
   - Clique "Add New..." → "Project"
   - Cherche `autonomie-legere` dans la liste
   - Clique "Import"

3. **Configuration automatique**
   - Vercel détecte automatiquement :
     - Framework: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - ✅ Tout est bon !

4. **Déployer**
   - Clique "Deploy"
   - ⏱️ Attends 1-2 minutes

5. **🎉 C'EST EN LIGNE !**
   - URL : `https://autonomie-legere-xxx.vercel.app`
   - Clique sur l'URL pour voir ton app !

## ✅ Étape 4 (Optionnel) : Configurer les APIs

Si tu veux activer les vraies recherches de prix Amazon/Google :

1. **Dans Vercel**
   - Va dans ton projet
   - Clique "Settings" → "Environment Variables"

2. **Ajouter les variables**
   - Clique "Add"
   - Ajoute :
     ```
     VITE_AMAZON_ACCESS_KEY = ta_clé_amazon
     VITE_AMAZON_SECRET_KEY = ta_clé_secrète
     VITE_AMAZON_ASSOCIATE_TAG = ton_tag
     ```

3. **Redéployer**
   - Va dans "Deployments"
   - Clique "..." → "Redeploy"

## 🔄 Mises à jour futures

Pour mettre à jour ton app :

```bash
cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère"

# Faire tes modifications...

git add .
git commit -m "Description des modifications"
git push
```

→ **Vercel redéploie automatiquement !** 🚀

## 🌐 Domaine personnalisé (Optionnel)

1. Dans Vercel : Settings → Domains
2. Ajoute ton domaine (ex: `autonomie-legere.fr`)
3. Configure les DNS selon les instructions
4. SSL/HTTPS automatique !

---

## 📝 Résumé des commandes

```bash
# 1. Pousser sur GitHub
cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère"
git remote add origin https://github.com/TON_USERNAME/autonomie-legere.git
git push -u origin main

# 2. Aller sur Vercel
# → https://vercel.com
# → Import Project
# → Deploy

# 3. Mises à jour
git add .
git commit -m "Modifications"
git push
```

---

## ❓ FAQ

**Q : C'est vraiment gratuit ?**
→ Oui ! Vercel est 100% gratuit pour les projets personnels.

**Q : Mon domaine ?**
→ Vercel te donne un domaine gratuit `.vercel.app`
→ Tu peux ajouter ton propre domaine gratuitement

**Q : Combien de temps c'est en ligne ?**
→ Indéfiniment ! Tant que ton compte Vercel existe

**Q : Les données des utilisateurs ?**
→ Tout est stocké localement dans leur navigateur (localStorage)
→ Aucune base de données nécessaire

**Q : Mises à jour ?**
→ Chaque push GitHub redéploie automatiquement

---

## 🎯 C'est tout !

Ton calculateur sera accessible 24/7 sur Internet ! 🌍

**URL d'exemple :** https://autonomie-legere.vercel.app

Partage cette URL à tes amis pour qu'ils puissent calculer leur installation solaire ! ⚡
