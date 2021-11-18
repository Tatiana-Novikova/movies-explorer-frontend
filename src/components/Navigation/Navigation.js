import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/navigation__profile-icon.svg';

function Navigation (props) {
  return ( 
    <nav className='navigation'>
      <input id='menu-toggle' type='checkbox' />
      <label
        className='menu-btn'
        htmlFor='menu-toggle'
      >
        <span className='menu-btn__line'></span>
	    </label>
      <section className='menu'>
        <div className='menu-background'></div>
        <div className='menu-container'>
          <Switch>
            <Route path='/'>
              <div className={`
                ${props.loggedIn 
                  ? 'navigation__links_hidden'
                  : 'navigation__links_visible' 
                }`}
              >
                <NavLink 
                  to='signup'
                  className='navigation__link'
                >
                  Регистрация
                </NavLink>
                <NavLink 
                  to='signin' 
                  className='navigation__link navigation__link_type_signin'
                >
                  Войти
                </NavLink>
              </div>
              <div className={`
                ${props.loggedIn 
                  ? 'navigation__links_visible'
                  : 'navigation__links_hidden' 
                }`}
              >
                <div className='navigation__links-box'>
                  <NavLink 
                    exact to='/' 
                    className='navigation__link navigation__link_type_main'
                    activeClassName="navigation__link_active"
                  >
                    Главная
                  </NavLink>
                  <NavLink 
                    to='/movies' 
                    className='navigation__link'
                    activeClassName="navigation__link_active"
                  >
                    Фильмы
                  </NavLink>
                  <NavLink 
                    to='saved-movies' 
                    className='navigation__link'
                    activeClassName="navigation__link_active"
                  >
                    Сохранённые фильмы
                  </NavLink>
                </div>
                <NavLink 
                  to='profile' 
                  className='navigation__link navigation__link_type_icon'
                  activeClassName="navigation__link_active"
                >
                  Аккаунт
                  <img className='navigation__profile-icon' 
                    src={icon} 
                    alt='иконка со ссылкой на страницу профиля'
                  />
                </NavLink>
              </div>
            </Route>
          </Switch>
        </div>
      </section>
    </nav>
  );
}

export default Navigation