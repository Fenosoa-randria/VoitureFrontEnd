import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/listAnnonce.css';

const ResultsSimpleUser = () => {
  const location = useLocation();
  const searchParams = location.search ? new URLSearchParams(location.search) : null;

  const [voiture, setVoiture] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://finalprojectcar-production-aab1.up.railway.app/api/accueil/rechercheAllVoiture?${searchParams}`;
        const voitureData = await fetch( url,{method: 'GET',credential:'include' });
        const voiture = await voitureData.json();
        if (voitureData.ok) {
          setVoiture(voiture);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, );



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
          <div>Liste des annonces</div>
          <div id='trait'></div>
        </div>
      </div>
      <div id="ListAnnonceContainer">
        <div id="container">
          {voiture && voiture.length > 0 ? (
            voiture.map((voitureData, index) => (
              <div id='element' key={index}>

          {photo
            .filter(item => item.id_voiture === voitureData.idVoiture)
            .slice(0, 1) // Prendre seulement le premier élément
            .map((photoData, photoIndex) => (
              <img key={photoIndex} id='image' src={`${process.env.PUBLIC_URL}/images/${photoData.image_voiture}`} alt={photoData.image_voiture} />
            ))}
                <div id='caracteristique'>
                  <div>
                    <label><b>{voitureData.nomMarque}</b></label>
                  </div> 
                  <div>
                    <label>{new Date(voitureData.anneeCirculation).getFullYear().toString()} | 250 Km  | {voitureData.nomModele} | {voitureData.nomEnergie} | {voitureData.nomCategorie}</label>
                  </div>
                  <div>
                    <label>{voitureData.prix.toLocaleString('fr-FR')}€</label>
                  </div>
                </div>
                <Link to={`/user/annonce/${voitureData.idVoiture}`}>
                  <div id='divbouton'><button id='bouton'>voir</button></div>
                </Link>
              </div>
            ))
          ) : (
            <h1 id="h1">Aucune résultats</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultsSimpleUser;