import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import DeleteCardPopup from '../DeleteCardPopup/DeleteCardPopup';
import savedMoviesCards from '../../utils/savedMoviesCards';

// import MainApi from '../../utils/MainApi';

function SavedMovies (props) {
  const [filterCheckboxState, setFilterCheckboxState] = React.useState(false);
  const [cardsToRender, setCardsToRender] = React.useState(savedMoviesCards);
  const [searchQuery, setSearchQuery] = React.useState('');

  function handleSearchQueryChange (e) {
    setSearchQuery(e.target.value);
  }
  
  function handleDeleteCardClick(card) {
    props.setCardToDelete(card);
  }

  function handleSearchRequest () {
    props.setIsLoading(true);
    const formattedMoviesCards = savedMoviesCards
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

  function handleDeleteCardSubmit(card) {
    // MainApi.deleteCard(card._id)
    //   .then((newCard) => {
    //     setCardsToRender((cards) => 
    //       cards.filter((c) => 
    //         c._id !== card._id))
    //     props.setCardToDelete(null);
    //   })
    //   .catch((error) => console.log(error));
  }

  function handleFormSubmit (e) {
    e.preventDefault();
    handleSearchRequest();
  }
  
  useEffect(() => {
    handleSearchRequest()
  }, [searchQuery])

  return ( 
    <section className='saved-movies'>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
        filterCheckboxState={filterCheckboxState}
        onFilterCheckboxChange={() => setFilterCheckboxState(!filterCheckboxState)}
        onFormSubmit={handleFormSubmit}
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
      />
      <MoviesCardList
        cardToDelete={props.cardToDelete}
        cardsToRender={cardsToRender}
        isGridFiltered={filterCheckboxState}
        isLoading={props.isLoading}
        loggedIn={props.loggedIn}
        onClose={props.onClose}
        onDeleteCard={handleDeleteCardSubmit}
        onDeleteCardClick={handleDeleteCardClick}
      />
      <Footer/>
      <DeleteCardPopup 
        isDeleteCardPopupOpened={props.isDeleteCardPopupOpened} 
        onPopupClose={props.onPopupClose}
        onDeleteCard={handleDeleteCardSubmit}
        setCardToDelete={props.setCardToDelete}
      />  
    </section>
  );
}

export default SavedMovies
