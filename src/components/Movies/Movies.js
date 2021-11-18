import React, { useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesCards from '../../utils/moviesCards';

function Movies (props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [foundedMoviesCards, setFoundedMoviesCards] = React.useState([]);
  const [filterCheckboxState, setFilterCheckboxState] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSearchQueryChange (e) {
    setSearchQuery(e.target.value);
  }

  function handleRequest () {
    setIsLoading(true);
    const formattedMoviesCards = moviesCards.filter(function(card){
      return card.title === searchQuery;
   }).map((moviesCard) => {
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
  
  useEffect(() => {
    handleRequest()
  }, [])

  function handleFormSubmit (e) {
    e.preventDefault();
    handleRequest();
    setIsLoading(false);
  }

  return ( 
    <section className='movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
        onFormSubmit={handleFormSubmit}
        filterCheckboxState={filterCheckboxState}
        onFilterCheckboxChange={() => setFilterCheckboxState(!filterCheckboxState)}
      />
      <p className={`${foundedMoviesCards.length === 0
        ? `movies__caption` 
        : `movies__caption_hidden`}
      `}>Чтобы найти фильм, введите запрос</p>
      <MoviesCardList
        isGridFiltered={filterCheckboxState}
        foundedMoviesCards={foundedMoviesCards}
        isLoading={isLoading}
      />
      <Footer/>
    </section>
  );
}

export default Movies
