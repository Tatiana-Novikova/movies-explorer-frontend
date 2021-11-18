import React from 'react';
import Form from '../Form/Form';

function DeleteCardPopup (props) {
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
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.cardToDelete);
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
          title='Вы уверены?'
          buttonText='Да'
          onFormSubmit={handleSubmit}
          hasAnyInputs={false}
        />
      </div>
    </section>
  )
}

export default DeleteCardPopup;
