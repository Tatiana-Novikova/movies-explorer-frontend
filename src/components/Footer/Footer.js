import React from 'react';
import './Footer.css';
import Contacts from '../Contacts/Contacts';

function Footer () {
  return (
    <footer className='footer'>
      <p className='footer__project-info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__copyrights'>
          <p className='footer__date'>
          &copy; {new Date().getFullYear()}
          </p>
          <Contacts parentClassName='footer'/>
      </div>
    </footer>
  );
}

export default Footer;
