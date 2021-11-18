import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Form (props) {
  return (
    <div className='form-container'>
      <h2 className='title_place_auth'>{props.title}</h2>
      <form 
        className='form'
        onSubmit={props.onFormSubmit}
        noValidate 
        autoComplete='off'
      >
        <div className={`${props.hasAnyInputs ? 'form__inputs' : 'form__inputs_hidden'}`}>
          {props.children}
          <div className="form__section">
            <label className='form__input-label'>E-mail</label>
            <input
              className='form__input'
              id='email' 
              name='email' 
              type='email'
              value={props.emailInput}
              onChange={props.onEmailChange}
              required
            />
            <span 
              className="form__input-error" 
              id="form__input-name-error">
            </span>
          </div>
          <div>
          <label className='form__input-label'>Пароль</label>
            <input
              className='form__input'
              id='password' 
              name='password' 
              type='password'
              value={props.passwordInput}
              onChange={props.onPasswordChange}
              required
            />
            <span 
              className="form__input-error" 
              id="form__input-name-error">
            </span>
          </div>
        </div>
        <label className='form__submit-button-container'>
          <button
            className='
              form__submit-button
              opacity-transition' 
            type='submit'
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
