import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/navigation__profile-icon.svg';

function Navigation (props) {
  return ( 
    <nav className='navigation'>
      <Switch>
        <Route path='/'>
          <div className={`navigation__auth-links
            ${props.loggedIn 
              ? 'navigation__links_hidden'
              : 'navigation__links_visible' 
            }`}
          >
            <div className='navigation__links-not-auth'>
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
          </div>
          <input id='navigation__menu-toggle' type='checkbox'/>
          <label
            className={`
            ${props.loggedIn 
              ? 'navigation__menu-btn'
              : 'navigation__menu-btn_hidden' 
            }`}
            htmlFor='navigation__menu-toggle'
          >
            <span className='navigation__menu-btn-line'></span>
	        </label>
          <section className='navigation__menu'>
            <div className='navigation__menu-background'></div>
            <div className='navigation__menu-container'>
              <div className={`
                ${props.loggedIn 
                  ? 'navigation__links_visible'
                  : 'navigation__links_hidden' 
                }`}
              >
                <div className='navigation__links-auth'>
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
                  className='navigation__link navigation__link_type_profile'
                  activeClassName="navigation__link_active"
                >
                  Аккаунт
                  <img className='navigation__profile-icon' 
                    src={icon} 
                    alt='иконка со ссылкой на страницу профиля'
                  />
                </NavLink>
              </div>
            </div>
          </section>
        </Route>
      </Switch>
    </nav>
  );
}

export default Navigation
