import React from 'react';
import Popup from '../Popup/Popup';

function DeleteCardPopup (props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.cardToDelete);
  }

  return (
    <Popup
      buttonText='Да'
      containsAnyImages={false}
      containsAnyInputs={false}
      containsAnyForms={true}
      formTitle='Вы уверены?'
      isPopupOpened={props.isDeleteCardPopupOpened}
      onPopupClose={props.onPopupClose}
      onFormSubmit={handleSubmit}
    >
    </Popup>
  );
}

export default DeleteCardPopup;
