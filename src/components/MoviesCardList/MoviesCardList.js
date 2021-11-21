import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList (props) {
  function handleShowMoreClick() {
    ;
  };
  return (
    <section className={`${props.cardsToRender.length === 0
      ? `movies-cards-list_hidden` 
      : `movies-cards-list`}
    `}>
      {props.isLoading && (<Preloader/>)}
      <div className='movies-cards-grid'>
        {props.cardsToRender.map((сardToRender) => {
          return (
            <MoviesCard 
              key={сardToRender._id} 
              сardToRender={сardToRender}
              isGridFiltered={props.isGridFiltered}
              onDeleteCardClick={props.onDeleteCardClick}
              onSaveCard={props.onSaveCard}
            />
          )
        })}
      </div>
      <button 
        className={`${props.cardsToRender.length === 0
          ? `movies-cards-list__button_hidden` 
          : `movies-cards-list__button`}
        `}
        type='button' 
        aria-label='Показать больше фильмов' 
        onClick={handleShowMoreClick}
        disabled={false}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList
