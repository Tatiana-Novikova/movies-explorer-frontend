import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/logo.svg';

function Login ({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange (e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange (e) {
    setPassword(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className='page_type_auth'>
     <Link to='/'> 
        <img 
          className='logo'
          src={logo}
          alt='логотип movies-explorer'
        />
      </Link> 
      <Form
        title='Рады видеть!'
        emailInput={email}
        passwordInput={password}
        buttonText='Войти'
        caption='Ещё не зарегистрированы?'
        linkText='Регистрация'
        linkEndpoit='/signup'
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onFormSubmit={handleSubmit}
        hasAnyInputs={true}
      />
    </div>
  )
}

export default Login;
