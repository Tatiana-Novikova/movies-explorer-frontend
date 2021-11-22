import React from 'react';
import Form from '../Form/Form';
import './Popup.css';

function Popup (props) {

  React.useEffect(() => {
    if (!props.isPopupOpened) return;
    const handleEscapeClose = (e) => {
      if (e.key === 'Escape') {
        props.onPopupClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return() => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [props]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && props.isPopupOpened) {
      props.onPopupClose();
    }
  }
  
  return (
    <section 
      className= {`popup ${props.isPopupOpened ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className={`popup__content ${props.containsAnyImages 
        ? 'popup__content_type_no-paddings'
        : 'popup__content'}
      `}>
        <button 
          className={`popup__close-button opacity-transition`} 
          type='button' 
          aria-label='Закрыть'
          onClick ={props.onPopupClose}
        />
        <Form
          title={props.formTitle}
          buttonText={props.buttonText}
          onNameChange={props.onNameChange}
          onEmailChange={props.onEmailChange}
          onFormSubmit={props.onFormSubmit}
          containsAnyInputs={props.containsAnyInputs}
          containsAnyForms={props.containsAnyForms}
        >
        
        </Form>
        {props.children}
      </div>
    </section>
  );
}

export default Popup;