import React from 'react';
import './MoviesCardList.css';
import Movie from '../Movie/Movie';
import Preloader from '../Preloader/Preloader';

function MoviesCardList (props) {
  let moviesToRender = [];

  for (let i = 0; i < props.maxMoviesNum; i++) {
    if (props.moviesToPrerenderList[i]) {
      moviesToRender.push(props.moviesToPrerenderList[i]);
    }
  }

  // window.addEventListener("optimizedResize", function() {
  //   console.log("Resource conscious resize callback!");
  // });

  return (
    <section className={`${moviesToRender.length === 0
      ? `movies-cards-list_hidden` 
      : `movies-cards-list`}
    `}>
      {props.isLoading && (<Preloader/>)}
      <ul className='movies-cards-grid'>
        {moviesToRender.map((movieToRender) => {
          return (
            <li key={movieToRender.movieId || movieToRender.id}>
              <Movie
                handleSaveOrDeleteClick={props.handleSaveOrDeleteClick}
                isSavedCheck={props.isSavedCheck}
                movieToRender={movieToRender}
              />
            </li>
          )
        })}
      </ul>
      <button 
        className={`${moviesToRender.length <= props.maxMoviesNum
          ? `movies-cards-list__btn` 
          : `movies-cards-list__btn_hidden`
        }`}
        type='button' 
        aria-label='Показать больше фильмов' 
        onClick={props.handleShowMoreClick}
        disabled={false}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList
