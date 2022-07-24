import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Login from '../Login/Login';
import Main from '../Main/Main';
import AuthApi from '../../utils/AuthApi';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

import * as formValidator from '../../utils/FormValidator';

function App() {
  const history = useHistory();
  const location = window.location.pathname;
  const [movieToDelete, setMovieToDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [formSubmitErrorMessage, setFormSubmitErrorMessage] = React.useState('');
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesSearchResponse, setSavedMoviesSearchResponse] = React.useState('');
  const [isAppLoading, setIsAppLoading] = React.useState(true);

  const name = formValidator
    .useInput('', {
      isNameValid: true,
  });
  const email = formValidator
    .useInput('', {
      isEmailValid: true
  });
  const password = formValidator
    .useInput('', {
      isPasswordValid: true,
  });

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      AuthApi.getCurrentUser() 
      .then((res) => { 
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
          history.push(location);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('token');
        history.push('/');
      })
    }
  }

  const handleRegisterSubmit = (name, email, password) => {
    AuthApi.register(name, email, password)
    .then((res) => {
      history.push('/movies');
    })
    .catch((error) => {
      if (error === 409) {
        setFormSubmitErrorMessage('Пользователь c таким email уже существует');
      }
      if (error === 400) {
        setFormSubmitErrorMessage('Переданы некорректные данные');
      }
      if (error === 500) {
        setFormSubmitErrorMessage('Ошибка сервера');
      }
    });
  }

  const handleLoginSubmit = (email, password) => {
    AuthApi.login(email, password)
    .then((data) => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      history.push('/movies');
      handleGetCurrentUser();
    })
    .catch((error) => {
      if (error === 401) {
        setFormSubmitErrorMessage('Передан неверный логин или пароль');
      }
      if (error === 400) {
        setFormSubmitErrorMessage('Переданы некорректные данные');
      }
      if (error === 500) {
        setFormSubmitErrorMessage('Ошибка сервера');
      }
      setLoggedIn(false);
    });
  }

  const handleSignOut = () => {
    setCurrentUser({ email: '', name: ''});
    localStorage.clear();
    setSearchedMovies([]);
    AuthApi.logout()
      .then(() => {
        setLoggedIn(false);
        history.push('/');
      })
      .catch((error) => console.log(error));
  }

  const closeAllPopups = () => {
    setMovieToDelete(null);
  }

  const handleEditProfileSubmit = (user) => {
    AuthApi.editProfile(user)
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch((error) => {
      if(error === 400) {
        setFormSubmitErrorMessage('Переданы некорректные данные');
      }
      if(error === 409) {
        setFormSubmitErrorMessage('Пользователь с таким email уже существует');
      }
      if(error === 500) {
        setFormSubmitErrorMessage('Ошибка сервера');
      }
    })
  }

  const handleGetCurrentUser = () => {
    AuthApi.getCurrentUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleGetMovies = () => {
    if (loggedIn) {
      MoviesApi.getMovies()
       .then((res) => {
         localStorage.setItem('movies', JSON.stringify(res));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const handleGetSavedMovies = () => {
    if (loggedIn) {
      MainApi.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem('savedMovies', JSON.stringify(res));
        })
        .catch((error) => {
          console.log(error);
          localStorage.setItem('savedMovies', JSON.stringify([]));
      });
    }
  } 

  const handleSearchMovies = (movies, searchQuery) => {
    const filteredMovies = movies.filter(movie => (movie.nameRU.includes(searchQuery)));
    if (filteredMovies.length === 0 && location === '/saved-movies') {
      setSavedMoviesSearchResponse('Фильмов по запросу не найдено.');
    } else {
      setSavedMoviesSearchResponse('');
    }
    return filteredMovies;
  }

  const handleMoviesFiltration = () => {
    const durationFilteredMovies = searchedMovies.filter((movie) => movie.duration <= 40);
    return durationFilteredMovies;
  }

  const handleSearchMoviesSubmit = (searchQuery) => {
    handleGetMovies();
    setTimeout(() => setIsLoading(false), 1000);
    setSearchedMovies(handleSearchMovies(movies, searchQuery));
    localStorage
      .setItem('lastSearchedMovies', JSON.stringify(handleSearchMovies(movies, searchQuery)));
  }

  const handleSearchSavedMoviesSubmit = (searchQuery) => {
    setTimeout(() => setIsLoading(false), 1000);
    const storageSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    setSavedMovies(handleSearchMovies(storageSavedMovies, searchQuery));
  }

  const isSavedCheck = (movie) => {
    const isMovieSaved = savedMovies
      .some(savedMovie => {
        return movie.id === savedMovie.movieId || movie.movieId === savedMovie.movieId;
      })
    return isMovieSaved;
  }

  const handleSaveOrDeleteClick = (movie, isSaved) => {
    if (isSaved) {
      handleDeleteMovie(movie);
    } else {
      handleSaveMovie(movie);
    }
  }

  const handleSaveMovie = (movie) => {
    MainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        handleGetSavedMovies();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleDeleteMovie = (movieToDeleteData) => {
    if(!movieToDeleteData.movieId) {
      const movieToDelete = savedMovies.filter((movie) => movie.movieId === movieToDeleteData.id);
      movieToDeleteData = movieToDelete[0];
    }
    MainApi.deleteMovie(movieToDeleteData._id) 
      .then((res) => {
        setSavedMovies(savedMovies.filter((movie) => movie.id !== movieToDeleteData._id));
        handleGetSavedMovies();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setLoggedIn(true);
      Promise.all([AuthApi.getCurrentUser(), MainApi.getSavedMovies()])
        .then(([userInfo, savedMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies);
          setIsAppLoading(false);
          handleGetSavedMovies();
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
        .finally(() => {
          setIsAppLoading(false);
        })
    } else {
      setIsAppLoading(false);
    }
  },[loggedIn])


  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const storageMovies = JSON.parse(localStorage.getItem('movies'));
    const storageSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchedMovies = JSON.parse(localStorage.getItem('lastSearchedMovies'));
    
    if (storageMovies) {
      setMovies(storageMovies);
      if (searchedMovies) {
        setSearchedMovies(searchedMovies);
      }
    } else {
      handleGetMovies();
    }
    if (storageSavedMovies) {
      setSavedMovies(storageSavedMovies)
    } else if(token) {
      handleGetSavedMovies();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return(
    isAppLoading ? <Preloader isLoading={isAppLoading} /> : 
    <div className='page-container'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
            />
          </Route>
          <Route path='/signup'>
            <Register
              onRegister={handleRegisterSubmit}
              emailValue={email.value}
              formSubmitErrorMessage={formSubmitErrorMessage}
              nameValue={name.value}
              passwordValue={password.value}
              emailErrorMessage={email.errorMessage}
              nameErrorMessage={name.errorMessage}
              passwordErrorMessage={password.errorMessage}
              onEmailFocus={e => email.onFocus(e)}
              onEmailChange={e => email.onChange(e)}
              onNameFocus={e => name.onFocus(e)}
              onNameChange={e => name.onChange(e)}
              onPasswordFocus={e => password.onFocus(e)}
              onPasswordChange={e => password.onChange(e)}
              isEmailDirty={email.isDirty}
              isNameDirty={name.isDirty}
              isPasswordDirty={password.isDirty}
              isEmailValid={email.isInputValid}
              isNameValid={name.isInputValid}
              isPasswordValid={password.isInputValid}
            />
          </Route>
          <Route path='/signin'>
            <Login 
              onLogin={handleLoginSubmit}
              emailValue={email.value}
              formSubmitErrorMessage={formSubmitErrorMessage}
              nameValue={name.value}
              passwordValue={password.value}
              emailErrorMessage={email.errorMessage}
              nameErrorMessage={name.errorMessage}
              passwordErrorMessage={password.errorMessage}
              onEmailFocus={e => email.onFocus(e)}
              onEmailChange={e => email.onChange(e)}
              onNameFocus={e => name.onFocus(e)}
              onNameChange={e => name.onChange(e)}
              onPasswordFocus={e => password.onFocus(e)}
              onPasswordChange={e => password.onChange(e)}
              isEmailDirty={email.isDirty}
              isNameDirty={name.isDirty}
              isPasswordDirty={password.isDirty}
              isEmailValid={email.isInputValid}
              isNameValid={name.isInputValid}
              isPasswordValid={password.isInputValid}
            />
          </Route>
          <ProtectedRoute
            component={Profile}
            path='/profile'
            nameValue={name.value}
            emailValue={email.value}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileSubmit}
            onSignOut={handleSignOut}
          />
          <ProtectedRoute
            component={Movies}
            path='/movies'
            loggedIn={loggedIn}
            movies={searchedMovies}
            onSearch={handleSearchMoviesSubmit}
            handleMoviesFiltration={handleMoviesFiltration}
            handleSaveOrDeleteClick={handleSaveOrDeleteClick}
            isSavedCheck={isSavedCheck}
            setIsLoading={setIsLoading}
          />
          <ProtectedRoute
            component={SavedMovies}
            path='/saved-movies'
            cardToDelete={movieToDelete}
            isLoading={isLoading}
            isDeleteCardPopupOpened={!!movieToDelete}
            isSavedCheck={isSavedCheck}
            loggedIn={loggedIn}
            onPopupClose={closeAllPopups}
            onSearch={handleSearchSavedMoviesSubmit}
            setCardToDelete={setMovieToDelete}
            setIsLoading={setIsLoading}
            handleMoviesFiltration={handleMoviesFiltration}
            handleSaveOrDeleteClick={handleSaveOrDeleteClick}
            savedMovies={savedMovies}
            searchResponse={savedMoviesSearchResponse}
            setPreloader={setIsLoading}
          />
          <Route exact path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
