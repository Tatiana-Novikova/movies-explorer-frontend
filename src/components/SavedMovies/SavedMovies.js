import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import DeleteCardPopup from '../DeleteCardPopup/DeleteCardPopup';

function SavedMovies (props) {
  const [filterCheckboxState, setFilterCheckboxState] = React.useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  // const [seachedMoviesLength, setSeachedMoviesLength] = React.useState(0);
  const [maxMoviesNum, setMaxMoviesNum] = React.useState(16);
  
  React.useEffect(() => {
    if (filterCheckboxState) {
      setFilteredSavedMovies(props.handleMoviesFiltration(props.savedMovies));
    }
  },[filterCheckboxState]);

  const handleShowMoreClick = () => {
    window.innerWidth >= 1280
      ? setMaxMoviesNum(maxMoviesNum + 4)
      : setMaxMoviesNum(maxMoviesNum + 2);
  }

  return ( 
    <section className='saved-movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        filterCheckboxState={filterCheckboxState}
        onFilterCheckboxChange={() => setFilterCheckboxState(!filterCheckboxState)}
        onFormSubmit={props.onSearch}
      />
      <p className={`${props.savedMovies.length === 0
        ? `saved-movies__caption` 
        : `saved-movies__caption_hidden`}
      `}>
        Чтобы найти фильм, введите запрос
      </p>
      <MoviesCardList
        cardToDelete={props.cardToDelete}
        handleSaveOrDeleteClick={props.handleSaveOrDeleteClick}
        handleShowMoreClick={handleShowMoreClick}
        isGridFiltered={filterCheckboxState}
        isLoading={props.isLoading}
        isSavedCheck={props.isSavedCheck}
        loggedIn={props.loggedIn}
        maxMoviesNum={maxMoviesNum}
        moviesToPrerenderList={filterCheckboxState ? filteredSavedMovies : props.savedMovies}
        onClose={props.onClose}
      />
      <Footer/>
      <DeleteCardPopup 
        isDeleteCardPopupOpened={props.isDeleteCardPopupOpened} 
        onPopupClose={props.onPopupClose}
        setCardToDelete={props.setCardToDelete}
      />  
    </section>
  );
}

export default SavedMovies
