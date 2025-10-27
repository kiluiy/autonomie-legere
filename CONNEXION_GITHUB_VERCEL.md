# 🔗 CONNEXION GITHUB → VERCEL (Déploiement Automatique)

## 🎯 Objectif

Configurer Vercel pour qu'il redéploie automatiquement ton app à chaque `git push` sur GitHub.

---

## ✅ ÉTAPE 1 : Accéder aux paramètres Vercel

1. **Va sur ton dashboard Vercel**
   - https://vercel.com/kiluiys-projects/autonomie-app

2. **Clique sur l'onglet "Settings"** (en haut de la page)

---

## ✅ ÉTAPE 2 : Connecter le repository GitHub

1. **Dans le menu de gauche, clique sur "Git"**

2. **Cherche la section "Connect Git Repository"** ou "Git Repository"

3. **Clique sur le bouton "Connect" ou "Connect Git Repository"**

4. **Si Vercel te demande d'autoriser l'accès à GitHub :**
   - Clique sur "Authorize Vercel"
   - Confirme avec ton mot de passe GitHub si nécessaire

5. **Sélectionne le repository :**
   - Cherche : `kiluiy/autonomie-legere`
   - Clique dessus pour le sélectionner

---

## ✅ ÉTAPE 3 : Configurer le déploiement

1. **Root Directory (Important !)**
   - Vercel va demander où se trouve ton code
   - Entre : `autonomie-app`
   - ⚠️ C'est crucial car le projet est dans un sous-dossier !

2. **Branch de production**
   - Production Branch : `main` (ou `master`)
   - Vercel redéploiera automatiquement quand tu push sur cette branche

3. **Build Settings** (normalement auto-détecté)
   - Framework Preset : `Vite`
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`

4. **Clique sur "Connect" ou "Save"**

---

## ✅ ÉTAPE 4 : Vérifier la connexion

1. **Retourne sur la page principale du projet**
   - https://vercel.com/kiluiys-projects/autonomie-app

2. **Tu devrais voir :**
   - 🔗 Une icône GitHub à côté du nom du projet
   - Le nom du repository : `kiluiy/autonomie-legere`
   - La branche : `main`

---

## ✅ ÉTAPE 5 : Tester le déploiement automatique

### Méthode de test simple :

1. **Ouvre un fichier du projet** (par exemple `README.md`)

2. **Fais une petite modification**
   ```bash
   cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère"

   # Ajouter une ligne au README
   echo "Test deploiement automatique" >> README.md
   ```

3. **Commit et push**
   ```bash
   git add README.md
   git commit -m "Test: déploiement automatique"
   git push origin main
   ```

4. **Retourne sur Vercel**
   - Tu devrais voir un nouveau déploiement en cours (Building...)
   - Après 1-2 minutes : Ready ✅
   - Ton app est mise à jour automatiquement !

---

## ✅ ÉTAPE 6 : Désactiver la protection par mot de passe

Pour que tes amis puissent accéder à l'app sans login :

1. **Dans Settings, va dans "Deployment Protection"**

2. **Désactive toutes les protections :**
   - [ ] Password Protection → OFF
   - [ ] Vercel Authentication → OFF
   - [ ] Trusted IPs → OFF

3. **Clique sur "Save"**

---

## 🎉 RÉSULTAT : WORKFLOW AUTOMATIQUE

Maintenant, pour mettre à jour ton app, il suffit de :

### Option A : Script automatique (recommandé)

```bash
# Double-clic sur update.bat
```

Le script fait :
1. ✅ `git add .`
2. ✅ `git commit`
3. ✅ `git push`
4. ✅ Vercel détecte le push et redéploie automatiquement !

### Option B : Commandes manuelles

```bash
cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère"

# Faire tes modifications dans le code...

git add .
git commit -m "Mes modifications"
git push origin main

