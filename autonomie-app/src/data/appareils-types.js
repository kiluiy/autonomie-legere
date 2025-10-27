/**
 * Base de données d'appareils électriques types
 * avec consommations moyennes
 */

export const appareilsTypes = {
  cuisine: [
    { nom: 'Réfrigérateur (A++)', puissance: 150, heuresUtilisation: 24, categorie: 'cuisine' },
    { nom: 'Congélateur (A++)', puissance: 200, heuresUtilisation: 24, categorie: 'cuisine' },
    { nom: 'Four électrique', puissance: 2500, heuresUtilisation: 1, categorie: 'cuisine' },
    { nom: 'Micro-ondes', puissance: 1000, heuresUtilisation: 0.5, categorie: 'cuisine' },
    { nom: 'Plaque induction (1 feu)', puissance: 2000, heuresUtilisation: 1, categorie: 'cuisine' },
    { nom: 'Cafetière électrique', puissance: 800, heuresUtilisation: 0.5, categorie: 'cuisine' },
    { nom: 'Bouilloire électrique', puissance: 2000, heuresUtilisation: 0.2, categorie: 'cuisine' },
    { nom: 'Grille-pain', puissance: 900, heuresUtilisation: 0.1, categorie: 'cuisine' },
    { nom: 'Lave-vaisselle', puissance: 1200, heuresUtilisation: 1.5, categorie: 'cuisine' },
  ],

  electromenager: [
    { nom: 'Lave-linge', puissance: 2000, heuresUtilisation: 1, categorie: 'electromenager' },
    { nom: 'Sèche-linge', puissance: 2500, heuresUtilisation: 1, categorie: 'electromenager' },
    { nom: 'Aspirateur', puissance: 1500, heuresUtilisation: 0.5, categorie: 'electromenager' },
    { nom: 'Fer à repasser', puissance: 2000, heuresUtilisation: 0.5, categorie: 'electromenager' },
  ],

  eclairage: [
    { nom: 'Ampoule LED 10W', puissance: 10, heuresUtilisation: 5, categorie: 'eclairage' },
    { nom: 'Ampoule LED 15W', puissance: 15, heuresUtilisation: 5, categorie: 'eclairage' },
    { nom: 'Plafonnier LED 30W', puissance: 30, heuresUtilisation: 4, categorie: 'eclairage' },
    { nom: 'Lampe de bureau LED', puissance: 8, heuresUtilisation: 3, categorie: 'eclairage' },
    { nom: 'Ruban LED (par mètre)', puissance: 12, heuresUtilisation: 4, categorie: 'eclairage' },
  ],

  multimedia: [
    { nom: 'TV LED 32"', puissance: 50, heuresUtilisation: 4, categorie: 'multimedia' },
    { nom: 'TV LED 50"', puissance: 100, heuresUtilisation: 4, categorie: 'multimedia' },
    { nom: 'TV LED 65"', puissance: 150, heuresUtilisation: 4, categorie: 'multimedia' },
    { nom: 'Box Internet/TV', puissance: 15, heuresUtilisation: 24, categorie: 'multimedia' },
    { nom: 'Console de jeux', puissance: 150, heuresUtilisation: 2, categorie: 'multimedia' },
    { nom: 'Chaîne Hi-Fi', puissance: 50, heuresUtilisation: 2, categorie: 'multimedia' },
  ],

  informatique: [
    { nom: 'Ordinateur portable', puissance: 60, heuresUtilisation: 8, categorie: 'informatique' },
    { nom: 'Ordinateur fixe bureautique', puissance: 150, heuresUtilisation: 8, categorie: 'informatique' },
    { nom: 'Ordinateur fixe gaming', puissance: 400, heuresUtilisation: 4, categorie: 'informatique' },
    { nom: 'Écran PC 24"', puissance: 30, heuresUtilisation: 8, categorie: 'informatique' },
    { nom: 'Imprimante', puissance: 50, heuresUtilisation: 0.5, categorie: 'informatique' },
    { nom: 'Routeur WiFi', puissance: 10, heuresUtilisation: 24, categorie: 'informatique' },
  ],

  chauffage: [
    { nom: 'Radiateur électrique 1000W', puissance: 1000, heuresUtilisation: 8, categorie: 'chauffage' },
    { nom: 'Radiateur électrique 1500W', puissance: 1500, heuresUtilisation: 8, categorie: 'chauffage' },
    { nom: 'Radiateur électrique 2000W', puissance: 2000, heuresUtilisation: 8, categorie: 'chauffage' },
    { nom: 'Chauffage d\'appoint 800W', puissance: 800, heuresUtilisation: 4, categorie: 'chauffage' },
    { nom: 'Climatiseur portable', puissance: 1200, heuresUtilisation: 6, categorie: 'chauffage' },
  ],

  eau: [
    { nom: 'Chauffe-eau électrique 50L', puissance: 1500, heuresUtilisation: 2, categorie: 'eau' },
    { nom: 'Chauffe-eau électrique 100L', puissance: 2000, heuresUtilisation: 3, categorie: 'eau' },
    { nom: 'Pompe à eau 500W', puissance: 500, heuresUtilisation: 1, categorie: 'eau' },
    { nom: 'Pompe de piscine', puissance: 800, heuresUtilisation: 6, categorie: 'eau' },
  ],

  autres: [
    { nom: 'Sèche-cheveux', puissance: 1500, heuresUtilisation: 0.3, categorie: 'autres' },
    { nom: 'Chargeur téléphone', puissance: 10, heuresUtilisation: 2, categorie: 'autres' },
    { nom: 'Chargeur tablette', puissance: 15, heuresUtilisation: 2, categorie: 'autres' },
    { nom: 'Ventilateur', puissance: 50, heuresUtilisation: 6, categorie: 'autres' },
    { nom: 'Perceuse électrique', puissance: 600, heuresUtilisation: 0.5, categorie: 'autres' },
  ],
};

