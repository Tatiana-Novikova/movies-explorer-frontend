import React from 'react';
import './AboutMe.css';
import photo from '../../images/about-me__photo.jpg';
import Contacts from '../Contacts/Contacts';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe () {
  return ( 
    <section className='about-me' id='about-me'>
      <h2 className='app__section-title '>Студент</h2>
      <div className='about-me__student-info'>
        <div className='about-me__student-info-container'>
          <div>
            <h3 className='about-me__name'>Татьяна</h3>
            <p className='about-me__capture'>
              Фронтенд-разработчик, 28 лет
            </p>
            <p className='about-me__text'>
              Я родилась и живу в Москве, закончила факультет менеджмента МЭСИ. 
              Люблю слушать музыку, петь и учусь играть на укулеле. 
              Ещё со школы люблю информатику и вот недавно начала кодить.
              Чтобы научиться этому и найим работу в новой профессии, выбрала Яндекс практикум.
            </p>
          </div>
          <Contacts parentClassName='about-me'/>
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