# → Vercel redéploie automatiquement ! 🚀
# → Plus besoin de lancer "vercel --prod" !
```

---

## ⏱️ TEMPS DE DÉPLOIEMENT AUTOMATIQUE

Après `git push` :
- **5 secondes** : Vercel détecte le push
- **30-60 secondes** : Build automatique
- **~10 secondes** : Propagation
- **TOTAL : 1-2 minutes** ⚡

---

## 🔔 NOTIFICATIONS (Optionnel)

Pour recevoir un email à chaque déploiement :

1. **Va sur** : https://vercel.com/account
2. **Notifications → Email Notifications**
3. **Active :**
   - ✅ Deployment Started
   - ✅ Deployment Ready
   - ✅ Deployment Failed

---

## 📊 SUIVRE LES DÉPLOIEMENTS

### Via Vercel Dashboard
- https://vercel.com/kiluiys-projects/autonomie-app
- Onglet "Deployments"
- Tu vois tous les déploiements avec :
  - Commit message
  - Date et heure
  - Statut (Building / Ready / Failed)
  - Logs complets

### Via CLI
```bash
cd autonomie-app
vercel ls
```

---

## 🐛 RÉSOLUTION DE PROBLÈMES

### Problème : Le déploiement ne se lance pas automatiquement

**Solution 1 : Vérifier la connexion**
1. Settings → Git
2. Vérifier que le repository est bien connecté
3. Vérifier que la branche est bien `main`

**Solution 2 : Vérifier les permissions GitHub**
1. Va sur https://github.com/settings/installations
2. Cherche "Vercel"
3. Clique sur "Configure"
4. Vérifie que `kiluiy/autonomie-legere` est bien autorisé

### Problème : Le build échoue

**Tester localement d'abord :**
```bash
cd autonomie-app
npm run build
```

Si ça marche localement, vérifier les logs sur Vercel :
- Dashboard → Deployments → Cliquer sur le déploiement failed
- Lire les logs d'erreur

### Problème : L'app demande toujours un login

**Solution :**
1. Settings → Deployment Protection
2. Désactiver **toutes** les protections
3. Sauvegarder
4. Attendre 1-2 minutes
5. Tester en navigation privée

---

## ✅ CHECKLIST DE CONFIGURATION

- [ ] Compte GitHub connecté à Vercel
- [ ] Repository `kiluiy/autonomie-legere` sélectionné
- [ ] Root Directory configuré sur `autonomie-app`
- [ ] Branch `main` définie comme production
- [ ] Build settings correctement configurés (Vite)
- [ ] Déploiement de test effectué avec succès
- [ ] Protection par mot de passe désactivée
- [ ] App accessible publiquement sans login
- [ ] Notifications configurées (optionnel)

---

## 🚀 WORKFLOW FINAL

```
1. Tu codes dans VSCode
   ↓
2. Tu sauvegardes tes fichiers
   ↓
3. Tu lances update.bat (ou git push)
   ↓
4. GitHub reçoit le push
   ↓
5. Vercel détecte le nouveau commit
   ↓
6. Vercel lance le build automatiquement
   ↓
7. Vercel déploie en production
   ↓
8. Les utilisateurs voient les changements ! ✅
   (1-2 minutes après le push)
```

---

## 📝 EXEMPLE COMPLET

### Scénario : Tu veux ajouter un nouveau site marchand

```bash
# 1. Modifier le code
code "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère\autonomie-app\src\utils\rechercherProduits.js"
# → Ajouter un nouveau site dans SITES_MARCHANDS

# 2. Tester localement
cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère\autonomie-app"
npm run dev
# → Vérifier que ça marche

# 3. Mettre en ligne (2 options)

# Option A : Script (plus rapide)
cd ..
update.bat

# Option B : Manuel
git add .
git commit -m "Ajout du site Solaris Store"
git push origin main

# 4. Vérifier sur Vercel
# → Aller sur https://vercel.com/kiluiys-projects/autonomie-app
# → Voir le déploiement en cours
# → Attendre "Ready" (1-2 min)

# 5. Tester l'app en ligne
# → Ouvrir https://autonomie-46ippkm4c-kiluiys-projects.vercel.app
# → Vérifier que le nouveau site apparaît
# → ✅ C'est en ligne !
```

---

## 💡 CONSEILS

1. **Toujours tester localement avant de push**
   ```bash
   npm run dev    # Vérifier que ça marche
   npm run build  # Vérifier que le build passe
   ```

2. **Messages de commit clairs**
   ```bash
   git commit -m "Ajout site marchand EcoSolar"
   git commit -m "Fix: calcul régulateur MPPT"
   git commit -m "UI: amélioration affichage paniers"
   ```

3. **Vérifier le déploiement sur Vercel avant de partager**
   - Attendre le statut "Ready ✅"
   - Tester l'app en ligne
   - Vérifier en navigation privée (pour éviter le cache)

4. **Gérer le cache utilisateur**
   - Vercel gère automatiquement le cache busting
   - Les utilisateurs peuvent faire CTRL+F5 pour forcer le rafraîchissement
   - Le cache expire automatiquement après quelques heures

---

## 🎉 FÉLICITATIONS !

Une fois configuré, tu as un pipeline de déploiement moderne et professionnel :

✅ Code sur GitHub (versioning, backup, collaboration)
✅ Déploiement automatique sur Vercel (CI/CD)
✅ HTTPS automatique
✅ CDN mondial (app rapide partout)
✅ Mises à jour instantanées pour les utilisateurs

**Tu codes → Tu push → C'est en ligne ! 🚀**
