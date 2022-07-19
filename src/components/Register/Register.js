import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/logo.svg';

function Register (props) {
    
  function handleSubmit (e) {
    e.preventDefault();
    props.onRegister(props.nameValue, props.emailValue, props.passwordValue);
  }

  return (
    <div className='page_type_auth'>
      <Link to='/'> 
        <img 
          className='app__logo'
          src={logo}
          alt='логотип movies-explorer'
        />
      </Link>
      <Form
        buttonText='Зарегистрироваться'
        caption='Уже зарегистрированы?'
        containsAnyImages={false}
        containsAnyInputs={true}
        containsAnyForms={true}
        linkText='Войти'
        linkEndpoit='/signin'
        title='Добро пожаловать!'
        onSubmit={handleSubmit}
        formSubmitErrorMessage={props.formSubmitErrorMessage}
        emailValue={props.emailValue}
        nameValue={props.nameValue}
        passwordValue={props.passwordValue}
        emailErrorMessage={props.emailErrorMessage}
        nameErrorMessage={props.nameErrorMessage}
        passwordErrorMessage={props.passwordErrorMessage}
        onEmailFocus={props.onEmailFocus}
        onEmailChange={props.onEmailChange}
        onPasswordFocus={props.onPasswordFocus}
        onPasswordChange={props.onPasswordChange}
        isEmailDirty={props.isEmailDirty}
        isPasswordDirty={props.isPasswordDirty}
        isNameValid={props.isNameValid}
        isEmalValid={props.isEmailValid}
        isPasswordValid={props.isPasswordValid}
      >
        <div className="form__section">
          <label className='form__input-label'>Имя</label>
          <input
            className='form__input'
            disabled={false}
            name='name'
            onChange={props.onNameChange}
            onFocus={props.onNameFocus}
            type='text'
            required
            value={props.nameValue}
          />
          {(props.nameValue && props.isNameDirty) && <span 
              className="form__input-error" 
              id="form__input-name-error">
                {props.nameErrorMessage}
            </span>}
        </div>
      </Form>
    </div>
  )
}

export default Register;
