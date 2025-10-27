/**
 * Intégrations API pour la recherche de produits
 * Autonomie Légère
 */

/**
 * CONFIGURATION DES APIs
 *
 * Pour activer les vraies APIs, il faut :
 *
 * 1. AMAZON PRODUCT ADVERTISING API (PA-API 5.0)
 *    - S'inscrire au programme Amazon Associates : https://partenaires.amazon.fr/
 *    - Obtenir les credentials : Access Key, Secret Key, Associate Tag
 *    - Créer un fichier .env avec :
 *      VITE_AMAZON_ACCESS_KEY=votre_access_key
 *      VITE_AMAZON_SECRET_KEY=votre_secret_key
 *      VITE_AMAZON_ASSOCIATE_TAG=votre_tag
 *
 * 2. GOOGLE CUSTOM SEARCH API (pour Google Shopping)
 *    - Créer un projet sur Google Cloud Console
 *    - Activer Custom Search JSON API
 *    - Créer une clé API
 *    - Créer un moteur de recherche personnalisé pour Shopping
 *    - Ajouter dans .env :
 *      VITE_GOOGLE_API_KEY=votre_api_key
 *      VITE_GOOGLE_SEARCH_ENGINE_ID=votre_engine_id
 */

// Vérifier si les APIs sont configurées
const AMAZON_CONFIGURED = !!(
  import.meta.env.VITE_AMAZON_ACCESS_KEY &&
  import.meta.env.VITE_AMAZON_SECRET_KEY &&
  import.meta.env.VITE_AMAZON_ASSOCIATE_TAG
);

const GOOGLE_CONFIGURED = !!(
  import.meta.env.VITE_GOOGLE_API_KEY &&
  import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
);

/**
 * Rechercher un produit sur Amazon via Product Advertising API
 */
export async function rechercherSurAmazon(nomProduit, specification) {
  if (!AMAZON_CONFIGURED) {
    console.warn('Amazon API non configurée, utilisation de la simulation');
    return null;
  }

  try {
    // Construction de la requête de recherche
    const keywords = `${nomProduit} ${specification || ''}`.trim();

    // NOTE: L'implémentation complète nécessite :
    // - aws4 pour signer les requêtes (npm install aws4)
    // - Requête HTTPS vers https://webservices.amazon.fr/paapi5/searchitems

    // Exemple de structure de requête (à implémenter avec aws4)
    const requestPayload = {
      Keywords: keywords,
      Resources: [
        'Images.Primary.Large',
        'ItemInfo.Title',
        'ItemInfo.Features',
        'Offers.Listings.Price'
      ],
      SearchIndex: 'All',
      ItemCount: 5,
      PartnerTag: import.meta.env.VITE_AMAZON_ASSOCIATE_TAG,
      PartnerType: 'Associates',
      Marketplace: 'www.amazon.fr'
    };

    // TODO: Implémenter la signature AWS et la requête
    console.log('Recherche Amazon:', requestPayload);

    return null; // Retourner les résultats parsés
  } catch (error) {
    console.error('Erreur recherche Amazon:', error);
    return null;
  }
}

/**
 * Rechercher un produit via Google Custom Search API
 */
export async function rechercherViaGoogle(nomProduit, specification, siteUrl = null) {
  if (!GOOGLE_CONFIGURED) {
    console.warn('Google API non configurée, utilisation de la simulation');
    return null;
  }

  try {
    const query = `${nomProduit} ${specification || ''}`.trim();
    const siteRestriction = siteUrl ? `+site:${siteUrl.replace('https://', '').replace('http://', '')}` : '';

    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.append('key', import.meta.env.VITE_GOOGLE_API_KEY);
    url.searchParams.append('cx', import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID);
    url.searchParams.append('q', query + siteRestriction);
    url.searchParams.append('num', '5');

    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items.map(item => ({
        titre: item.title,
        url: item.link,
        snippet: item.snippet,
        image: item.pagemap?.cse_image?.[0]?.src
      }));
    }

    return null;
  } catch (error) {
    console.error('Erreur recherche Google:', error);
    return null;
  }
}

