/**
 * Module de calcul pour installation solaire
 * Autonomie Légère - Module Énergie Solaire
 */

/**
 * Calcule la consommation journalière totale en Wh
 * @param {Array} appareils - Liste des appareils avec {nom, puissance (W), heuresUtilisation}
 * @returns {number} Consommation totale en Wh/jour
 */
export function calculerConsommationJournaliere(appareils) {
  return appareils.reduce((total, appareil) => {
    return total + (appareil.puissance * appareil.heuresUtilisation);
  }, 0);
}

/**
 * Dimensionne les panneaux solaires nécessaires
 * @param {number} consommationJournaliere - Wh/jour
 * @param {number} coefficientEnsoleillement - Entre 0 et 1 (ex: 0.7 pour France)
 * @param {number} coefficientExposition - Entre 0.5 et 1.0 selon orientation (1.0 = Sud optimal)
 * @param {number} rendementSysteme - Pertes système (batteries, câbles) ~0.85
 * @returns {Object} {puissancePanneaux, options de panneaux}
 */
export function dimensionnerPanneaux(
  consommationJournaliere,
  coefficientEnsoleillement = 0.7,
  coefficientExposition = 1.0,
  rendementSysteme = 0.85
) {
  // Heures d'ensoleillement équivalentes moyennes par jour
  const heuresEnsoleillement = 5 * coefficientEnsoleillement;

  // Puissance crête nécessaire en tenant compte des pertes ET de l'exposition
  const rendementTotal = rendementSysteme * coefficientExposition;
  const puissanceCrete = consommationJournaliere / (heuresEnsoleillement * rendementTotal);

  // Puissances de panneaux disponibles sur le marché
  const puissancesPanneaux = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

  // Calculer les options pour chaque puissance de panneau
  const options = puissancesPanneaux.map(puissancePanneau => {
    const nombre = Math.ceil(puissanceCrete / puissancePanneau);
    return {
      puissancePanneau,
      nombre,
      puissanceTotale: nombre * puissancePanneau,
      surDimensionnement: ((nombre * puissancePanneau - puissanceCrete) / puissanceCrete * 100).toFixed(1)
    };
  }).filter(option => option.nombre > 0 && option.nombre <= 20); // Limiter à 20 panneaux max

  // Option recommandée : meilleur compromis entre nombre de panneaux et sur-dimensionnement
  const optionRecommandee = options.reduce((meilleure, option) => {
    const scoreActuel = option.nombre * 0.6 + parseFloat(option.surDimensionnement) * 0.4;
    const scoreMeilleur = meilleure.nombre * 0.6 + parseFloat(meilleure.surDimensionnement) * 0.4;
    return scoreActuel < scoreMeilleur ? option : meilleure;
  });

  return {
    puissanceCrete: Math.ceil(puissanceCrete),
    options,
    recommandation: optionRecommandee,
    // Compatibilité avec l'ancien format
    nombrePanneaux300W: Math.ceil(puissanceCrete / 300),
    puissanceTotaleInstallee: Math.ceil(puissanceCrete / 300) * 300,
    coefficientExposition
  };
}

/**
 * Dimensionne la batterie nécessaire
 * @param {number} consommationJournaliere - Wh/jour
 * @param {number} joursAutonomie - Nombre de jours sans soleil
 * @param {number} profondeurDecharge - Max 0.5 pour plomb, 0.8 pour lithium
 * @param {number} tensionBatterie - 12V, 24V ou 48V
 * @returns {Object} Capacité batterie
 */
export function dimensionnerBatterie(
  consommationJournaliere,
  joursAutonomie = 2,
  profondeurDecharge = 0.5,
  tensionBatterie = 24
) {
  const capaciteWh = (consommationJournaliere * joursAutonomie) / profondeurDecharge;
  const capaciteAh = capaciteWh / tensionBatterie;

  return {
    capaciteWh: Math.ceil(capaciteWh),
    capaciteAh: Math.ceil(capaciteAh),
    tensionBatterie,
    typeBatterieRecommande: profondeurDecharge > 0.6 ? 'Lithium (LiFePO4)' : 'Plomb AGM/GEL'
  };
}

/**
 * Dimensionne l'onduleur nécessaire
 * @param {Array} appareils - Liste des appareils
 * @param {number} coefficientSimultaneite - Pourcentage appareils utilisés en même temps (0-1)
 * @param {number} coefficientDemarrage - Pour pics de démarrage (1.5-3)
 * @returns {Object} Puissance onduleur
 */
export function dimensionnerOnduleur(
  appareils,
  coefficientSimultaneite = 0.7,
  coefficientDemarrage = 2
) {
  const puissanceTotale = appareils.reduce((total, app) => total + app.puissance, 0);
  const puissanceSimultanee = puissanceTotale * coefficientSimultaneite;
  const puissancePic = puissanceSimultanee * coefficientDemarrage;

  // Puissances standard d'onduleurs
  const puissancesStandard = [1000, 1500, 2000, 3000, 5000, 8000, 10000];
  const puissanceRecommandee = puissancesStandard.find(p => p >= puissancePic) || puissancePic;

  return {
    puissanceNominale: Math.ceil(puissanceSimultanee),
    puissancePic: Math.ceil(puissancePic),
    puissanceRecommandee,
    type: puissanceRecommandee > 3000 ? 'Onduleur triphasé' : 'Onduleur monophasé'
  };
}

