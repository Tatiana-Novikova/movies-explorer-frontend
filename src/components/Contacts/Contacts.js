import React from 'react';
import './Contacts.css';

function Contacts (props) {
  return (
    <ul className={`${props.parentClassName === 'about-me' 
    ? 'contacts contacts-reversed' 
    : 'contacts contacts_place_footer'}
  `}>
      <li className={`${props.parentClassName === 'about-me' 
        ? 'contacts__item_hidden' 
        : 'contacts__item contacts__item_place_footer'}
      `}>
        <a className='contacts__link' 
          href='https://practicum.yandex.ru/'
          target='_blank'
          rel='noreferrer nofollow'
        >
          Яндекс.Практикум
        </a>
      </li>
      <li className={`${props.parentClassName === 'about-me' 
        ? 'contacts__item' 
        : 'contacts__item contacts__item_place_footer'}
      `}>
        <a className={`contacts__link
          ${props.parentClassName === 'about-me' 
            ? 'contacts__link_place_about-me' 
            : 'contacts__link_place_footer'}
        `}
          href='https://github.com/Tatiana-Novikova'
          target='_blank'
          rel='noreferrer nofollow'
        >
          Github
        </a>
      </li>
      <li className={`${props.parentClassName === 'about-me' 
        ? 'contacts__item' 
        : 'contacts__item_place_footer'}
      `}>
        <a className={`contacts__link
          ${props.parentClassName === 'about-me' 
            ? 'contacts__link_place_about-me' 
            : 'contacts__link_place_footer'}
        `}
          href='https://www.facebook.com/tanya.novikova.3597'
          target='_blank'
          rel='noreferrer nofollow'
        >
          Facebook
        </a>
      </li>
    </ul>
  );
}

export default Contacts;
