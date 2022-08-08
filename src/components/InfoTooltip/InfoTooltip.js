import React from 'react';
import Popup from '../Popup/Popup'
import authSuccess from '../../images/auth-success.svg';
import authFail from '../../images/auth-fail.svg';

function InfoTooltip (props) {

  return (
    <Popup
      isPopupOpened={props.isInfoTooltipOpened}
      containsAnyImages={true}
      containsAnyInputs={false}
      containsAnyForms={false}
      onPopupClose={props.onPopupClose}
      registed={props.registed}
    >
      <figure className='popup__image-container'>
        <img 
          className='popup__image'
          src={`${props.registed ? authSuccess : authFail}`}
          alt={props.title} 
        />
        <h2 className='popup__title popup__title_place_info-tooltip'>
          {`${props.registed
            ? 'Вы успешно зарегистрировались!' 
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }`}
        </h2>
      </figure>
    </Popup>
  );
}

export default InfoTooltip;
