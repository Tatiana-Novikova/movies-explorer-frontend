import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/logo.svg';


function Register ({ onRegister }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function handleNameChange (e) {
    setName(e.target.value)
  }

  function handleEmailChange (e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange (e) {
    setPassword(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    onRegister(name, email, password)
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
        title='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        caption='Уже зарегистрированы?'
        containsAnyImages={false}
        containsAnyInputs={true}
        containsAnyForms={true}
        linkText='Войти'
        linkEndpoit='/signin'
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
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
      </Form>
    </div>
  )
}

export default Register;
