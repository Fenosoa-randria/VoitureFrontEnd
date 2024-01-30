// HeaderAdmin.js
import React from 'react';
import { Link } from 'react-router-dom';
import Deconnexion from './Deconnexion';
import '../assets/css/header.css';
import '../assets/font-awesome-4.7.0/css/font-awesome.css';
import logo from '../assets/img/logo.jpg';
import { menuburger } from '../assets/js/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const HeaderAdmin = () => {
  return (
    <>
      <div id='containerHeader'>
        <div className='logoContainer'>
          <Link to={`/admin`}>
            <img className='logo' src={logo} alt='x'></img>
          </Link>
        </div>
        <div></div>
        <div id='linkContainer'>
          <Link to={`/admin`} id='children'>
            HOME
          </Link>
          <Link to={`/admin/voirdemandeannonce`} id='children'>
            ANNONCE
          </Link>
          <Link to={`/admin/statistique`} id='children'>
            STATISTIQUE
          </Link>
          <Link to={`/admin/element`} id='children'>
            ELEMENT
          </Link>
          {/* Utilisez le composant Deconnexion ici */}
          <Deconnexion />
        </div>
        <div id='icons' onClick={menuburger}>
          <FontAwesomeIcon icon={faBars} />        
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
