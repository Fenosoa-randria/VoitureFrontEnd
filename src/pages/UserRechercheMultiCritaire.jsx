import React, { useState, useEffect } from 'react';
import '../assets/css/recherchemulticritere.css'

import { useNavigate  } from 'react-router-dom';

const SearchFormUser = () => {
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [energies, setEnergies] = useState([]);

  const [selectedMarque, setSelectedMarque] = useState('');
  const [selectedModele, setSelectedModele] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedEnergie, setSelectedEnergie] = useState('');
  
  const [nombre,setCompter] = useState('');
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectAllProposVoiture`, {method: 'GET' });
        const nombreVoiture = await fetch(`https://finalprojectcar-production-aab1.up.railway.app/api/accueil/selectCountVoiture`, {method: 'GET' });
        const resp = await response.json();
        const nombre = await nombreVoiture.json();
        setCompter(nombre);
        
        if (response) {
          setMarques(resp.marques.map((marque) => marque));
          setModeles(resp.modeles.map((modele) => modele));
          setEnergies(resp.energies.map((energie) => energie));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchData = {
      marque: selectedMarque,
      modele: selectedModele,
      minPrice: minPrice,
      maxPrice: maxPrice,
      energie: selectedEnergie,
    };
    navigate(`/user/results?marque=${searchData.marque}&modele=${searchData.modele}&minPrice=${searchData.minPrice}&maxPrice=${searchData.maxPrice}&energie=${searchData.energie}`);
  };
    const [,setPhoto] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
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
                <div>RECHERCHE</div>
                <div id='trait'></div>
            </div>
        </div>
        <div id="rechercheContainer">
        <form onSubmit={handleSubmit}>
            <div id="rechercheMultiCritere">
                <div id="titre">recherche</div>  
                <div id='dropDownCritere'>
                    <div id="box1">
                        <select value={selectedMarque} onChange={(e) => setSelectedMarque(e.target.value)} required>
                        <option value="">Marque</option>
                            
                            {marques.map((marque, index) => (
                              <option key={index} value={marque.Marque}>{marque.nomMarque}</option>
                            ))}
                        </select>
                    </div>
                    <div id="box2">
                    <select value={selectedModele} onChange={(e) => setSelectedModele(e.target.value)} required>
                       <option value="">Modèle</option>
                         {modeles.map((modele, index) => (
                        <option key={index} value={modele.Modele}>{modele.nomModel}</option>
                      ))}
                    </select>
                    </div>
                    <div id="box3">
                    <select value={selectedEnergie} onChange={(e) => setSelectedEnergie(e.target.value)} required>
                        <option value="">Energie</option>
                        {energies.map((energie, index) => (
                          <option key={index} value={energie.Energie}>{energie.nomEnergie}</option>
                          ))}
                      </select>
                    </div>
                    <input type="number" placeholder="Prix minimum" min={0} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} required/>
                    <input type="number" placeholder="Prix maximum" min={0} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} required/>
                </div>
                
                <button type="submit" id="rechercher">Recherche ({nombre})</button>
            </div>
            </form>
            <div id='content'>
                <label>titre</label>
                <label>Mais l'Intelligence Artificielle n'apportait pas le résultat tant recherché : 
                donner une conscience aux ordinateurs. Alors l'homme oublia l'Intelligence Artificielle, 
                et comme pour se prouver qu'il était bien le seul à avoir une conscience, se mit aux Arts.
                 Les belles promesses sur l'intelligence des ordinateurs et des robots étaient oubliées. 
                 Le "complexe de Frankenstein" avec. De nouveaux ordinateurs plus puissants, mais dépourvus 
                 d'intelligence, virent le jour. C'était en 2004, un an après l'ouverture au grand public
                d'Internet 3.</label>
            </div>
        </div>
      </>
    );
  }
export default SearchFormUser;
