import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/car.css';  // Créez un fichier CarGrid.css pour définir les styles de votre grille
import '../assets/css/annonce.css'
import '../assets/css/carousel.css'
import '../assets/css/bigTitle.css';
import '../assets/js/SecondaireTitle'
import { FaHeart } from 'react-icons/fa';

// export default CarGrid;
 const DetailToutAnnonceUser = () => {
  // Select all voiture
  const [voiture, setvoiture] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const voitureData = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectAllVoiture`, {method: 'GET' });
        const voiture = await voitureData.json();
        setvoiture(voiture);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const idUtilisateur = sessionStorage.getItem('id');
  const [favoris, setFavoris] = useState([]);
  const [, setLoading] = useState(true);
  const [, setListFavoris] = useState([]);

  
    // Selecter les favoris by id_user
   
  
// Selecter les favoris by id_user
useEffect(() => {
  const fetchDataFavoris = async () => {
    try {
      const response = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/utilisateur/selectAllFavoris`, {
        method: 'GET', // ou 'POST' ou toute autre méthode selon vos besoins
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idUtilisateur}` // Utilisation d'un en-tête personnalisé, vous pouvez ajuster selon vos préférences
        }
      });   
      if (response.ok) {
        const favorisData = await response.json();
        setListFavoris(favorisData);
        setFavoris(favorisData.map(favori => favori.id_voiture));
      } else {
        console.error('Erreur lors de la récupération des données:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchDataFavoris();
}, [idUtilisateur]);
// Inserer le favoris 
const envoyerFavori = async (idVoiture) => {
  try {
    const url = `https://finalprojectcar-production-aab1.up.railway.app/api/utilisateur/insertFavoris?id_voiture=${idVoiture}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idUtilisateur}` // Utilisation d'un en-tête personnalisé, vous pouvez ajuster selon vos préférences
      },
    });

    if (response.ok) {
      console.log('Favori enregistré avec succès.');
      setFavoris([...favoris, idVoiture]);
    } else {
      console.error('Erreur lors de l\'enregistrement du favori:', response.status);
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du favori:', error);
  }
};
// Supprimer le favoris
const supprimerFavori = async (idVoiture) => {
  try {
    const url = `https://finalprojectcar-production-aab1.up.railway.app/api/utilisateur/deleteFavoris?id_voiture=${idVoiture}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idUtilisateur}` // Utilisation d'un en-tête personnalisé, vous pouvez ajuster selon vos préférences
      },
    });

    if (response.ok) {
      console.log('Favori supprimé avec succès.');
      setFavoris(favoris.filter(id => id !== idVoiture));
    } else {
      const responseData = await response.text();
      console.error('Erreur lors de suppression du favori:', responseData);
    }
  } catch (error) {
    console.error('Erreur lors de suppression du favori:', error);
  }
};
// Condition de couleur de favoris
const handleToggleFavori = async (idVoiture) => {
  try {
    if (!idVoiture) {
      console.error('ID de voiture non défini.');
      return;
    }

    if (favoris.includes(idVoiture)) {
      await supprimerFavori(idVoiture);
      console.log('Favori supprimé avec succès:' + idVoiture);
    } else {
      await envoyerFavori(idVoiture);
      console.log('Favori enregistré avec succès.');
    }
  } catch (error) {
    console.error('Erreur lors de la gestion du favori:', error);
  }
};


const [photo,setPhoto] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      // eslint-disable-next-line no-undef
      const photoData = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectAllPhotoVoiture`, {method: 'GET' });
      const photo = await photoData.json();
      setPhoto(photo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  fetchData();
}, []);
      return (
        <>
        <div id='sousTitre'>
            <div id='titre'>
                <div>Tout les annonces</div>
                <div id='trait'></div>
            </div>
            <div className='listannonce'>
                <div id="ListAnnonceContainer">
                    <div id="container">
                        {voiture.map((voitureData, index) => (
                            <div id='element' key={index}>
                              <FaHeart
                                onClick={() => handleToggleFavori(voitureData.idVoiture)} 
                                color={favoris.includes(voitureData.idVoiture) ? 'red' : 'gray'}
                              />
                                {photo
                                .filter(item => item.id_voiture === voitureData.idVoiture)
                                .slice(0, 1) // Prendre seulement le premier élément
                                .map((photoData, photoIndex) => (
                                  <img key={photoIndex} id='image' src={`${process.env.PUBLIC_URL}/images/${photoData.image_voiture}`} alt={photoData.image_voiture} />
                                ))}                                
                              <div id='caracteristique'>
                                <div id='caracteristique'>
                                      <div><label><b>{voitureData.nomMarque}</b></label></div> 
                                      <div><label>{new Date(voitureData.anneeCirculation).getFullYear().toString()} | 250 Km  | {voitureData.nomModele} | {voitureData.nomEnergie}</label></div>
                                      <div><label>{voitureData.prix.toLocaleString('fr-FR')}€</label></div>
                                  </div>
                                  <Link to={`/user/annonce/${voitureData.idVoiture}`} >
                                    <div id='divbouton'><button id='bouton'>Voir l'annonce </button></div>
                                  </Link>
                              </div>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
              
          </div>
        </>
    )
}
export default DetailToutAnnonceUser;
