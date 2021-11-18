import React from 'react';
import './AboutMe.css';
import photo from '../../images/about-me__photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe () {
  return ( 
    <section className='about-me' id='about-me'>
      <h2 className='title_place_section'>Студент</h2>
      <div className='about-me__student-info'>
        <div className='about-me__student-info-container'>
          <div>
            <h3 className='title about-me__name'>Татьяна</h3>
            <p className='about-me__capture'>Фронтенд-разработчик, 28 лет</p>
            <p className='about-me__text'>Я родилась и живу в Москве, 
              закончила факультет менеджмента МЭСИ. Я люблю слушать музыку, петь 
              и учусь играть на укулеле. Недавно начала кодить.
            </p>
          </div>
          <ul className='contacts'>
            <li className='contacts__item'>
              <a className='contacts__link' 
                href='https://www.facebook.com/tanya.novikova.3597'
              >
                Facebook
              </a>
            </li>
            <li className='contacts__item'>
              <a className='contacts__link' 
                href='https://github.com/Tatiana-Novikova'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img 
          className='about-me__photo'
          alt='фотография студента'
          src={photo}
        />
      </div>
      <Portfolio/>
    </section>
  );
}

export default AboutMe
