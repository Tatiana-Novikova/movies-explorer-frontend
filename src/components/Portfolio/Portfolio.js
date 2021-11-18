import React from 'react';
import './Portfolio.css';

function Portfolio () {
  return ( 
    <section className='portfolio'>
      <h3 className='portfolio__heading'>Портфолио</h3>
      <ul className='portfolio__links'>
        <li className='portfolio__links-item'>
          <a href='https://github.com/Tatiana-Novikova/how-to-learn' className='portfolio__link'>Статичный сайт
            <span className='portfolio__link-arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a href='https://tatiana-novikova.github.io/russian-travel/' className='portfolio__link'>Адаптивный сайт 
            <span className='portfolio__link-arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a href='http://mesto-project.students.nomoredomains.club/' className='portfolio__link'>Одностраничное приложение
            <span className='portfolio__link-arrow'>&#8599;</span>
          </a>
        </li>
      </ul>    
    </section>
  );
}

export default Portfolio