/**
 * Calcule la section de câble nécessaire
 * @param {number} puissance - Puissance en W
 * @param {number} tension - Tension en V (12, 24, 48)
 * @param {number} longueur - Longueur du câble en mètres
 * @param {number} chuteMaxAdmise - Chute de tension admise (0.03 = 3%)
 * @returns {Object} Section câble
 */
export function dimensionnerCables(
  puissance,
  tension,
  longueur,
  chuteMaxAdmise = 0.03
) {
  const intensite = puissance / tension;
  const resistiviteCuivre = 0.0175; // Ohm.mm²/m à 20°C

  // Section minimale en mm²
  const sectionMin = (2 * resistiviteCuivre * intensite * longueur) / (tension * chuteMaxAdmise);

  // Sections normalisées
  const sectionsStandard = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
  const sectionRecommandee = sectionsStandard.find(s => s >= sectionMin) || sectionMin;

  return {
    intensite: Math.ceil(intensite),
    sectionMinimale: Math.ceil(sectionMin),
    sectionRecommandee,
    type: 'Câble cuivre souple'
  };
}

/**
 * Dimensionne le régulateur de charge
 * @param {number} puissancePanneaux - Puissance crête totale en W
 * @param {number} tensionBatterie - 12, 24 ou 48V
 * @param {number} coefficientSecurite - Marge de sécurité (1.25 recommandé)
 * @returns {Object} Régulateur
 */
export function dimensionnerRegulateur(
  puissancePanneaux,
  tensionBatterie,
  coefficientSecurite = 1.25
) {
  const courantMax = (puissancePanneaux / tensionBatterie) * coefficientSecurite;

  // Intensités standard de régulateurs
  const intensitesStandard = [10, 20, 30, 40, 50, 60, 80, 100];
  const intensiteRecommandee = intensitesStandard.find(i => i >= courantMax) || Math.ceil(courantMax);

  return {
    courantMax: Math.ceil(courantMax),
    intensiteRecommandee,
    typeRecommande: puissancePanneaux > 1000 ? 'MPPT (meilleur rendement)' : 'PWM (économique)',
    tension: tensionBatterie
  };
}

/**
 * Liste complète du matériel nécessaire
 * @param {Object} dimensions - Tous les résultats de dimensionnement
 * @returns {Array} Liste de matériel avec quantités
 */
export function genererListeMateriel(dimensions) {
  const {
    panneaux,
    batterie,
    onduleur,
    regulateur,
    cables
  } = dimensions;

  const liste = [
    {
      categorie: 'Production',
      items: [
        {
          nom: `Panneau solaire ${panneaux.recommandation.puissancePanneau}W`,
          quantite: panneaux.recommandation.nombre,
          specification: `${panneaux.recommandation.puissanceTotale}W total (${panneaux.puissanceCrete}Wc nécessaire)`
        },
        {
          nom: 'Structure de fixation',
          quantite: 1,
          specification: `Pour ${panneaux.recommandation.nombre} panneau${panneaux.recommandation.nombre > 1 ? 'x' : ''}`
        }
      ]
    },
    {
      categorie: 'Stockage',
      items: [
        {
          nom: `Batterie ${batterie.typeBatterieRecommande}`,
          quantite: 1,
          specification: `${batterie.capaciteAh}Ah ${batterie.tensionBatterie}V (${batterie.capaciteWh}Wh)`
        }
      ]
    },
    {
      categorie: 'Conversion',
      items: [
        {
          nom: onduleur.type,
          quantite: 1,
          specification: `${onduleur.puissanceRecommandee}W (pic ${onduleur.puissancePic}W)`
        },
        {
          nom: `Régulateur ${regulateur.typeRecommande}`,
          quantite: 1,
          specification: `${regulateur.intensiteRecommandee}A ${regulateur.tension}V`
        }
      ]
    },
    {
      categorie: 'Câblage',
      items: [
        {
          nom: `Câble ${cables.panneaux.sectionRecommandee}mm² (panneaux)`,
          quantite: 1,
          specification: `Section ${cables.panneaux.sectionRecommandee}mm² pour ${cables.panneaux.intensite}A`
        },
        {
          nom: `Câble ${cables.batterie.sectionRecommandee}mm² (batterie)`,
          quantite: 1,
          specification: `Section ${cables.batterie.sectionRecommandee}mm² pour ${cables.batterie.intensite}A`
        },
        {
          nom: 'Connecteurs MC4',
          quantite: panneaux.recommandation.nombre * 2,
          specification: 'Pour connexions panneaux'
        }
      ]
    },
    {
      categorie: 'Protection',
      items: [
        {
          nom: 'Parafoudre DC',
          quantite: 1,
          specification: 'Protection panneaux solaires'
        },
        {
          nom: 'Disjoncteur DC',
          quantite: 2,
          specification: `Calibre selon ${cables.panneaux.intensite}A`
        },
        {
          nom: 'Fusibles batterie',
          quantite: 2,
          specification: 'Protection circuit batterie'
        },
        {
          nom: 'Coffret de protection IP65',
          quantite: 1,
          specification: 'Pour régulateur et protections'
        }
      ]
    },
    {
      categorie: 'Accessoires',
      items: [
        {
          nom: 'Bornes de connexion',
          quantite: 10,
          specification: 'Divers raccordements'
        },
        {
          nom: 'Gaines de protection',
          quantite: 1,
          specification: 'Protection câbles extérieurs'
        }
      ]
    }
  ];

  return liste;
}
