import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies (props) {
  const [filterCheckboxState, setFilterCheckboxState] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [maxMoviesNum, setMaxMoviesNum] = React.useState(4);
  
  React.useEffect(() => {
    if (filterCheckboxState) {
      setFilteredMovies(props.handleMoviesFiltration(props.movies));
    }
  },[filterCheckboxState]);

  const handleShowMoreClick = () => {
    window.innerWidth >= 1280
      ? setMaxMoviesNum(maxMoviesNum + 4)
      : setMaxMoviesNum(maxMoviesNum + 2);
  }

  return ( 
    <section className='movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        filterCheckboxState={filterCheckboxState}
        onFilterCheckboxChange={() => setFilterCheckboxState(!filterCheckboxState)}
        onFormSubmit={props.onSearch}
      />
      <p className={`${props.movies.length === 0
        ? `movies__caption` 
        : `movies__caption_hidden`}
      `}>
        Чтобы найти фильм, введите запрос
      </p>
      <MoviesCardList
        isLoading={props.isLoading}
        isSavedCheck={props.isSavedCheck}
        handleMoviesFiltration={props.handleMoviesFiltration}
        handleSaveOrDeleteClick={props.handleSaveOrDeleteClick}
        handleShowMoreClick={handleShowMoreClick}
        maxMoviesNum={maxMoviesNum}
        moviesToPrerenderList={filterCheckboxState ? filteredMovies : props.movies}
      />
      <Footer/>
    </section>
  );
}

export default Movies
