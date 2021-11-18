import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { useHistory } from 'react-router-dom';
import savedMoviesCards from '../../utils/savedMoviesCards';
// import { Redirect } from 'react-router-dom';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import api from '../../utils/api'
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import * as auth from '../../auth';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registed, setRegisted] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [foundedMoviesCards, setFoundedMoviesCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});

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
  function handleDeleteCardClick(moviesCard) {
    setCardToDelete(moviesCard);
  }

  function handleRequest () {
    setIsLoading(true);
    const formattedMoviesCards = savedMoviesCards.map((moviesCard) => {
      return {
        _id: moviesCard._id,
        title: moviesCard.title,
        link: moviesCard.link,
        featurette: moviesCard.featurette,
        saved: moviesCard.saved
      }
    })
    setFoundedMoviesCards(formattedMoviesCards);
    setIsLoading(false);
  }

  function handleDeleteCardSubmit(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        setFoundedMoviesCards((foundedCards) => 
          foundedCards.filter((c) => 
            c._id !== card._id))
        setCardToDelete(null);
      })
      .catch((error) => console.log(error));
  }

  function handleEditProfile(user) {
    api.updatePropfile(user)
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
      }
    })
    .catch((error) => {
      console.log(error)
      setRegisted(false);
    });
  }

  function handleLoginSubmit (email, password) {
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
          </Route>
          <Route path='/signin'>
            <Login 
              onLogin={handleLoginSubmit}
              onSubmit={handleSignIn}
            />
          </Route>
          <Route path='/profile'>
            <Profile
              isPopupOpened={isEditProfilePopupOpened}
              isInfoTooltipOpened={isInfoTooltipOpened}
              name={name}
              email={email}
              onSignOut={handleSignOut}
              onEditProfile={handleEditProfile}
              onEditProfileClick={handleEditProfileClick}
              onPopupClose={closeAllPopups}
              loggedIn={loggedIn}
              registed={registed}
            />
          </Route>
          {/* <Route exact path='/'>
            {loggedIn ?  
              <Redirect to='/' /> :
              <Redirect to='./signin' />}
          </Route> */}
          <Route path='/movies'>
            <Movies loggedIn={loggedIn}/>
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies 
              loggedIn={loggedIn}
              onDeleteCardClick={handleDeleteCardClick}
              onDeleteCard={handleDeleteCardSubmit}
              isPopupOpened={!!cardToDelete} 
              onClose={closeAllPopups}
              cardToDelete={cardToDelete}
              foundedMoviesCards={foundedMoviesCards}
              isLoading={isLoading}
              handleRequest={handleRequest}
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
