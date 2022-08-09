import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  const handleEditProfile = (e) => {
    e.preventDefault();
    const userData = {name, email};
    props.onEditProfile(userData);
  }

  return ( 
    <div className='page-container'>
      <Header loggedIn={props.loggedIn}/>
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form 
          className='profile__user-info-container'
          onSubmit={handleEditProfile}
        >
          <div className='profile__user-info'>
            <p className='profile__user-info_data'>Имя</p>
            <input 
              className='profile__input'
              disabled={false}
              name='name' 
              type='text'
              onChange={(e) => setName(e.target.value)}
              required
              value={name|| ''}
            />
          </div>
          <div className='profile__user-info'>
            <p className='profile__user-info_data'>E-mail</p>
            <input 
              className='profile__input'
              disabled={false}
              name='email' 
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email || ''}
            />
          </div>
          <span className="profile__submit-message">
            {props.profileSubmitMessage}
          </span>
          <button
            className='profile__edit-button'
            type='submit'
            aria-label='Редактировать'
          >
            Редактировать
          </button>
          <Link to='/' 
            className='profile__link'
            onClick={props.onSignOut}
          >
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </div>
  );
}

export default Profile
