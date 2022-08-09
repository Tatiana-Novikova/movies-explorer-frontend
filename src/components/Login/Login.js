import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/logo.svg';

function Login (props) {
  const [isRequest, setIsRequest] = React.useState(false);

  function handleSubmit (e) {
    e.preventDefault();
    setIsRequest(true);
    props.onLogin(props.emailValue, props.passwordValue);
    setIsRequest(false);
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
        buttonText='Войти'
        caption='Ещё не зарегистрированы?'
        containsAnyImages={false}
        containsAnyInputs={true}
        containsAnyForms={true}
        linkText='Регистрация'
        linkEndpoit='/signup'
        title='Рады видеть!'
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
        isNameValid={true}
        isEmalValid={props.isEmailValid}
        isPasswordValid={props.isPasswordValid}
        isRequest={isRequest}
      />
    </div>
  )
}

export default Login;
