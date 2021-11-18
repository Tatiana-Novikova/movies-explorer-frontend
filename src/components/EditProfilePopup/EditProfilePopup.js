import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser ? currentUser.name : '');
  const [email, setEmail] = React.useState(currentUser ? currentUser.email : '');
  const [password, setPassword] = React.useState(currentUser ? currentUser.password : '');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
    setPassword(currentUser.password || '');
  }, [currentUser, props.isPopupOpened])


  React.useEffect(() => {
    if (!props.isPopupOpened) return;
    const handleEscapeClose = (e) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return() => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [props]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && props.isPopupOpened) {
      props.onClose();
    }
  } 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditProfile({ name, email: email, password });
  } 
  
  return (
    <section 
      className= {`popup ${props.isPopupOpened ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className='popup__content'>
        <button 
          className={`popup__close-button opacity-transition`} 
          type='button' 
          aria-label='Закрыть'
          onClick ={props.onClose}
        />
        <Form
          title='Редактировать профиль'
          emailInput={email}
          passwordInput={password}
          buttonText='Сохранить'
          onNameChange={handleNameChange}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onFormSubmit={handleSubmit}
          hasAnyInputs={true}
        >
          <div className="form__section">
            <label className='form__input-label'>Имя</label>
            <input
              className='form__input'
              id='name' 
              name='name' 
              type='text'
              value={name}
              onChange={handleNameChange}
              minLength="2"
              maxLength="40"
              required
            />
          </div>
        </Form>
      </div>
    </section>
  );
}

export default EditProfilePopup
