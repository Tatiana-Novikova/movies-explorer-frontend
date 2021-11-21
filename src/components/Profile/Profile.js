import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import Header from '../Header/Header';

function Profile (props) {
  return ( 
    <div className='page-container'>
      <Header loggedIn={props.loggedIn}/>
      <section className='profile'>
        <h2 className='profile__title'>Привет, {props.name}!</h2>
        <div className='profile__user-info-container'>
          <div className='profile__user-info'>
            <p className='profile__user-info_data'>Имя</p>
            <p className='profile__user-info_value'>{props.name}</p>
          </div>
          <div className='profile__user-info'>
            <p className='profile__user-info_data'>E-mail</p>
            <p className='profile__user-info_value'>{props.email}</p>
          </div>
        </div>
        <button
          className='profile__edit-button'
          type='button'
          aria-label='Редактировать'
          onClick={props.onEditProfileClick}
        >
          Редактировать
        </button>
        <Link to='signin' 
          className='profile__link'
          onClick={props.onSignOut}
        >
          Выйти из аккаунта
        </Link>
      </section>
      <EditProfilePopup 
        isEditProfilePopupOpened={props.isEditProfilePopupOpened} 
        onPopupClose={props.onPopupClose}
        onEditProfile={props.onEditProfile}
      />
    </div>
  );
}

export default Profile
