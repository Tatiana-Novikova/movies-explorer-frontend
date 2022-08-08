import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies (props) {
  const target = 'saved-movies';
  const filterCheckboxState = localStorage.getItem('filterCheckboxState:'+target);
  const searchQueryForSavedMovies = localStorage.getItem('searchQuery:'+target);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);

  React.useEffect(() => {
    if (filterCheckboxState) {
      setFilteredSavedMovies(props.onFilter(props.savedMovies, {searchQueryForSavedMovies, filterCheckboxState}));
    }
  },[filterCheckboxState]);

  return ( 
    <section className='saved-movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        onSearchFormSubmit={props.onSearch}
        target={target}
      />
      <MoviesCardList
        cardToDelete={props.cardToDelete}
        handleSaveOrDeleteClick={props.handleSaveOrDeleteClick}
        isLoading={props.isLoading}
        isSavedCheck={props.isSavedCheck}
        loggedIn={props.loggedIn}
        moviesToPrerenderList={filterCheckboxState ? filteredSavedMovies : props.savedMovies}
        onClose={props.onClose}
        searchResult={props.searchResult}
        moviesListCaption={props.moviesListCaption}
        setMoviesListCaption={props.setMoviesListCaption}
      />
      <Footer/>
    </section>
  );
}

export default SavedMovies
