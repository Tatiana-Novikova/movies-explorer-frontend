import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import DeleteCardPopup from '../DeletePlacePopup/DeleteCardPopup';

function SavedMovies (props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterCheckboxState, setFilterCheckboxState] = React.useState(false);

  function handleSearchQueryChange (e) {
    setSearchQuery(e.target.value);
  }
  
  useEffect(() => {
    props.handleRequest()
  }, [props])

  function handleFormSubmit (e) {
    e.preventDefault();
    props.handleRequest();
  }

  return ( 
    <section className='saved-movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
        onFormSubmit={handleFormSubmit}
        filterCheckboxState={filterCheckboxState}
        onFilterCheckboxChange={() => setFilterCheckboxState(!filterCheckboxState)}
      />
      <MoviesCardList
        loggedIn={props.loggedIn}
        onDeleteCardClick={props.onDeleteCardClick}
        onDeleteCard={props.onDeleteCard}
        isPopupOpened={props.isPopupOpened} 
        onClose={props.onClose}
        cardToDelete={props.cardToDelete}
        foundedMoviesCards={props.foundedMoviesCards}
        isLoading={props.isLoading}
        handleRequest={props.handleRequest}
      />
      <Footer/>
      <DeleteCardPopup 
        isPopupOpened={props.isPopupOpened} 
        onClose={props.onClose}
        onDeleteCard={props.onDeleteCard}
        setCardToDelete={props.setCardToDelete}
      />
      
    </section>
  );
}

export default SavedMovies
