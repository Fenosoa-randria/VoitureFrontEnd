import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

const AnnonceDetailsUser = () => {
  const [voiture, setVoiture] = useState([]);
  const [photo, setPhoto] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voitureData = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectByIdVoiture?id_voiture=${id}`, {method: 'GET' });
        const voiture = await voitureData.json();
        setVoiture(voiture);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Ajoutez 'id' comme dépendance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoData = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectAllPhotoVoiture`,{ method: 'GET' });
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
          <div>Annonce</div>
          <div id='trait'></div>
        </div>
      </div>
      {voiture.length > 0 && (
        <div id="annonceContainer">

        {photo
            .filter(item => item.id_voiture === voiture[0].idVoiture)
            .slice(0, 1)
            .map((photoData, photoIndex) => (
              <div key={photoIndex}>
                <div id='image'><img className='img' src={`${process.env.PUBLIC_URL}/images/${photoData.image_voiture}`} alt={photoData.image_voiture} /></div>
              </div>
            ))}
          
          <div id='contenu'>
            <div id='marque'>
              <label>{voiture[0].nomMarque}</label>
            </div>
            <div id='about'>
              <label> 1.6 BLUEHD BUSINESS.</label>
              <label> Année:<span>{new Date(voiture[0].anneeCirculation).getFullYear().toString()}</span>  </label>
              <label> Energie:<span>{voiture[0].nomEnergie}</span> </label>
              <label> Kilometrage compteur : <span>250 km/h</span> </label>
              <label> Prix : <span>{voiture[0].prix.toLocaleString('fr-FR')} $</span></label>
            </div>
            <Link to={`/user/message`} id='bouton'>
              Message
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnonceDetailsUser;
