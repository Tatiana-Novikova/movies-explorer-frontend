import React from 'react';
import './Footer.css';

function Footer () {
  return (
    <footer className='footer'>
      <p className='footer__project-info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__copyrights'>
          <p className='footer__date'>
          &copy; {new Date().getFullYear()}
          </p>
          <ul className='contacts contacts_place_footer'>
            <li className='contacts__item contacts__item_place_footer'>
              <a className='contacts__link' 
                href='https://practicum.yandex.ru/'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className='contacts__item contacts__item_place_footer'>
              <a className='contacts__link'  
                href='https://github.com/Tatiana-Novikova'
              >
                Github
              </a>
            </li>
            <li className='contacts__item contacts__item_place_footer'>
              <a className='contacts__link' 
                href='https://www.facebook.com/tanya.novikova.3597'
              >
                Facebook
              </a>
            </li>
          </ul>
      </div>
    </footer>
  );
}

export default Footer;
