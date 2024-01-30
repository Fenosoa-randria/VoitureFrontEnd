import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaHeart, FaBeer, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../assets/css/car.css';
import '../assets/css/annonce.css';
import '../assets/css/carousel.css';
import '../assets/css/bigTitle.css';
import '../assets/js/SecondaireTitle';
import voitures from '../assets/img/voitureAnnonce.jpg';

const CarGridIndex = () => {
  const [voiture, setVoiture] = useState([]);
  const idUtilisateur = sessionStorage.getItem('id');
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setListFavoris] = useState([]);
  const [photo,setPhoto] = useState([]);

  
  // Selecter toute les voiture existant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectAllVoiture`, {
          method: 'GET',
          credentials: 'include'
        });
  
        const voitureData = await response.json(); // Assuming the response is in JSON format
  
        setVoiture(voitureData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const photoData = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectAllPhotoVoiture`, {
          method: 'GET' ,
          credentials: 'include'
        });
        const photo = await photoData.json(); // Assuming the response is in JSON format
        
        setPhoto(photo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);


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
// Donner de carrossel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <>
      <div id='sousTitre'>
        <div id="GrandTitre">
          <div id='contenu'>
            <div id='titre'>
              <label>Vente Voiture </label>
              <label>Rolfi Exchange</label>
            </div>
            <div id='about'>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
            </div>
            <div id='recherche'>RECHERCHE</div>
          </div>
          <div id='image'><img className='img' src={voitures} alt="x" /></div>
        </div>

        <div id='titre'>
          <div>Annonces</div>
          <div id='trait'></div>
        </div>
        <div className='listannonce'>
          <div className='lien'><Link to={`/user/detailtoutvoiture`} id='children'>voir tous</Link></div>
          <div id="ListAnnonceContainerCarousel">
            <div id="container">
              <Slider {...settings}>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  voiture.map((voitureData, index) => (
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
                  ))
                )}
              </Slider>
            </div>
          </div>
        </div>

        <div className="carContainer">
          <div className='titre'><h1>Les mieux visite</h1></div>
          <div className='lien'><b>voir tous</b></div>
          <Slider {...settings}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              voiture.map((voitureData, index) => (
                <div className="card" key={index}>
                  <div className="card-top">
                  {photo
                    .filter(item => item.id_voiture === voitureData.idVoiture)
                    .slice(0, 1) // Prendre seulement le premier élément
                    .map((photoData, photoIndex) => (
                      <img key={photoIndex} id='image' src={`${process.env.PUBLIC_URL}/images/${photoData.image_voiture}`} alt={photoData.image_voiture} />
                    ))}
                  <div id='caracteristique'>
                      <label>{voitureData.nomMarque}</label>
                    </div>
                    <div className="card-bottom">
                      <label>{voitureData.prix}</label>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>

        <div id="secondairetitle">
          <div id='image'><img className='img' src={voitures} alt="x" /></div>
          <div id='contenu'>
            <div id='titre'>
              <label>Vente Voiture tres mobil</label>
            </div>
            <div id='about'>
              <div className='box'>
                <div className='icon'><FaBeer /></div><label>une analyse objective de prix </label>
              </div>
              <div className='box'>
                <div className='icon'><FaFacebook /></div><label>Une visibilite complete sur l'historique du vehicule</label>
              </div>
              <div className='box'>
                <div className='icon'><FaInstagram /></div><label>Votre budge maitruse avec notre simulateur de financement</label>
              </div>
              <div className='box'>
                <div className='icon'><FaTwitter /></div><label>Un projection claire sur les futurs entretients de votre voiture</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CarGridIndex;
