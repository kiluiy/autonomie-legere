/**
 * Gestion du stockage local (localStorage)
 * pour sauvegarder les projets utilisateur
 */

const STORAGE_KEY = 'autonomie_projets';
const CURRENT_PROJECT_KEY = 'autonomie_projet_actuel';

/**
 * Sauvegarde un projet
 */
export function sauvegarderProjet(projet) {
  try {
    const projets = chargerTousProjets();
    const index = projets.findIndex(p => p.id === projet.id);

    if (index >= 0) {
      projets[index] = { ...projet, dateModification: new Date().toISOString() };
    } else {
      projets.push({
        ...projet,
        dateCreation: new Date().toISOString(),
        dateModification: new Date().toISOString(),
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projets));
    return true;
  } catch (error) {
    console.error('Erreur sauvegarde projet:', error);
    return false;
  }
}

/**
 * Charge tous les projets
 */
export function chargerTousProjets() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur chargement projets:', error);
    return [];
  }
}

/**
 * Charge un projet par son ID
 */
export function chargerProjet(id) {
  const projets = chargerTousProjets();
  return projets.find(p => p.id === id);
}

/**
 * Supprime un projet
 */
export function supprimerProjet(id) {
  try {
    const projets = chargerTousProjets();
    const nouveauxProjets = projets.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nouveauxProjets));
    return true;
  } catch (error) {
    console.error('Erreur suppression projet:', error);
    return false;
  }
}

/**
 * Définit le projet actuel
 */
export function definirProjetActuel(id) {
  localStorage.setItem(CURRENT_PROJECT_KEY, id);
}

/**
 * Récupère le projet actuel
 */
export function getProjetActuel() {
  const id = localStorage.getItem(CURRENT_PROJECT_KEY);
  return id ? chargerProjet(id) : null;
}

/**
 * Crée un nouveau projet vierge
 */
export function creerNouveauProjet(nom, type = 'solaire') {
  return {
    id: Date.now().toString(),
    nom,
    type,
    appareils: [],
    parametres: {
      region: 'france-sud',
      coefficientEnsoleillement: 0.7,
      joursAutonomie: 2,
      tensionBatterie: 24,
      typeBatterie: 'plomb', // 'plomb' ou 'lithium'
    },
    resultats: null,
  };
}

/**
 * Exporte un projet en JSON
 */
export function exporterProjetJSON(projet) {
  const dataStr = JSON.stringify(projet, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projet.nom.replace(/\s+/g, '_')}_${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Importe un projet depuis JSON
 */
export function importerProjetJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const projet = JSON.parse(e.target.result);
        // Générer un nouvel ID pour éviter les conflits
        projet.id = Date.now().toString();
        resolve(projet);
      } catch (error) {
        reject(new Error('Fichier JSON invalide'));
      }
    };
    reader.onerror = () => reject(new Error('Erreur lecture fichier'));
    reader.readAsText(file);
  });
}

/**
 * Coefficients d'exposition des panneaux solaires
 * Impact sur la production selon l'orientation
 */
export const coefficientsExposition = {
  'sud': { nom: 'Sud (optimal)', coefficient: 1.0, description: 'Meilleure orientation' },
  'sud-est': { nom: 'Sud-Est', coefficient: 0.95, description: 'Très bon' },
  'sud-ouest': { nom: 'Sud-Ouest', coefficient: 0.95, description: 'Très bon' },
  'est': { nom: 'Est', coefficient: 0.85, description: 'Bon le matin' },
  'ouest': { nom: 'Ouest', coefficient: 0.85, description: 'Bon l\'après-midi' },
  'sud-sud-est': { nom: 'Sud-Sud-Est', coefficient: 0.98, description: 'Excellent' },
  'sud-sud-ouest': { nom: 'Sud-Sud-Ouest', coefficient: 0.98, description: 'Excellent' },
  'est-sud-est': { nom: 'Est-Sud-Est', coefficient: 0.90, description: 'Très bon' },
  'ouest-sud-ouest': { nom: 'Ouest-Sud-Ouest', coefficient: 0.90, description: 'Très bon' },
  'nord-est': { nom: 'Nord-Est', coefficient: 0.60, description: 'Peu recommandé' },
  'nord-ouest': { nom: 'Nord-Ouest', coefficient: 0.60, description: 'Peu recommandé' },
  'nord': { nom: 'Nord', coefficient: 0.50, description: 'Non recommandé' },
  'nord-nord-est': { nom: 'Nord-Nord-Est', coefficient: 0.55, description: 'Peu recommandé' },
  'nord-nord-ouest': { nom: 'Nord-Nord-Ouest', coefficient: 0.55, description: 'Peu recommandé' },
};

