import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies (props) {
  const target = 'movies';
  const filterCheckboxState = localStorage.getItem('filterCheckboxState:'+target);
  const searchQueryForMovies = localStorage.getItem('searchQuery:'+target);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  React.useEffect(() => {
    if (filterCheckboxState) {
      setFilteredMovies(props.onFilter(props.movies, {searchQueryForMovies, filterCheckboxState}));
    }
  },[filterCheckboxState]);

  return ( 
    <section className='movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        onSearchFormSubmit={props.onSearch}
        target={target}
      />
      <MoviesCardList
        isLoading={props.isLoading}
        isSavedCheck={props.isSavedCheck}
        handleSaveOrDeleteClick={props.handleSaveOrDeleteClick}
        moviesToPrerenderList={filterCheckboxState ? filteredMovies : props.movies}
      />
      <Footer/>
    </section>
  );
}

export default Movies
