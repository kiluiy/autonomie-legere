# 🔄 GUIDE DE MISE À JOUR - Autonomie Légère

## 🎯 Comment mettre à jour ton app après modifications

### ⚡ **MÉTHODE ULTRA-RAPIDE (1 clic)**

Double-clique sur : **`update.bat`**

C'est tout ! Le script fait automatiquement :
1. ✅ Ajoute tous les fichiers modifiés
2. ✅ Crée un commit Git
3. ✅ Pousse sur GitHub
4. ✅ Déploie sur Vercel
5. ✅ Les utilisateurs voient la nouvelle version immédiatement !

---

## 📝 **MÉTHODE MANUELLE (si tu préfères)**

### Étape 1 : Commit sur Git
```bash
cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère"

git add .
git commit -m "Description de tes modifications"
git push origin main
```

### Étape 2 : Déployer sur Vercel
```bash
cd autonomie-app
vercel --prod
```

---

## 🔄 **DÉPLOIEMENT AUTOMATIQUE (Configuration)**

Une fois que tu connectes GitHub à Vercel, chaque `git push` redéploie automatiquement !

### Comment activer :

1. **Va sur Vercel**
   - https://vercel.com/kiluiys-projects/autonomie-app/settings

2. **Git → Connect Repository**
   - Sélectionne : `kiluiy/autonomie-legere`
   - Branch : `main`
   - Root Directory : `autonomie-app`

3. **Sauvegarde**

### Après activation :
```bash
# Faire tes modifications dans le code...

cd "c:\Users\Kiluiy\Documents\Projet Programme\Autonomie légère"
git add .
git commit -m "Mes modifications"
git push

# → Vercel redéploie automatiquement ! 🚀
# → Les utilisateurs voient les changements en 1-2 minutes !
```

---

## ⏱️ **TEMPS DE DÉPLOIEMENT**

- **Git push** : 5 secondes
- **Build Vercel** : 30-60 secondes
- **Propagation** : quelques secondes

**TOTAL : ~1-2 minutes** entre ton `git push` et la mise à jour visible par les utilisateurs !

---

## 📊 **VÉRIFIER LE DÉPLOIEMENT**

### Via Vercel Dashboard
- https://vercel.com/kiluiys-projects/autonomie-app
- Tu vois tous les déploiements en temps réel
- Statut : Building → Ready
- Logs de build disponibles

### Via CLI
```bash
cd autonomie-app
vercel ls
```

---

## 🎯 **WORKFLOW RECOMMANDÉ**

### Option A : Déploiement automatique (recommandé)
1. Fais tes modifications dans le code
2. `git add . && git commit -m "..." && git push`
3. Vercel déploie automatiquement
4. ✅ Fini !

### Option B : Script update.bat
1. Fais tes modifications
2. Double-clic sur `update.bat`
3. ✅ Fini !

### Option C : Manuel
1. Fais tes modifications
2. Git add/commit/push
3. `vercel --prod`
4. ✅ Fini !

---

## 🔔 **NOTIFICATIONS**

### Activer les notifications Vercel :

1. Va sur https://vercel.com/account
2. Notifications → Enable Email
3. Tu recevras un email pour chaque déploiement

---

## 🐛 **EN CAS DE PROBLÈME**

### Le build échoue ?
```bash
# Tester localement d'abord
cd autonomie-app
npm run build

# Si ça marche localement, pusher
git push
```

### Voir les logs d'erreur
```bash
vercel logs
```

### Annuler un déploiement
- Dashboard Vercel → Deployments
- Cliquer sur le déploiement précédent
- "Promote to Production"

---

## ✅ **CHECKLIST AVANT CHAQUE MISE À JOUR**

- [ ] Tester localement : `npm run dev`
- [ ] Build sans erreur : `npm run build`
- [ ] Commit avec message clair
- [ ] Push sur GitHub
- [ ] Vérifier le déploiement Vercel
- [ ] Tester l'app en ligne

---

## 🚀 **EXEMPLES DE MODIFICATIONS COURANTES**

### Ajouter un nouvel appareil
```javascript
// Modifier src/data/appareils-types.js
// Commit + Push
// → Utilisateurs voient le nouvel appareil en 2 min !
```

### Changer un calcul
```javascript
// Modifier src/modules/energie/solaire/calculateur.js
// Commit + Push
// → Nouveaux calculs en ligne !
```

### Modifier le design
```css
// Modifier src/App.css
// Commit + Push
// → Nouveau design visible !
```

---

## 📱 **CACHE NAVIGATEUR**

Les utilisateurs peuvent avoir l'ancienne version en cache.

**Solutions :**
1. Vercel gère le cache automatiquement (cache busting)
2. L'utilisateur fait CTRL+F5 pour forcer le rafraîchissement
3. Attendre quelques minutes (cache expiré automatiquement)

---

## 🎉 **RÉSUMÉ**

**Pour mettre à jour ton app :**

```bash
# Méthode simple
git add . && git commit -m "Mes modifs" && git push
cd autonomie-app && vercel --prod
```

**Ou encore plus simple :**

Double-clic sur `update.bat` ! 🎯

---

**Les utilisateurs voient tes modifications en 1-2 minutes ! ⚡**