/**
 * Structure hiérarchique des localisations
 * Continent > Pays > Région > Département
 * Avec coefficients d'ensoleillement spécifiques
 */
export const localisationsHierarchiques = {
  'europe': {
    nom: 'Europe',
    pays: {
      'france': {
        nom: 'France',
        regions: {
          'auvergne-rhone-alpes': {
            nom: 'Auvergne-Rhône-Alpes',
            coefficient: 0.75,
            departements: {
              '01': { nom: 'Ain', coefficient: 0.74 },
              '03': { nom: 'Allier', coefficient: 0.73 },
              '07': { nom: 'Ardèche', coefficient: 0.78 },
              '15': { nom: 'Cantal', coefficient: 0.72 },
              '26': { nom: 'Drôme', coefficient: 0.80 },
              '38': { nom: 'Isère', coefficient: 0.75 },
              '42': { nom: 'Loire', coefficient: 0.74 },
              '43': { nom: 'Haute-Loire', coefficient: 0.76 },
              '63': { nom: 'Puy-de-Dôme', coefficient: 0.73 },
              '69': { nom: 'Rhône', coefficient: 0.74 },
              '73': { nom: 'Savoie', coefficient: 0.76 },
              '74': { nom: 'Haute-Savoie', coefficient: 0.75 },
            }
          },
          'bourgogne-franche-comte': {
            nom: 'Bourgogne-Franche-Comté',
            coefficient: 0.70,
            departements: {
              '21': { nom: 'Côte-d\'Or', coefficient: 0.71 },
              '25': { nom: 'Doubs', coefficient: 0.69 },
              '39': { nom: 'Jura', coefficient: 0.70 },
              '58': { nom: 'Nièvre', coefficient: 0.70 },
              '70': { nom: 'Haute-Saône', coefficient: 0.68 },
              '71': { nom: 'Saône-et-Loire', coefficient: 0.71 },
              '89': { nom: 'Yonne', coefficient: 0.70 },
              '90': { nom: 'Territoire de Belfort', coefficient: 0.69 },
            }
          },
          'bretagne': {
            nom: 'Bretagne',
            coefficient: 0.62,
            departements: {
              '22': { nom: 'Côtes-d\'Armor', coefficient: 0.60 },
              '29': { nom: 'Finistère', coefficient: 0.61 },
              '35': { nom: 'Ille-et-Vilaine', coefficient: 0.63 },
              '56': { nom: 'Morbihan', coefficient: 0.64 },
            }
          },
          'centre-val-de-loire': {
            nom: 'Centre-Val de Loire',
            coefficient: 0.68,
            departements: {
              '18': { nom: 'Cher', coefficient: 0.68 },
              '28': { nom: 'Eure-et-Loir', coefficient: 0.67 },
              '36': { nom: 'Indre', coefficient: 0.69 },
              '37': { nom: 'Indre-et-Loire', coefficient: 0.69 },
              '41': { nom: 'Loir-et-Cher', coefficient: 0.68 },
              '45': { nom: 'Loiret', coefficient: 0.68 },
            }
          },
          'corse': {
            nom: 'Corse',
            coefficient: 0.85,
            departements: {
              '2a': { nom: 'Corse-du-Sud', coefficient: 0.86 },
              '2b': { nom: 'Haute-Corse', coefficient: 0.84 },
            }
          },
          'grand-est': {
            nom: 'Grand Est',
            coefficient: 0.68,
            departements: {
              '08': { nom: 'Ardennes', coefficient: 0.65 },
              '10': { nom: 'Aube', coefficient: 0.68 },
              '51': { nom: 'Marne', coefficient: 0.67 },
              '52': { nom: 'Haute-Marne', coefficient: 0.68 },
              '54': { nom: 'Meurthe-et-Moselle', coefficient: 0.66 },
              '55': { nom: 'Meuse', coefficient: 0.66 },
              '57': { nom: 'Moselle', coefficient: 0.65 },
              '67': { nom: 'Bas-Rhin', coefficient: 0.67 },
              '68': { nom: 'Haut-Rhin', coefficient: 0.69 },
              '88': { nom: 'Vosges', coefficient: 0.67 },
            }
          },
          'hauts-de-france': {
            nom: 'Hauts-de-France',
            coefficient: 0.60,
            departements: {
              '02': { nom: 'Aisne', coefficient: 0.61 },
              '59': { nom: 'Nord', coefficient: 0.58 },
              '60': { nom: 'Oise', coefficient: 0.61 },
              '62': { nom: 'Pas-de-Calais', coefficient: 0.59 },
              '80': { nom: 'Somme', coefficient: 0.60 },
            }
          },
          'ile-de-france': {
            nom: 'Île-de-France',
            coefficient: 0.65,
            departements: {
              '75': { nom: 'Paris', coefficient: 0.65 },
              '77': { nom: 'Seine-et-Marne', coefficient: 0.66 },
              '78': { nom: 'Yvelines', coefficient: 0.65 },
              '91': { nom: 'Essonne', coefficient: 0.66 },
              '92': { nom: 'Hauts-de-Seine', coefficient: 0.65 },
              '93': { nom: 'Seine-Saint-Denis', coefficient: 0.65 },
              '94': { nom: 'Val-de-Marne', coefficient: 0.65 },
              '95': { nom: 'Val-d\'Oise', coefficient: 0.64 },
            }
          },
          'normandie': {
            nom: 'Normandie',
            coefficient: 0.62,
            departements: {
              '14': { nom: 'Calvados', coefficient: 0.62 },
              '27': { nom: 'Eure', coefficient: 0.63 },
              '50': { nom: 'Manche', coefficient: 0.61 },
              '61': { nom: 'Orne', coefficient: 0.63 },
              '76': { nom: 'Seine-Maritime', coefficient: 0.60 },
            }
          },
          'nouvelle-aquitaine': {
            nom: 'Nouvelle-Aquitaine',
            coefficient: 0.75,
            departements: {
              '16': { nom: 'Charente', coefficient: 0.74 },
              '17': { nom: 'Charente-Maritime', coefficient: 0.76 },
              '19': { nom: 'Corrèze', coefficient: 0.72 },
              '23': { nom: 'Creuse', coefficient: 0.71 },
              '24': { nom: 'Dordogne', coefficient: 0.74 },
              '33': { nom: 'Gironde', coefficient: 0.75 },
              '40': { nom: 'Landes', coefficient: 0.76 },
              '47': { nom: 'Lot-et-Garonne', coefficient: 0.76 },
              '64': { nom: 'Pyrénées-Atlantiques', coefficient: 0.74 },
              '79': { nom: 'Deux-Sèvres', coefficient: 0.73 },
              '86': { nom: 'Vienne', coefficient: 0.73 },
              '87': { nom: 'Haute-Vienne', coefficient: 0.72 },
            }
          },
          'occitanie': {
            nom: 'Occitanie',
            coefficient: 0.80,
            departements: {
              '09': { nom: 'Ariège', coefficient: 0.78 },
              '11': { nom: 'Aude', coefficient: 0.82 },
              '12': { nom: 'Aveyron', coefficient: 0.77 },
              '30': { nom: 'Gard', coefficient: 0.83 },
              '31': { nom: 'Haute-Garonne', coefficient: 0.79 },
              '32': { nom: 'Gers', coefficient: 0.78 },
              '34': { nom: 'Hérault', coefficient: 0.84 },
              '46': { nom: 'Lot', coefficient: 0.77 },
              '48': { nom: 'Lozère', coefficient: 0.79 },
              '65': { nom: 'Hautes-Pyrénées', coefficient: 0.77 },
              '66': { nom: 'Pyrénées-Orientales', coefficient: 0.85 },
              '81': { nom: 'Tarn', coefficient: 0.78 },
              '82': { nom: 'Tarn-et-Garonne', coefficient: 0.79 },
            }
          },
          'pays-de-la-loire': {
            nom: 'Pays de la Loire',
            coefficient: 0.68,
            departements: {
              '44': { nom: 'Loire-Atlantique', coefficient: 0.67 },
              '49': { nom: 'Maine-et-Loire', coefficient: 0.69 },
              '53': { nom: 'Mayenne', coefficient: 0.66 },
              '72': { nom: 'Sarthe', coefficient: 0.68 },
              '85': { nom: 'Vendée', coefficient: 0.70 },
            }
          },
          'provence-alpes-cote-dazur': {
            nom: 'Provence-Alpes-Côte d\'Azur',
            coefficient: 0.85,
            departements: {
              '04': { nom: 'Alpes-de-Haute-Provence', coefficient: 0.84 },
              '05': { nom: 'Hautes-Alpes', coefficient: 0.83 },
              '06': { nom: 'Alpes-Maritimes', coefficient: 0.86 },
              '13': { nom: 'Bouches-du-Rhône', coefficient: 0.87 },
              '83': { nom: 'Var', coefficient: 0.86 },
              '84': { nom: 'Vaucluse', coefficient: 0.85 },
            }
          },
        }
      },
      'belgique': {
        nom: 'Belgique',
        regions: {
          'bruxelles': { nom: 'Bruxelles-Capitale', coefficient: 0.58, departements: {} },
          'flandre': { nom: 'Flandre', coefficient: 0.57, departements: {} },
          'wallonie': { nom: 'Wallonie', coefficient: 0.56, departements: {} },
        }
      },
      'suisse': {
        nom: 'Suisse',
        regions: {
          'geneve': { nom: 'Genève', coefficient: 0.68, departements: {} },
          'vaud': { nom: 'Vaud', coefficient: 0.67, departements: {} },
          'valais': { nom: 'Valais', coefficient: 0.72, departements: {} },
          'zurich': { nom: 'Zurich', coefficient: 0.65, departements: {} },
          'berne': { nom: 'Berne', coefficient: 0.66, departements: {} },
        }
      },
      'espagne': {
        nom: 'Espagne',
        regions: {
          'andalousie': { nom: 'Andalousie', coefficient: 0.90, departements: {} },
          'catalogne': { nom: 'Catalogne', coefficient: 0.85, departements: {} },
          'valencia': { nom: 'Communauté valencienne', coefficient: 0.88, departements: {} },
          'madrid': { nom: 'Communauté de Madrid', coefficient: 0.83, departements: {} },
          'castille-leon': { nom: 'Castille-et-León', coefficient: 0.82, departements: {} },
        }
      },
      'portugal': {
        nom: 'Portugal',
        regions: {
          'lisbonne': { nom: 'Région de Lisbonne', coefficient: 0.87, departements: {} },
          'algarve': { nom: 'Algarve', coefficient: 0.92, departements: {} },
          'porto': { nom: 'Région de Porto', coefficient: 0.82, departements: {} },
        }
      },
      'italie': {
        nom: 'Italie',
        regions: {
          'lombardie': { nom: 'Lombardie', coefficient: 0.73, departements: {} },
          'toscane': { nom: 'Toscane', coefficient: 0.80, departements: {} },
          'sicile': { nom: 'Sicile', coefficient: 0.88, departements: {} },
          'sardaigne': { nom: 'Sardaigne', coefficient: 0.87, departements: {} },
          'lazio': { nom: 'Latium', coefficient: 0.82, departements: {} },
        }
      },
      'allemagne': {
        nom: 'Allemagne',
        regions: {
          'baviere': { nom: 'Bavière', coefficient: 0.68, departements: {} },
          'bade-wurtemberg': { nom: 'Bade-Wurtemberg', coefficient: 0.67, departements: {} },
          'rheinland-pfalz': { nom: 'Rhénanie-Palatinat', coefficient: 0.66, departements: {} },
        }
      },
    }
  },
  'afrique': {
    nom: 'Afrique',
    pays: {
      'maroc': {
        nom: 'Maroc',
        regions: {
          'casablanca': { nom: 'Casablanca-Settat', coefficient: 0.90, departements: {} },
          'marrakech': { nom: 'Marrakech-Safi', coefficient: 0.92, departements: {} },
          'rabat': { nom: 'Rabat-Salé-Kénitra', coefficient: 0.89, departements: {} },
        }
      },
      'algerie': {
        nom: 'Algérie',
        regions: {
          'alger': { nom: 'Alger', coefficient: 0.88, departements: {} },
          'oran': { nom: 'Oran', coefficient: 0.90, departements: {} },
          'constantine': { nom: 'Constantine', coefficient: 0.87, departements: {} },
        }
      },
      'tunisie': {
        nom: 'Tunisie',
        regions: {
          'tunis': { nom: 'Tunis', coefficient: 0.89, departements: {} },
          'sfax': { nom: 'Sfax', coefficient: 0.91, departements: {} },
          'sousse': { nom: 'Sousse', coefficient: 0.90, departements: {} },
        }
      },
    }
  },
  'amerique-nord': {
    nom: 'Amérique du Nord',
    pays: {
      'canada': {
        nom: 'Canada',
        regions: {
          'quebec': { nom: 'Québec', coefficient: 0.62, departements: {} },
          'ontario': { nom: 'Ontario', coefficient: 0.64, departements: {} },
          'colombie-britannique': { nom: 'Colombie-Britannique', coefficient: 0.58, departements: {} },
        }
      },
    }
  },
};

/**
 * Récupère le coefficient d'ensoleillement pour une localisation
 */
export function getCoefficientLocalisation(continent, pays, region, departement = null) {
  try {
    const loc = localisationsHierarchiques[continent]?.pays[pays]?.regions[region];
    if (!loc) return 0.7; // Valeur par défaut

    // Si un département est spécifié et existe, utiliser son coefficient
    if (departement && loc.departements && loc.departements[departement]) {
      return loc.departements[departement].coefficient;
    }

    // Sinon utiliser le coefficient de la région
    return loc.coefficient;
  } catch (error) {
    return 0.7; // Valeur par défaut en cas d'erreur
  }
}

/**
 * Récupère la liste des pays d'un continent
 */
export function getPaysDuContinent(continent) {
  return localisationsHierarchiques[continent]?.pays || {};
}

/**
 * Récupère la liste des régions d'un pays
 */
export function getRegionsDuPays(continent, pays) {
  return localisationsHierarchiques[continent]?.pays[pays]?.regions || {};
}

/**
 * Récupère la liste des départements d'une région
 */
export function getDepartementsDeLaRegion(continent, pays, region) {
  return localisationsHierarchiques[continent]?.pays[pays]?.regions[region]?.departements || {};
}
