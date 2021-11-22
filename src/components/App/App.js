import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import MainApi from '../../utils/MainApi';

import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

import * as auth from '../../middlewares/auth';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState('');
  const [registed, setRegisted] = React.useState(false);

  const handleTokenCheck = () => { 
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt'); 
      auth.checkToken(jwt) 
      .then((res) => { 
        if (res) {
          setName(res.data.name);
          setEmail(res.data.email);
          history.push('/');
        }
      })
      .catch((error) => console.log(error));
      setLoggedIn(true);
    }
  }

  function componentDidMount() {
    handleTokenCheck();
  }

  const history = useHistory();

  function handleSignIn() {
    setLoggedIn(true);
  }

  function handleRegister() {
    setRegisted(true);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsInfoTooltipOpened(false);
    setCardToDelete(null);
  }

  function handleEditProfileSubmit(user) {
    MainApi.updatePropfile(user)
    .then((userData) => {
      setCurrentUser(userData);
      setIsEditProfilePopupOpened(false);
    })
    .catch((error) => console.log(error));
  }

  function handleRegisterSubmit(name, email, password) {
    auth.register(name, email, password)
    .then((data) => {
      if (data) {
        history.push('/signin');
        setRegisted(true);
        setIsInfoTooltipOpened(true);
      }
    })
    .catch((error) => {
      console.log(error)
      setRegisted(false);
      setIsInfoTooltipOpened(true);
    });
  }

  function handleLoginSubmit(email, password) {
    auth.login(email, password)
    .then((data) => {
      if (data) {
        setLoggedIn(true);
        history.push('/');
      }
    })
    .catch((error) => {
      console.log(error)
      setRegisted(false);
      setIsInfoTooltipOpened(true);
    });
  }

  React.useEffect(() => {
    componentDidMount();
  }, []);

  return(
    <div className='page-container'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          {/* <ProtectedRoute
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
          /> */}
          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
            />
          </Route>
          <Route path='/signup'>
            <Register 
              onRegister={handleRegisterSubmit}
              onSubmit={handleRegister}
            />
            <InfoTooltip
              isInfoTooltipOpened={isInfoTooltipOpened} 
              onPopupClose={closeAllPopups}
              registed={registed}
            />
          </Route>
          <Route path='/signin'>
            <Login 
              onLogin={handleLoginSubmit}
              onSubmit={handleSignIn}
            />
            <InfoTooltip
              isInfoTooltipOpened={isInfoTooltipOpened} 
              onPopupClose={closeAllPopups}
              registed={registed}
            />
          </Route>
          <Route path='/profile'>
            <Profile
              email={email}
              isInfoTooltipOpened={isInfoTooltipOpened}
              isEditProfilePopupOpened={isEditProfilePopupOpened}
              loggedIn={loggedIn}
              name={name}
              onEditProfile={handleEditProfileSubmit}
              onEditProfileClick={handleEditProfileClick}
              onPopupClose={closeAllPopups}
              onSignOut={handleSignOut}
              registed={registed}
            />
          </Route>
          {/* <Route exact path='/'>
            {loggedIn ?  
              <Redirect to='/' /> :
              <Redirect to='./signin' />}
          </Route> */}
          <Route path='/movies'>
            <Movies
              loggedIn={loggedIn}
              setIsLoading={setIsLoading}
            />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies
              cardToDelete={cardToDelete}
              isLoading={isLoading}
              isDeleteCardPopupOpened={!!cardToDelete}
              loggedIn={loggedIn}
              onPopupClose={closeAllPopups}
              setCardToDelete={setCardToDelete}
              setIsLoading={setIsLoading}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
