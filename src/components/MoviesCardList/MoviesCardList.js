import React from 'react';
import './MoviesCardList.css';
import Movie from '../Movie/Movie';
import MoreBtn from '../MoreBtn/MoreBtn';
import Preloader from '../Preloader/Preloader';

function MoviesCardList (props) {
  const location = window.location.pathname;
  let moviesToRender = [];
  const lastSearchedMovies = JSON.parse(localStorage.getItem('lastSearchedMovies'));
  let captureText = '';
  const [maxMoviesNum, setMaxMoviesNum] = React.useState(
    (window.innerWidth >= 1280) 
      ? 16
      : window.innerWidth < 1280 && window.innerWidth >= 768
        ? 8
        : window.innerWidth < 768 && window.innerWidth >= 320
          ? 5
          : 0
  );

  for (let i = 0; i < maxMoviesNum; i++) {
    if (props.moviesToPrerenderList[i]) {
      moviesToRender.push(props.moviesToPrerenderList[i]);
    }
  }

  const handleShowMoreClick = () => {
    window.innerWidth >= 1280
      ? setMaxMoviesNum(maxMoviesNum + 4)
      : setMaxMoviesNum(maxMoviesNum + 2);
  }

  if (location === '/movies') {
    if (!lastSearchedMovies) {
      captureText = 'Чтобы найти фильм, введите запрос';
    } else if (lastSearchedMovies.length === 0) {
      captureText = 'Фильм по запросу не найден';
    }
  } else if (location === '/saved-movies') {
    if(props.searchResult === '') {
      captureText = 'Сохранённых фильмов пока нет';
    } else {
      captureText = props.searchResult;
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
      setMaxMoviesNum(16);
    } else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
      setMaxMoviesNum(8);
    } else if (window.innerWidth < 768 && window.innerWidth >= 320) {
      setMaxMoviesNum(5);
    } 
  })

  return (
    props.isLoading ? <Preloader isLoading={props.isLoading} /> : 
      <section className='movies-cards-list'>
        {moviesToRender.length !== 0 
          ? (
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
            ) 
          : (
            <p className={'movies-cards-list__capture'}>
              {captureText}
            </p>
          )
        }
        <MoreBtn
          movies={moviesToRender}
          maxMoviesNum={maxMoviesNum}
          onClick={handleShowMoreClick}
        />
      </section>
  );
}

export default MoviesCardList
