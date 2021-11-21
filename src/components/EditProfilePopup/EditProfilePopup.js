import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser ? currentUser.name : '');
  const [email, setEmail] = React.useState(currentUser ? currentUser.email : '');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
  }, [currentUser, props.isPopupOpened]) 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditProfile({ name, email: email});
  } 
  
  return (
    <Popup
      buttonText='Сохранить'
      containsAnyImages={false}
      containsAnyInputs={true}
      containsAnyForms={true}
      formTitle='Редактировать профиль'
      isPopupOpened={props.isEditProfilePopupOpened}
      onPopupClose={props.onPopupClose}
      onEmailChange={handleEmailChange}
      onFormSubmit={handleSubmit}
    >
      <div className="form__section">
        <label className='form__input-label'>Имя</label>
        <input
          className='form__input'
          id='name' 
          name='name' 
          type='text'
          onChange={handleNameChange}
          minLength="2"
          maxLength="40"
          required
        />
      </div>
    </Popup>
  );
}

export default EditProfilePopup
