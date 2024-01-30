
import { Link } from 'react-router-dom';
import '../assets/css/header.css';
import '../assets/font-awesome-4.7.0/css/font-awesome.css';
import logo from '../assets/img/logo.jpg';
import { menuburger } from '../assets/js/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  // const [mots, ] = useState('');

  // const handleSearch = () => {
  //   // Effectuer l'action de recherche avec les mots-clés
  //   // Créer l'URL de recherche avec les paramètres
  //   const searchUrl = `/rechercheSimple?mots=${(mots)}`;
  //   console.log(searchUrl);
  //   // Rediriger vers la page de recherche
  //   window.location.href = searchUrl;
  // };

  return (
    <>
      <div id='containerHeader'>
        <div className='logoContainer'>
          <Link to={`/`}>
            <img className='logo' src={logo} alt='x'></img>
          </Link>
        </div>
        <div></div>
        <div id='linkContainer'>
        {/* <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input type='text' value={mots} onChange={(e) => setMots(e.target.value)} placeholder='... search'/>
            <button type='submit'><FontAwesomeIcon icon={faSearch} /></button>
          </form> */}
          <Link to={`/`} id='children'>
            HOME
          </Link>
          {/* <div id='children'>UPLOAD</div>
          <div id='children'>BLOG</div>
          <div id='children'>CONTACT</div> */}
           {/* <Link to={`/upload`} id='children'>
            UPLOAD
          </Link> */}
          {/* <Link to={`/recherche`} id='children'>
            RECHERCHE
          </Link> */}
          <Link to={`/login`} id='children'>
            CONNEXION
          </Link>
          
        </div>
        <div id='icons' onClick={menuburger}>
        <FontAwesomeIcon icon={faBars} />        
        </div>
      </div>
    </>
  );
}
