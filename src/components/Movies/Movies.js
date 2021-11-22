import React, { useEffect} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesCards from '../../utils/moviesCards';
import savedMoviesCards from '../../utils/savedMoviesCards';

// import MoviesApi from '../../utils/MoviesApi';

function Movies (props) {
  const [filterCheckboxState, setFilterCheckboxState] = React.useState(false);
  const [cardsToRender, setCardsToRender] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  function handleSearchQueryChange (e) {
    setSearchQuery(e.target.value);
  }

  function handleSaveCardSubmit(card) {
    savedMoviesCards.push(card);
  }

  function handleSearchRequest () {
    props.setIsLoading(true);
    // MoviesApi.getMoviesCards({query: searchQuery})
    //   .then(res => {
    //     const formattedMoviesCards = res.results
    //       .filter(card => {
    //         return card.nameRU
    //           .toLowerCase()
    //           .includes(searchQuery.toLowerCase()
    //       )})
    //       .map((card) => {
    //         return {
    //           _id: card._id,
    //           duration: card.duration,
    //           imageUrl: card.image.url,
    //           nameRU: card.nameRU,
    //           trailerLink: card.trailerLink,
    //         }
    //       })
    const formattedMoviesCards = moviesCards
      .filter(card => {
        return card.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()
      )})
      .map((card) => {
        return {
          _id: card._id,
          duration: card.duration,
          featurette: card.featurette,
          link: card.link,
          saved: card.saved,
          title: card.title
        }
      })
    setCardsToRender(formattedMoviesCards);
    props.setIsLoading(false);
  }

  function handleFormSubmit (e) {
    e.preventDefault();
    handleSearchRequest();
  }
  
  useEffect(() => {
    handleSearchRequest()
  }, [searchQuery])

  return ( 
    <section className='movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        filterCheckboxState={filterCheckboxState}
        onFilterCheckboxChange={() => setFilterCheckboxState(!filterCheckboxState)}
        onFormSubmit={handleFormSubmit}
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
      />
      <p className={`${cardsToRender.length === 0
        ? `movies__caption` 
        : `movies__caption_hidden`}
      `}>
        Чтобы найти фильм, введите запрос
      </p>
      <MoviesCardList
        cardsToRender={cardsToRender}
        isGridFiltered={filterCheckboxState}
        isLoading={props.isLoading}
        onSaveCard={handleSaveCardSubmit}
      />
      <Footer/>
    </section>
  );
}

export default Movies
