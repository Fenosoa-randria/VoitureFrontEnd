import React, { useState, useEffect }  from "react";
import { Link, useParams } from 'react-router-dom';


const AnnonceDetails = () => {
  const [voiture, setvoiture] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const voitureData = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectByIdVoiture?id_voiture=${id}}`,{
         method: 'GET' ,
         credentials: 'include'
        });
        const car = await voitureData.json();
        setvoiture(car);
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
        const photoData = await fetch('https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectAllPhotoVoiture', {
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


return (
        <> 
        <div id='sousTitre'>
            <div id='titre'>
                <div>Annonce</div>
                <div id='trait'></div>
            </div>
        </div>
        {voiture.map((voitureData, index) => (
        <div id="annonceContainer"key={index}>
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
                    <label>{voitureData.nomMarque}</label>
                </div>
                <div id='about'>
                    <label> 1.6 BLUEHD BUSINESS.</label>
                    <label> Année:<span>{new Date(voitureData.anneeCirculation).getFullYear().toString()}</span>  </label> 
                    <label> Energie:<span>{voitureData.nomEnergie}</span> </label> 
                    <label> Kilometrage compteur : <span>250 km/h</span> </label> 
                    <label> Prix : <span>{voitureData.prix.toLocaleString('fr-FR')} $</span></label> 
                </div>
                <Link to={`/login`} id='bouton'>
                    CONTACTER
                </Link>
            </div>
        </div>
              ))}
      </>
    )
}
export default AnnonceDetails;
