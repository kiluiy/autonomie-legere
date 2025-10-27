/**
 * Module de recherche et comparaison de produits sur sites marchands
 * Autonomie Légère
 */

// Sites marchands français spécialisés en énergie solaire
export const SITES_MARCHANDS = [
  {
    id: 'myshop-solaire',
    nom: 'MyShop Solaire',
    url: 'https://www.myshop-solaire.com',
    fraisPort: 0, // Port gratuit à partir de 500€
    fraisPortMin: 15,
    seuilPortGratuit: 500,
    specialites: ['panneau', 'batterie', 'onduleur', 'regulateur']
  },
  {
    id: 'alma-solar',
    nom: 'Alma Solar',
    url: 'https://www.alma-solarshop.fr',
    fraisPort: 0,
    fraisPortMin: 20,
    seuilPortGratuit: 300,
    specialites: ['panneau', 'batterie', 'onduleur', 'regulateur', 'cable']
  },
  {
    id: 'solaris-store',
    nom: 'Solaris Store',
    url: 'https://www.solaris-store.com',
    fraisPort: 0,
    fraisPortMin: 12,
    seuilPortGratuit: 400,
    specialites: ['panneau', 'onduleur', 'regulateur', 'cable', 'protection']
  },
  {
    id: 'amazon',
    nom: 'Amazon',
    url: 'https://www.amazon.fr',
    fraisPort: 0,
    fraisPortMin: 5,
    seuilPortGratuit: 35,
    specialites: ['cable', 'protection', 'accessoire']
  }
];

/**
 * Catégorise un article de matériel
 */
function categoriserArticle(nomArticle) {
  const nom = nomArticle.toLowerCase();

  if (nom.includes('panneau')) return 'panneau';
  if (nom.includes('batterie')) return 'batterie';
  if (nom.includes('onduleur')) return 'onduleur';
  if (nom.includes('régulateur') || nom.includes('regulateur')) return 'regulateur';
  if (nom.includes('câble') || nom.includes('cable')) return 'cable';
  if (nom.includes('parafoudre') || nom.includes('disjoncteur') || nom.includes('fusible') || nom.includes('coffret')) return 'protection';
  if (nom.includes('connecteur') || nom.includes('borne') || nom.includes('gaine')) return 'accessoire';

  return 'autre';
}

/**
 * Simule une recherche de prix pour un produit
 * En production, cela ferait des appels API réels aux sites marchands
 */
async function rechercherPrixProduit(article, site) {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

  const categorie = categoriserArticle(article.nom);

  // Si le site n'est pas spécialisé dans cette catégorie, moins de chances de trouver
  if (!site.specialites.includes(categorie) && Math.random() > 0.3) {
    return null;
  }

  // Simulation de prix basés sur des estimations réalistes
  const prixBase = estimerPrixBase(article);
  const variation = (Math.random() - 0.5) * 0.3; // Variation de ±15%
  const prix = prixBase * (1 + variation);

  // Disponibilité aléatoire (90% de chances)
  const disponible = Math.random() > 0.1;

  if (!disponible) return null;

  // Générer une URL de produit simulée réaliste
  const genererUrlProduit = (nomArticle, siteId, siteUrl) => {
    const slug = nomArticle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Retirer les accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const productId = Math.floor(Math.random() * 900000) + 100000; // ID aléatoire 6 chiffres

    switch(siteId) {
      case 'myshop-solaire':
        return `${siteUrl}/produit/${slug}-${productId}.html`;
      case 'alma-solar':
        return `${siteUrl}/p/${productId}/${slug}`;
      case 'solaris-store':
        return `${siteUrl}/products/${slug}`;
      case 'amazon':
        return `https://www.amazon.fr/dp/B0${productId.toString().substring(0, 8)}`;
      default:
        return `${siteUrl}/product/${productId}`;
    }
  };

  return {
    site: site.id,
    nomSite: site.nom,
    urlSite: site.url,
    urlProduit: genererUrlProduit(article.nom, site.id, site.url),
    article: article.nom,
    quantite: article.quantite,
    prixUnitaire: Math.round(prix * 100) / 100,
    prixTotal: Math.round(prix * article.quantite * 100) / 100,
    disponible: true,
    delaiLivraison: Math.floor(Math.random() * 5) + 2 // 2-7 jours
  };
}

/**
 * Estime le prix de base d'un article
 */
