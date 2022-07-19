import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Form (props) {
  
  return (
    <div className={`${props.containsAnyForms 
      ? 'form-container' 
      : 'form-container_hidden'}
    `}>
      <h2 className='form__title'>{props.title}</h2>
      <form 
        className='form'
        onSubmit={props.onSubmit}
        noValidate
        autoComplete='off'
      >
        <div className={`${props.containsAnyInputs ? 'form__inputs' : 'form__inputs_hidden'}`}>
          {props.children}
          <div className="form__section">
            <label className='form__input-label'>E-mail</label>
            <input
              className='form__input'
              disabled={false}
              name='email' 
              type='email'
              onFocus={props.onEmailFocus}
              onChange={props.onEmailChange}
              required
              value={props.emailValue}
            />
            {(props.emailValue && props.isEmailDirty) && <span 
              className="form__input-error" 
              id="form__input-name-error">
                {props.emailErrorMessage}
            </span>}
          </div>
          <div>
          <label className='form__input-label'>Пароль</label>
            <input
              className='form__input'
              disabled={false}
              name='password' 
              type='password'
              onFocus={props.onPasswordFocus}
              onChange={props.onPasswordChange}
              required
              value={props.passwordValue}
            />
            {(props.passwordValue && props.isPasswordDirty) && <span 
              className="form__input-error" 
              id="form__input-name-error">
                {props.passwordErrorMessage}
            </span>}
          </div>
        </div>
        <label className='form__submit-btn-container'>
          <span className="form__submit-error-message">
            {props.formSubmitErrorMessage}
          </span>
          <button
            className={`form__submit-btn opacity-transition
              ${props.isNameValid && props.isEmalValid && props.isPasswordValid
                ? 'form__submit-btn_active'
                : 'form__submit-btn_disabled'
              }
            `}
            type='submit'
            disabled={props.isNameValid && props.isEmalValid && props.isPasswordValid
            ? false
            : true
          }
          >
            {props.buttonText}
          </button>
          <p className='form__link-caption'>
            {props.caption} 
            <Link to={`${props.linkEndpoit}`} className='form__auth-link'>
              {props.linkText}
            </Link>
          </p>
        </label>
      </form>
    </div>
  )
}

export default Form;