/**
 * Rechercher sur un site spécifique via web scraping léger
 * NOTE: Nécessite un backend pour éviter les problèmes CORS
 */
export async function rechercherSurSite(nomProduit, specification, siteId, siteUrl) {
  // Cette fonction nécessiterait un backend Node.js avec cheerio ou puppeteer
  // pour faire du web scraping, car le navigateur bloque les requêtes CORS

  console.warn('Web scraping nécessite un backend, utilisation de la simulation');
  return null;
}

/**
 * Fonction principale qui essaie plusieurs méthodes
 */
export async function rechercherProduitReel(article, site) {
  let resultats = null;

  // 1. Essayer Amazon si c'est Amazon
  if (site.id === 'amazon' && AMAZON_CONFIGURED) {
    resultats = await rechercherSurAmazon(article.nom, article.specification);
  }

  // 2. Essayer Google Custom Search si configuré
  if (!resultats && GOOGLE_CONFIGURED) {
    resultats = await rechercherViaGoogle(article.nom, article.specification, site.url);
  }

  // 3. Essayer le scraping (si backend disponible)
  if (!resultats) {
    resultats = await rechercherSurSite(article.nom, article.specification, site.id, site.url);
  }

  return resultats;
}

/**
 * Retourne le statut de configuration des APIs
 */
export function getApiStatus() {
  return {
    amazon: AMAZON_CONFIGURED,
    google: GOOGLE_CONFIGURED,
    mode: AMAZON_CONFIGURED || GOOGLE_CONFIGURED ? 'hybrid' : 'simulation'
  };
}

/**
 * Guide d'installation pour l'utilisateur
 */
export function getInstallationGuide() {
  return `
📋 GUIDE D'INTÉGRATION DES APIs RÉELLES

Pour activer la recherche de prix réelle, suivez ces étapes :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣  AMAZON PRODUCT ADVERTISING API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. S'inscrire au programme Amazon Associates
   → https://partenaires.amazon.fr/

B. Obtenir vos identifiants API
   1. Connectez-vous à Amazon Associates
   2. Allez dans "Outils" → "Product Advertising API"
   3. Notez :
      - Access Key ID
      - Secret Access Key
      - Associate Tag (votre ID partenaire)

C. Créer un fichier .env à la racine du projet :

   VITE_AMAZON_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
   VITE_AMAZON_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   VITE_AMAZON_ASSOCIATE_TAG=monsite-21

D. Installer les dépendances :
   npm install aws4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2️⃣  GOOGLE CUSTOM SEARCH API (optionnel)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. Créer un projet Google Cloud
   → https://console.cloud.google.com/

B. Activer l'API Custom Search
   1. APIs & Services → Enable APIs and Services
   2. Chercher "Custom Search JSON API"
   3. Cliquer "Enable"

C. Créer une clé API
   1. APIs & Services → Credentials
   2. Create Credentials → API Key
   3. Copier la clé

D. Créer un moteur de recherche personnalisé
   → https://programmablesearchengine.google.com/
   1. Créer un nouveau moteur
   2. Activer "Search the entire web"
   3. Activer "Image search"
   4. Copier l'ID du moteur (cx)

E. Ajouter dans .env :

   VITE_GOOGLE_API_KEY=AIzaSyDexampleApiKey123456789
   VITE_GOOGLE_SEARCH_ENGINE_ID=a12bcdefg3456789

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3️⃣  REDÉMARRER L'APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   npm run dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  LIMITES ET COÛTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Amazon PA-API :
  • 8 640 requêtes/jour gratuitement
  • Nécessite des revenus d'affiliation pour + de requêtes
  • Délai d'activation : 48h après inscription

Google Custom Search :
  • 100 requêtes/jour gratuitement
  • 1 000 requêtes = 5$ au-delà

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 MODE HYBRIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

L'application utilise automatiquement :
  1. Amazon API si configurée (pour Amazon)
  2. Google API si configurée (autres sites)
  3. Simulation sinon (comme actuellement)
`;
}
