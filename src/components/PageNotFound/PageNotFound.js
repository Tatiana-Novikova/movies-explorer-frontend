import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound () {
  return (
    <div className='not-found'>
      <h3 className='not-found__title'>404</h3>
      <span className='not-found__text'>Страница не найдена</span>
      <Link className='not-found__button' to='/'>Назад</Link>
    </div>
  )
}

export default PageNotFound;
