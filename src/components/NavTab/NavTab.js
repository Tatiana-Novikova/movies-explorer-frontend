import React from 'react';
import './NavTab.css';

function NavTab () {
  return ( 
    <ul className='nav-tab'>
      <li className='nav-tab__item'>
        <a href='#about-project' className='nav-tab__link'>О проекте</a>
      </li>
      <li className='nav-tab__item'>
        <a href='#techs' className='nav-tab__link'>Технологии</a>
      </li>
      <li className='nav-tab__item'>
        <a href='#about-me' className='nav-tab__link'>Студент</a>
      </li>
    </ul>
  );
}

export default NavTab