/**
 * Retourne tous les appareils dans un tableau plat
 */
export function getTousLesAppareils() {
  return Object.values(appareilsTypes).flat();
}

/**
 * Recherche d'appareils par nom
 */
export function rechercherAppareil(terme) {
  const tousAppareils = getTousLesAppareils();
  const termeMin = terme.toLowerCase();
  return tousAppareils.filter(app =>
    app.nom.toLowerCase().includes(termeMin)
  );
}

/**
 * Profils prédéfinis pour différents types d'habitats
 */
export const profilsHabitat = {
  'tiny-house': {
    nom: 'Tiny House',
    description: 'Habitat minimaliste 15-20m²',
    appareils: [
      { nom: 'Réfrigérateur (A++)', puissance: 150, heuresUtilisation: 24 },
      { nom: 'Ampoule LED 10W', puissance: 10, heuresUtilisation: 5, quantite: 4 },
      { nom: 'Ordinateur portable', puissance: 60, heuresUtilisation: 6 },
      { nom: 'Chargeur téléphone', puissance: 10, heuresUtilisation: 2, quantite: 2 },
      { nom: 'Box Internet/TV', puissance: 15, heuresUtilisation: 24 },
      { nom: 'TV LED 32"', puissance: 50, heuresUtilisation: 3 },
      { nom: 'Cafetière électrique', puissance: 800, heuresUtilisation: 0.3 },
      { nom: 'Micro-ondes', puissance: 1000, heuresUtilisation: 0.5 },
    ]
  },

  'van-amenage': {
    nom: 'Van Aménagé',
    description: 'Véhicule aménagé nomade',
    appareils: [
      { nom: 'Réfrigérateur (A++)', puissance: 60, heuresUtilisation: 24 },
      { nom: 'Ampoule LED 10W', puissance: 10, heuresUtilisation: 4, quantite: 3 },
      { nom: 'Ordinateur portable', puissance: 60, heuresUtilisation: 4 },
      { nom: 'Chargeur téléphone', puissance: 10, heuresUtilisation: 2, quantite: 2 },
      { nom: 'Ventilateur', puissance: 30, heuresUtilisation: 4 },
      { nom: 'Pompe à eau 500W', puissance: 100, heuresUtilisation: 0.5 },
    ]
  },

  'studio': {
    nom: 'Studio / T1',
    description: 'Petit appartement 25-35m²',
    appareils: [
      { nom: 'Réfrigérateur (A++)', puissance: 150, heuresUtilisation: 24 },
      { nom: 'Ampoule LED 15W', puissance: 15, heuresUtilisation: 5, quantite: 5 },
      { nom: 'Ordinateur portable', puissance: 60, heuresUtilisation: 8 },
      { nom: 'TV LED 50"', puissance: 100, heuresUtilisation: 4 },
      { nom: 'Box Internet/TV', puissance: 15, heuresUtilisation: 24 },
      { nom: 'Lave-linge', puissance: 2000, heuresUtilisation: 0.5 },
      { nom: 'Micro-ondes', puissance: 1000, heuresUtilisation: 0.5 },
      { nom: 'Aspirateur', puissance: 1500, heuresUtilisation: 0.3 },
    ]
  },

  'maison-petite': {
    nom: 'Petite Maison',
    description: 'Maison 50-80m²',
    appareils: [
      { nom: 'Réfrigérateur (A++)', puissance: 150, heuresUtilisation: 24 },
      { nom: 'Congélateur (A++)', puissance: 200, heuresUtilisation: 24 },
      { nom: 'Ampoule LED 15W', puissance: 15, heuresUtilisation: 5, quantite: 10 },
      { nom: 'TV LED 50"', puissance: 100, heuresUtilisation: 5 },
      { nom: 'Box Internet/TV', puissance: 15, heuresUtilisation: 24 },
      { nom: 'Ordinateur portable', puissance: 60, heuresUtilisation: 6, quantite: 2 },
      { nom: 'Lave-linge', puissance: 2000, heuresUtilisation: 1 },
      { nom: 'Lave-vaisselle', puissance: 1200, heuresUtilisation: 1 },
      { nom: 'Micro-ondes', puissance: 1000, heuresUtilisation: 0.7 },
      { nom: 'Aspirateur', puissance: 1500, heuresUtilisation: 0.5 },
      { nom: 'Four électrique', puissance: 2500, heuresUtilisation: 0.5 },
    ]
  },
};
