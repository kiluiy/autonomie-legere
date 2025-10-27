import { useState, useEffect } from 'react';
import './App.css';
import {
  calculerConsommationJournaliere,
  dimensionnerPanneaux,
  dimensionnerBatterie,
  dimensionnerOnduleur,
  dimensionnerCables,
  dimensionnerRegulateur,
  genererListeMateriel
} from './modules/energie/solaire/calculateur';
import { profilsHabitat, appareilsTypes } from './data/appareils-types';
import {
  sauvegarderProjet,
  chargerTousProjets,
  creerNouveauProjet,
  definirProjetActuel,
  getProjetActuel,
  localisationsHierarchiques,
  coefficientsExposition,
  getCoefficientLocalisation,
  getPaysDuContinent,
  getRegionsDuPays,
  getDepartementsDeLaRegion,
  exporterProjetJSON
} from './utils/storage';
import { rechercherEtOptimiser, SITES_MARCHANDS } from './utils/rechercherProduits';
import { getApiStatus, getInstallationGuide } from './utils/apiIntegrations';

function App() {
  const [projetActuel, setProjetActuel] = useState(null);
  const [appareils, setAppareils] = useState([]);
  const [resultats, setResultats] = useState(null);
  const [ongletActif, setOngletActif] = useState('appareils'); // 'appareils', 'resultats', 'materiel'
  const [rechercheEnCours, setRechercheEnCours] = useState(false);
  const [progressRecherche, setProgressRecherche] = useState(null);
  const [resultatsRecherche, setResultatsRecherche] = useState(null);
  const [parametres, setParametres] = useState({
    continent: 'europe',
    pays: 'france',
    region: 'provence-alpes-cote-dazur',
    departement: null,
    coefficientEnsoleillement: 0.85,
    exposition: 'sud',
    coefficientExposition: 1.0,
    joursAutonomie: 2,
    tensionBatterie: 24,
    typeBatterie: 'plomb',
  });

  // Charger projet au démarrage
  useEffect(() => {
    const projet = getProjetActuel();
    if (projet) {
      setProjetActuel(projet);
      setAppareils(projet.appareils || []);
      setParametres(projet.parametres || parametres);
      if (projet.resultats) {
        setResultats(projet.resultats);
      }
    } else {
      // Créer un projet par défaut
      const nouveauProjet = creerNouveauProjet('Mon Installation Solaire');
      setProjetActuel(nouveauProjet);
      definirProjetActuel(nouveauProjet.id);
    }
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    if (projetActuel) {
      const projetMisAJour = {
        ...projetActuel,
        appareils,
        parametres,
        resultats,
      };
      sauvegarderProjet(projetMisAJour);
    }
  }, [appareils, parametres, resultats]);

  const ajouterAppareil = (appareil) => {
    setAppareils([...appareils, { ...appareil, id: Date.now() }]);
  };

  const supprimerAppareil = (id) => {
    setAppareils(appareils.filter(a => a.id !== id));
  };

  const modifierAppareil = (id, champ, valeur) => {
    setAppareils(appareils.map(a =>
      a.id === id ? { ...a, [champ]: parseFloat(valeur) || 0 } : a
    ));
  };

  const chargerProfil = (profil) => {
    const appareilsProfil = profilsHabitat[profil].appareils.map((app, index) => ({
      ...app,
      id: Date.now() + index,
    }));
    setAppareils(appareilsProfil);
  };

  const calculer = () => {
    if (appareils.length === 0) {
      alert('Ajoutez au moins un appareil');
      return;
    }

    const consommation = calculerConsommationJournaliere(appareils);
    const panneaux = dimensionnerPanneaux(
      consommation,
      parametres.coefficientEnsoleillement,
      parametres.coefficientExposition
    );
    const batterie = dimensionnerBatterie(
      consommation,
      parametres.joursAutonomie,
      parametres.typeBatterie === 'lithium' ? 0.8 : 0.5,
      parametres.tensionBatterie
    );
    const onduleur = dimensionnerOnduleur(appareils);
    const regulateur = dimensionnerRegulateur(
      panneaux.puissanceTotaleInstallee,
      parametres.tensionBatterie
    );

    // Câbles : panneaux et batterie
    const cablesPanneaux = dimensionnerCables(
      panneaux.puissanceTotaleInstallee,
      parametres.tensionBatterie,
      10 // 10m par défaut
    );
    const cablesBatterie = dimensionnerCables(
      onduleur.puissanceNominale,
      parametres.tensionBatterie,
      2 // 2m par défaut
    );

    const dimensions = {
      panneaux,
      batterie,
      onduleur,
      regulateur,
      cables: {
        panneaux: cablesPanneaux,
        batterie: cablesBatterie,
      }
    };

    const materiel = genererListeMateriel(dimensions);

    const resultatsCalcul = {
      consommationJournaliere: consommation,
      dimensions,
      materiel,
    };

    setResultats(resultatsCalcul);
    setOngletActif('resultats');
  };

  const exporterProjet = () => {
    if (projetActuel) {
      exporterProjetJSON({
        ...projetActuel,
        appareils,
        parametres,
        resultats,
      });
    }
  };

  const rechercherPrix = async () => {
    if (!resultats || !resultats.materiel) return;

    setRechercheEnCours(true);
    setResultatsRecherche(null);

    try {
      const resultatsOptimises = await rechercherEtOptimiser(
        resultats.materiel,
        (progress) => {
          setProgressRecherche(progress);
        }
      );

      setResultatsRecherche(resultatsOptimises);
      setProgressRecherche(null);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setProgressRecherche({ etape: 'erreur', message: 'Erreur lors de la recherche des prix' });
    } finally {
      setRechercheEnCours(false);
    }
  };

  const supprimerArticleMateriel = (categorieIndex, itemIndex) => {
    const nouveauMateriel = resultats.materiel.map((categorie, catIdx) => {
      if (catIdx === categorieIndex) {
        return {
          ...categorie,
          items: categorie.items.filter((_, itemIdx) => itemIdx !== itemIndex)
        };
      }
      return categorie;
    }).filter(categorie => categorie.items.length > 0); // Supprimer les catégories vides

    setResultats({
      ...resultats,
      materiel: nouveauMateriel
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ Autonomie Légère</h1>
        <p className="subtitle">Calculateur d'installation solaire <span style={{fontSize: '0.75em', color: '#10b981', marginLeft: '1rem'}}>v1.0 🚀</span></p>
      </header>

      <nav className="tabs">
        <button
          className={ongletActif === 'appareils' ? 'active' : ''}
          onClick={() => setOngletActif('appareils')}
        >
          1. Appareils
        </button>
        <button
          className={ongletActif === 'parametres' ? 'active' : ''}
          onClick={() => setOngletActif('parametres')}
        >
          2. Paramètres
        </button>
        <button
          className={ongletActif === 'resultats' ? 'active' : ''}
          onClick={() => setOngletActif('resultats')}
          disabled={!resultats}
        >
          3. Résultats
        </button>
        <button
          className={ongletActif === 'materiel' ? 'active' : ''}
          onClick={() => setOngletActif('materiel')}
          disabled={!resultats}
        >
          4. Liste matériel
        </button>
      </nav>

      <main className="main">
        {ongletActif === 'appareils' && (
          <AppareilsSection
            appareils={appareils}
            ajouterAppareil={ajouterAppareil}
            supprimerAppareil={supprimerAppareil}
            modifierAppareil={modifierAppareil}
            chargerProfil={chargerProfil}
          />
        )}

        {ongletActif === 'parametres' && (
          <ParametresSection
            parametres={parametres}
            setParametres={setParametres}
            calculer={calculer}
          />
        )}

        {ongletActif === 'resultats' && resultats && (
          <ResultatsSection resultats={resultats} />
        )}

        {ongletActif === 'materiel' && resultats && (
          <MaterielSection
            materiel={resultats.materiel}
            exporterProjet={exporterProjet}
            rechercherPrix={rechercherPrix}
            rechercheEnCours={rechercheEnCours}
            progressRecherche={progressRecherche}
            resultatsRecherche={resultatsRecherche}
            supprimerArticle={supprimerArticleMateriel}
          />
        )}
      </main>

      <footer className="footer">
        <p>Module Énergie Solaire • Prochainement : Eau, Alimentation, Chauffage...</p>
      </footer>
    </div>
  );
}

// Composant Section Appareils
function AppareilsSection({ appareils, ajouterAppareil, supprimerAppareil, modifierAppareil, chargerProfil }) {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('cuisine');
  const [appareilSelectionne, setAppareilSelectionne] = useState(null);

  const consommationTotale = calculerConsommationJournaliere(appareils);

  const handleAjouterDepuisBase = () => {
    if (appareilSelectionne) {
      ajouterAppareil(appareilSelectionne);
    }
  };

  const handleAjouterPersonnalise = () => {
    const nom = prompt('Nom de l\'appareil :');
    if (!nom) return;
    const puissance = parseFloat(prompt('Puissance (W) :'));
    const heures = parseFloat(prompt('Heures d\'utilisation par jour :'));
    if (puissance && heures) {
      ajouterAppareil({ nom, puissance, heuresUtilisation: heures });
    }
  };

  return (
    <div className="section">
      <h2>Vos appareils électriques</h2>

      <div className="profils">
        <h3>Profils prédéfinis</h3>
        <div className="profils-buttons">
          {Object.entries(profilsHabitat).map(([key, profil]) => (
            <button key={key} onClick={() => chargerProfil(key)} className="btn-secondary">
              {profil.nom}
            </button>
          ))}
        </div>
      </div>

      <div className="ajouter-appareil">
        <h3>Ajouter un appareil</h3>
        <div className="ajout-controls">
          <select
            value={categorieSelectionnee}
            onChange={(e) => setCategorieSelectionnee(e.target.value)}
          >
            {Object.keys(appareilsTypes).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select onChange={(e) => {
            const appareil = appareilsTypes[categorieSelectionnee][e.target.selectedIndex - 1];
            setAppareilSelectionne(appareil);
          }}>
            <option>Choisir un appareil...</option>
            {appareilsTypes[categorieSelectionnee].map((app, idx) => (
              <option key={idx}>{app.nom} ({app.puissance}W)</option>
            ))}
          </select>
          <button onClick={handleAjouterDepuisBase} className="btn-primary">Ajouter</button>
          <button onClick={handleAjouterPersonnalise} className="btn-secondary">+ Personnalisé</button>
        </div>
      </div>

      <div className="liste-appareils">
        <h3>Liste ({appareils.length} appareil{appareils.length > 1 ? 's' : ''})</h3>
        {appareils.length === 0 ? (
          <p className="vide">Aucun appareil ajouté</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Appareil</th>
                <th>Puissance (W)</th>
                <th>Heures/jour</th>
                <th>Conso/jour (Wh)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appareils.map(app => (
                <tr key={app.id}>
                  <td>{app.nom}</td>
                  <td>
                    <input
                      type="number"
                      value={app.puissance}
                      onChange={(e) => modifierAppareil(app.id, 'puissance', e.target.value)}
                      className="input-small"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.1"
                      value={app.heuresUtilisation}
                      onChange={(e) => modifierAppareil(app.id, 'heuresUtilisation', e.target.value)}
                      className="input-small"
                    />
                  </td>
                  <td>{Math.round(app.puissance * app.heuresUtilisation)} Wh</td>
                  <td>
                    <button onClick={() => supprimerAppareil(app.id)} className="btn-danger">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="total">
        <h3>Consommation totale : {Math.round(consommationTotale)} Wh/jour ({(consommationTotale / 1000).toFixed(2)} kWh/jour)</h3>
      </div>
    </div>
  );
}

// Composant Section Paramètres
function ParametresSection({ parametres, setParametres, calculer }) {
  // Récupérer les listes selon la sélection actuelle
  const continents = Object.keys(localisationsHierarchiques);
  const pays = getPaysDuContinent(parametres.continent) || {};
  const regions = getRegionsDuPays(parametres.continent, parametres.pays) || {};
  const departements = getDepartementsDeLaRegion(parametres.continent, parametres.pays, parametres.region) || {};
  const hasDepartements = Object.keys(departements).length > 0;

  // Mettre à jour le coefficient lors du changement de localisation
  const handleLocalisationChange = (field, value) => {
    let newParams = { ...parametres, [field]: value };

    // Réinitialiser les champs enfants si changement parent
    if (field === 'continent') {
      const newPays = Object.keys(localisationsHierarchiques[value]?.pays || {})[0];
      newParams.pays = newPays;
      const newRegions = getRegionsDuPays(value, newPays);
      newParams.region = Object.keys(newRegions)[0];
      newParams.departement = null;
    } else if (field === 'pays') {
      const newRegions = getRegionsDuPays(parametres.continent, value);
      newParams.region = Object.keys(newRegions)[0];
      newParams.departement = null;
    } else if (field === 'region') {
      newParams.departement = null;
    }

    // Mettre à jour le coefficient d'ensoleillement
    const coeff = getCoefficientLocalisation(
      newParams.continent,
      newParams.pays,
      newParams.region,
      newParams.departement
    );
    newParams.coefficientEnsoleillement = coeff;

    setParametres(newParams);
  };

  // Mettre à jour l'exposition
  const handleExpositionChange = (exposition) => {
    const coeffExp = coefficientsExposition[exposition]?.coefficient || 1.0;
    setParametres({
      ...parametres,
      exposition,
      coefficientExposition: coeffExp
    });
  };

  return (
    <div className="section">
      <h2>Paramètres de votre installation</h2>

      <h3>Localisation</h3>
      <div className="parametres-grid">
        <div className="param-group">
          <label>Continent</label>
          <select
            value={parametres.continent}
            onChange={(e) => handleLocalisationChange('continent', e.target.value)}
          >
            {continents.map(cont => (
              <option key={cont} value={cont}>
                {localisationsHierarchiques[cont].nom}
              </option>
            ))}
          </select>
        </div>

        <div className="param-group">
          <label>Pays</label>
          <select
            value={parametres.pays}
            onChange={(e) => handleLocalisationChange('pays', e.target.value)}
          >
            {Object.entries(pays).map(([key, p]) => (
              <option key={key} value={key}>{p.nom}</option>
            ))}
          </select>
        </div>

        <div className="param-group">
          <label>Région</label>
          <select
            value={parametres.region}
            onChange={(e) => handleLocalisationChange('region', e.target.value)}
          >
            {Object.entries(regions).map(([key, r]) => (
              <option key={key} value={key}>{r?.nom || key}</option>
            ))}
          </select>
          <small>Coefficient d'ensoleillement : {parametres.coefficientEnsoleillement?.toFixed(2) || 'N/A'}</small>
        </div>

        {hasDepartements && (
          <div className="param-group">
            <label>Département (optionnel)</label>
            <select
              value={parametres.departement || ''}
              onChange={(e) => handleLocalisationChange('departement', e.target.value || null)}
            >
              <option value="">Utiliser coefficient régional</option>
              {Object.entries(departements).map(([key, d]) => (
                <option key={key} value={key}>
                  {key.toUpperCase()} - {d.nom}
                </option>
              ))}
            </select>
            <small>Affine le coefficient d'ensoleillement</small>
          </div>
        )}
      </div>

      <h3>Exposition des panneaux</h3>
      <div className="parametres-grid">
        <div className="param-group">
          <label>Orientation</label>
          <select
            value={parametres.exposition}
            onChange={(e) => handleExpositionChange(e.target.value)}
          >
            {Object.entries(coefficientsExposition).map(([key, exp]) => (
              <option key={key} value={key}>
                {exp.nom} - {exp.description}
              </option>
            ))}
          </select>
          <small>
            Coefficient : {parametres.coefficientExposition.toFixed(2)}
            {parametres.coefficientExposition < 0.8 && ' ⚠️ Orientation non optimale'}
          </small>
        </div>
      </div>

      <h3>Système électrique</h3>
      <div className="parametres-grid">
        <div className="param-group">
          <label>Jours d'autonomie</label>
          <input
            type="number"
            value={parametres.joursAutonomie}
            onChange={(e) => setParametres({ ...parametres, joursAutonomie: parseInt(e.target.value) })}
            min="1"
            max="7"
          />
          <small>Jours sans soleil à prévoir</small>
        </div>

        <div className="param-group">
          <label>Tension batterie</label>
          <select
            value={parametres.tensionBatterie}
            onChange={(e) => setParametres({ ...parametres, tensionBatterie: parseInt(e.target.value) })}
          >
            <option value="12">12V (petites installations)</option>
            <option value="24">24V (recommandé)</option>
            <option value="48">48V (grosses installations)</option>
          </select>
        </div>

        <div className="param-group">
          <label>Type de batterie</label>
          <select
            value={parametres.typeBatterie}
            onChange={(e) => setParametres({ ...parametres, typeBatterie: e.target.value })}
          >
            <option value="plomb">Plomb (AGM/GEL) - Économique</option>
            <option value="lithium">Lithium (LiFePO4) - Performant</option>
          </select>
        </div>
      </div>

      <div className="info-box" style={{marginTop: '2rem', marginBottom: '1rem'}}>
        <h4>Récapitulatif</h4>
        <p><strong>Localisation :</strong> {localisationsHierarchiques[parametres.continent]?.pays[parametres.pays]?.regions[parametres.region]?.nom || 'Non définie'}</p>
        <p><strong>Ensoleillement :</strong> Coefficient {parametres.coefficientEnsoleillement?.toFixed(2) || 'N/A'}</p>
        <p><strong>Exposition :</strong> {coefficientsExposition[parametres.exposition]?.nom || 'Non définie'} (×{parametres.coefficientExposition?.toFixed(2) || 'N/A'})</p>
        <p><strong>Rendement total :</strong> {((parametres.coefficientEnsoleillement || 0) * (parametres.coefficientExposition || 0) * 100).toFixed(0)}% de production optimale</p>
      </div>

      <button onClick={calculer} className="btn-primary btn-large">
        Calculer mon installation
      </button>
    </div>
  );
}

// Composant Section Résultats
function ResultatsSection({ resultats }) {
  const { consommationJournaliere, dimensions } = resultats;

  return (
    <div className="section">
      <h2>Résultats du dimensionnement</h2>

      <div className="resultats-grid">
        <div className="resultat-card">
          <h3>⚡ Consommation</h3>
          <p className="big-number">{Math.round(consommationJournaliere)} Wh/jour</p>
          <p className="small">{(consommationJournaliere / 1000).toFixed(2)} kWh/jour</p>
        </div>

        <div className="resultat-card">
          <h3>☀️ Panneaux Solaires</h3>
          <p className="big-number">{dimensions.panneaux.puissanceCrete} Wc</p>
          <p className="small">Puissance crête nécessaire</p>
          <div className="options-panneaux">
            <p className="small" style={{marginTop: '1rem', fontWeight: '600', color: '#10b981'}}>
              ✓ Recommandé : {dimensions.panneaux.recommandation.nombre} × {dimensions.panneaux.recommandation.puissancePanneau}W = {dimensions.panneaux.recommandation.puissanceTotale}W
            </p>
          </div>
        </div>

        <div className="resultat-card">
          <h3>🔋 Batterie</h3>
          <p className="big-number">{dimensions.batterie.capaciteAh} Ah</p>
          <p className="small">{dimensions.batterie.tensionBatterie}V ({dimensions.batterie.capaciteWh} Wh)</p>
          <p className="small">{dimensions.batterie.typeBatterieRecommande}</p>
        </div>

        <div className="resultat-card">
          <h3>⚙️ Onduleur</h3>
          <p className="big-number">{dimensions.onduleur.puissanceRecommandee} W</p>
          <p className="small">Pic : {dimensions.onduleur.puissancePic}W</p>
          <p className="small">{dimensions.onduleur.type}</p>
        </div>

        <div className="resultat-card">
          <h3>🔌 Régulateur</h3>
          <p className="big-number">{dimensions.regulateur.intensiteRecommandee} A</p>
          <p className="small">{dimensions.regulateur.typeRecommande}</p>
          <p className="small">{dimensions.regulateur.tension}V</p>
        </div>

        <div className="resultat-card">
          <h3>🔧 Câbles</h3>
          <p className="big-number">{dimensions.cables.panneaux.sectionRecommandee} mm²</p>
          <p className="small">Panneaux : {dimensions.cables.panneaux.intensite}A</p>
          <p className="small">Batterie : {dimensions.cables.batterie.sectionRecommandee} mm²</p>
        </div>
      </div>

      {/* Options de panneaux disponibles */}
      <div className="section options-panneaux-detail">
        <h3>Options de panneaux solaires disponibles</h3>
        <table>
          <thead>
            <tr>
              <th>Puissance panneau</th>
              <th>Nombre</th>
              <th>Puissance totale</th>
              <th>Sur-dimensionnement</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.panneaux.options.map((option, idx) => (
              <tr key={idx} className={option.puissancePanneau === dimensions.panneaux.recommandation.puissancePanneau ? 'recommandee' : ''}>
                <td>{option.puissancePanneau}W</td>
                <td>{option.nombre} panneau{option.nombre > 1 ? 'x' : ''}</td>
                <td>{option.puissanceTotale}W</td>
                <td>{option.surDimensionnement}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Composant Section Matériel
function MaterielSection({ materiel, exporterProjet, rechercherPrix, rechercheEnCours, progressRecherche, resultatsRecherche, supprimerArticle }) {
  // Générer URL de recherche pour un article
  const genererUrlRecherche = (nomArticle, specification) => {
    const termes = `${nomArticle} ${specification || ''}`.trim();
    const recherche = encodeURIComponent(termes);

    // Par défaut, recherche sur Google Shopping
    return `https://www.google.com/search?q=${recherche}&tbm=shop`;
  };

  // Générer URL de recherche spécifique au site marchand
  const genererUrlRechercheSite = (nomArticle, specification, siteId, siteUrl) => {
    const termes = `${nomArticle} ${specification || ''}`.trim();
    const recherche = encodeURIComponent(termes);

    // Construire l'URL selon le site
    switch(siteId) {
      case 'myshop-solaire':
        return `${siteUrl}/recherche?q=${recherche}`;
      case 'alma-solar':
        return `${siteUrl}/recherche?s=${recherche}`;
      case 'solaris-store':
        return `${siteUrl}/search?query=${recherche}`;
      case 'amazon':
        return `https://www.amazon.fr/s?k=${recherche}`;
      default:
        // Si URL inconnue, faire une recherche Google sur ce site
        return `https://www.google.com/search?q=${recherche}+site:${siteUrl.replace('https://', '').replace('http://', '')}`;
    }
  };

  const apiStatus = getApiStatus();

  return (
    <div className="section">
      <h2>Liste du matériel nécessaire</h2>

      {/* Indicateur du mode API */}
      <div className={`api-status-badge ${apiStatus.mode}`}>
        {apiStatus.mode === 'simulation' && (
          <>
            <span className="status-icon">⚠️</span>
            <span className="status-text">Mode Simulation</span>
            <button
              onClick={() => alert(getInstallationGuide())}
              className="btn-info-small"
              title="Comment activer les APIs réelles"
            >
              ℹ️ Activer les APIs réelles
            </button>
          </>
        )}
        {apiStatus.mode === 'hybrid' && (
          <>
            <span className="status-icon">✓</span>
            <span className="status-text">
              APIs activées :
              {apiStatus.amazon && ' Amazon'}
              {apiStatus.google && ' Google'}
            </span>
          </>
        )}
      </div>

      <div className="materiel-actions">
        <button onClick={rechercherPrix} className="btn-primary btn-large" disabled={rechercheEnCours}>
          {rechercheEnCours ? '🔍 Recherche en cours...' : '🛒 Trouver les meilleurs prix'}
        </button>
        <button onClick={exporterProjet} className="btn-secondary">
          Exporter en JSON
        </button>
        <button onClick={() => window.print()} className="btn-secondary">
          Imprimer
        </button>
      </div>

      {progressRecherche && (
        <div className="progress-box">
          <p>{progressRecherche.message}</p>
        </div>
      )}

      {materiel.map((categorie, idx) => (
        <div key={idx} className="categorie-materiel">
          <h3>{categorie.categorie}</h3>
          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Quantité</th>
                <th>Spécification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categorie.items.map((item, itemIdx) => (
                <tr key={itemIdx} className="article-row">
                  <td>
                    <a
                      href={genererUrlRecherche(item.nom, item.specification)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-link"
                      title="Rechercher cet article sur Google Shopping"
                    >
                      🔍 {item.nom}
                    </a>
                  </td>
                  <td>{item.quantite}</td>
                  <td>{item.specification}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Supprimer "${item.nom}" de la liste ?`)) {
                          supprimerArticle(idx, itemIdx);
                        }
                      }}
                      className="btn-danger btn-small"
                      title="Supprimer cet article"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {!resultatsRecherche && !rechercheEnCours && (
        <div className="info-box">
          <h4>🛒 Trouver les meilleurs prix</h4>
          <p>Cliquez sur le bouton ci-dessus pour rechercher automatiquement tous les articles sur plusieurs sites marchands et comparer les prix !</p>
          <p>Le système prendra en compte les frais de port pour vous proposer la meilleure combinaison.</p>
        </div>
      )}

      {resultatsRecherche && (
        <div className="resultats-recherche">
          <h2>🛒 Paniers optimisés</h2>

          <div className="resume-paniers">
            <div className="resume-card">
              <h4>Total articles</h4>
              <p className="big-number">{resultatsRecherche.optimisation.resume.totalArticles}€</p>
            </div>
            <div className="resume-card">
              <h4>Frais de port</h4>
              <p className="big-number">{resultatsRecherche.optimisation.resume.totalPort}€</p>
            </div>
            <div className="resume-card highlight">
              <h4>Total final</h4>
              <p className="big-number">{resultatsRecherche.optimisation.resume.totalGlobal}€</p>
              <p className="small">{resultatsRecherche.optimisation.resume.nombreSites} site{resultatsRecherche.optimisation.resume.nombreSites > 1 ? 's' : ''}</p>
            </div>
          </div>

          {resultatsRecherche.optimisation.paniers.map((panier, idx) => (
            <div key={idx} className="panier-site">
              <div className="panier-header">
                <h3>
                  <span className="site-numero">Site {idx + 1}</span>
                  {panier.site}
                </h3>
                <a href={panier.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Visiter le site →
                </a>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {panier.articles.map((article, artIdx) => (
                    <tr key={artIdx} className="article-row">
                      <td>
                        <a
                          href={article.urlProduit || genererUrlRechercheSite(article.nom, article.specification, panier.siteId, panier.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="article-link"
                          title={`Voir cet article sur ${panier.site}`}
                        >
                          🛒 <strong>{article.nom}</strong>
                        </a>
                        <br />
                        <small>{article.specification}</small>
                      </td>
                      <td>{article.quantite}</td>
                      <td>{article.prixUnitaire.toFixed(2)}€</td>
                      <td>{article.prixTotal.toFixed(2)}€</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Supprimer "${article.nom}" de ce panier ?`)) {
                              // Supprimer l'article du panier
                              const nouveauxPaniers = resultatsRecherche.optimisation.paniers.map((p, pIdx) => {
                                if (pIdx === idx) {
                                  const nouveauxArticles = p.articles.filter((_, aIdx) => aIdx !== artIdx);
                                  const nouveauSousTotal = nouveauxArticles.reduce((sum, a) => sum + a.prixTotal, 0);
                                  const site = SITES_MARCHANDS.find(s => s.id === p.siteId);
                                  const nouveauxFraisPort = nouveauSousTotal >= (site?.seuilPortGratuit || 0) ? 0 : (site?.fraisPortMin || 0);

                                  return {
                                    ...p,
                                    articles: nouveauxArticles,
                                    sousTotal: Math.round(nouveauSousTotal * 100) / 100,
                                    fraisPort: nouveauxFraisPort,
                                    total: Math.round((nouveauSousTotal + nouveauxFraisPort) * 100) / 100,
                                    portGratuit: nouveauxFraisPort === 0
                                  };
                                }
                                return p;
                              }).filter(p => p.articles.length > 0);

                              const nouveauResume = {
                                nombreSites: nouveauxPaniers.length,
                                totalArticles: Math.round(nouveauxPaniers.reduce((sum, p) => sum + p.sousTotal, 0) * 100) / 100,
                                totalPort: Math.round(nouveauxPaniers.reduce((sum, p) => sum + p.fraisPort, 0) * 100) / 100,
                                totalGlobal: Math.round(nouveauxPaniers.reduce((sum, p) => sum + p.total, 0) * 100) / 100
                              };

                              setResultatsRecherche({
                                ...resultatsRecherche,
                                optimisation: {
                                  paniers: nouveauxPaniers,
                                  resume: nouveauResume
                                }
                              });
                            }
                          }}
                          className="btn-danger btn-small"
                          title="Supprimer cet article"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3"><strong>Sous-total articles</strong></td>
                    <td><strong>{panier.sousTotal.toFixed(2)}€</strong></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <strong>Frais de port</strong>
                      {panier.portGratuit && <span className="badge-gratuit"> ✓ Gratuit</span>}
                      {!panier.portGratuit && panier.manquePourPortGratuit && (
                        <small style={{display: 'block', color: '#f59e0b'}}>
                          Encore {panier.manquePourPortGratuit}€ pour la livraison gratuite
                        </small>
                      )}
                    </td>
                    <td><strong>{panier.fraisPort.toFixed(2)}€</strong></td>
                    <td></td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="3"><strong>TOTAL</strong></td>
                    <td><strong>{panier.total.toFixed(2)}€</strong></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
