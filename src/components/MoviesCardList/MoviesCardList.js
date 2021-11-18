import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList (props) {
  function handleShowMoreClick() {
    ;
  };
  return (
    <section className='movies-cards-list'>
      {props.isLoading && (<Preloader/>)}
      <div className='movies-cards-grid'>
        {props.foundedMoviesCards.map((moviesCard) => {
          return (
            <MoviesCard 
              key={moviesCard._id} 
              moviesCard={moviesCard}
              isGridFiltered={props.isGridFiltered}
              onDeleteCardClick={props.onDeleteCardClick}
            />
          )
        })}
      </div>
      <button 
        className='movies-cards-list__button'
        type='button' 
        aria-label='Показать больше фильмов' 
        onClick={handleShowMoreClick}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList
