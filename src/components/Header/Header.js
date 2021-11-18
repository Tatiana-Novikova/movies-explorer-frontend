import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header(props) {
  return (
    <header className='header'>
      <Link to='/' className='header__link'>
        <img 
          className='logo'
          src={logo}
          alt='логотип movies-explorer'
        />
      </Link>
      <Navigation loggedIn={props.loggedIn}/>
    </header>
  );
}

export default Header;