function estimerPrixBase(article) {
  const nom = article.nom.toLowerCase();
  const spec = article.specification?.toLowerCase() || '';

  // Panneaux solaires : ~0.80€/W
  if (nom.includes('panneau')) {
    const match = nom.match(/(\d+)w/);
    if (match) {
      const puissance = parseInt(match[1]);
      return puissance * 0.80;
    }
    return 200;
  }

  // Batteries
  if (nom.includes('batterie')) {
    if (nom.includes('lithium')) return 800;
    return 400;
  }

  // Onduleurs : ~0.30€/W
  if (nom.includes('onduleur')) {
    const match = spec.match(/(\d+)w/);
    if (match) {
      const puissance = parseInt(match[1]);
      return puissance * 0.30;
    }
    return 300;
  }

  // Régulateurs
  if (nom.includes('régulateur') || nom.includes('regulateur')) {
    if (nom.includes('mppt')) return 250;
    return 120;
  }

  // Câbles : prix au mètre × 10m estimé
  if (nom.includes('câble') || nom.includes('cable')) {
    const match = nom.match(/(\d+(?:\.\d+)?)mm/);
    if (match) {
      const section = parseFloat(match[1]);
      return section * 2.5 * 10; // ~2.5€/m × 10m
    }
    return 40;
  }

  // Protections
  if (nom.includes('parafoudre')) return 80;
  if (nom.includes('disjoncteur')) return 25;
  if (nom.includes('fusible')) return 15;
  if (nom.includes('coffret')) return 60;

  // Accessoires
  if (nom.includes('connecteur')) return 3;
  if (nom.includes('borne')) return 5;
  if (nom.includes('structure')) return 200;
  if (nom.includes('gaine')) return 30;

  return 50;
}

/**
 * Recherche les prix sur tous les sites pour tous les articles
 */
export async function rechercherTousPrix(listeMateriel) {
  const tousArticles = listeMateriel.flatMap(categorie =>
    categorie.items.map(item => ({
      ...item,
      categorieOrigine: categorie.categorie
    }))
  );

  const resultats = [];

  for (const article of tousArticles) {
    const prixParSite = [];

    for (const site of SITES_MARCHANDS) {
      const prix = await rechercherPrixProduit(article, site);
      if (prix) {
        prixParSite.push(prix);
      }
    }

    resultats.push({
      article,
      prixParSite: prixParSite.sort((a, b) => a.prixTotal - b.prixTotal)
    });
  }

  return resultats;
}

/**
 * Optimise les achats pour minimiser le coût total (articles + port)
 */
export function optimiserPaniers(resultatsRecherche) {
  // Créer tous les paniers possibles par site
  const paniersParSite = {};

  SITES_MARCHANDS.forEach(site => {
    paniersParSite[site.id] = {
      site: site.nom,
      siteId: site.id,
      url: site.url,
      articles: [],
      sousTotal: 0,
      fraisPort: 0,
      total: 0
    };
  });

  // Pour chaque article, choisir le meilleur prix disponible
  resultatsRecherche.forEach(resultat => {
    if (resultat.prixParSite.length > 0) {
      const meilleurPrix = resultat.prixParSite[0]; // Déjà trié par prix
      const panier = paniersParSite[meilleurPrix.site];

      panier.articles.push({
        nom: meilleurPrix.article,
        quantite: meilleurPrix.quantite,
        prixUnitaire: meilleurPrix.prixUnitaire,
        prixTotal: meilleurPrix.prixTotal,
        specification: resultat.article.specification,
        urlProduit: meilleurPrix.urlProduit
      });

      panier.sousTotal += meilleurPrix.prixTotal;
    }
  });

  // Calculer les frais de port et totaux
  const paniers = Object.values(paniersParSite)
    .filter(panier => panier.articles.length > 0)
    .map(panier => {
      const site = SITES_MARCHANDS.find(s => s.id === panier.siteId);

      if (panier.sousTotal >= site.seuilPortGratuit) {
        panier.fraisPort = 0;
        panier.portGratuit = true;
      } else {
        panier.fraisPort = site.fraisPortMin;
        panier.portGratuit = false;
        panier.manquePourPortGratuit = Math.round((site.seuilPortGratuit - panier.sousTotal) * 100) / 100;
      }

      panier.total = Math.round((panier.sousTotal + panier.fraisPort) * 100) / 100;
      panier.sousTotal = Math.round(panier.sousTotal * 100) / 100;

      return panier;
    })
    .sort((a, b) => a.total - b.total);

  // Calculer le total global
  const totalGlobal = paniers.reduce((sum, p) => sum + p.total, 0);
  const totalArticles = paniers.reduce((sum, p) => sum + p.sousTotal, 0);
  const totalPort = paniers.reduce((sum, p) => sum + p.fraisPort, 0);

  return {
    paniers,
    resume: {
      nombreSites: paniers.length,
      totalArticles: Math.round(totalArticles * 100) / 100,
      totalPort: Math.round(totalPort * 100) / 100,
      totalGlobal: Math.round(totalGlobal * 100) / 100
    }
  };
}

/**
 * Fonction principale : recherche et optimise
 */
export async function rechercherEtOptimiser(listeMateriel, onProgress) {
  if (onProgress) onProgress({ etape: 'recherche', message: 'Recherche des prix sur les sites marchands...' });

  const resultats = await rechercherTousPrix(listeMateriel);

  if (onProgress) onProgress({ etape: 'optimisation', message: 'Optimisation des paniers...' });

  const optimisation = optimiserPaniers(resultats);

  if (onProgress) onProgress({ etape: 'termine', message: 'Recherche terminée !' });

  return {
    resultatsDetailles: resultats,
    optimisation
  };
}
