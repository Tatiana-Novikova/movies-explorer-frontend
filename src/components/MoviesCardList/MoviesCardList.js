import React from 'react';
import './MoviesCardList.css';
import Movie from '../Movie/Movie';
import MoreBtn from '../MoreBtn/MoreBtn';
import Preloader from '../Preloader/Preloader';

function MoviesCardList (props) {
  const location = window.location.pathname;
  const maxMoviesNumOnLargeScreen = 16;
  const maxMoviesNumOnMiddleScreen = 8;
  const maxMoviesNumOnSmallScreen = 5;
  const largeScreenSizePoint = 1280;
  const middleScreenSizePoint = 768;
  const smallScreenSizePoint = 320;
  let moviesToRender = [];
  const lastSearchedMovies = JSON.parse(localStorage.getItem('lastSearchedMovies'));
  // let captureText = '';
 
  const [maxMoviesNum, setMaxMoviesNum] = React.useState(
    window.innerWidth >= largeScreenSizePoint
      ? maxMoviesNumOnLargeScreen
      : window.innerWidth < largeScreenSizePoint 
        && window.innerWidth >= middleScreenSizePoint
          ? maxMoviesNumOnMiddleScreen
          : window.innerWidth < middleScreenSizePoint 
            && window.innerWidth >= smallScreenSizePoint
              ? maxMoviesNumOnSmallScreen
              : maxMoviesNumOnSmallScreen
  );

  for (let i = 0; i < maxMoviesNum; i++) {
    if (props.moviesToPrerenderList[i]) {
      moviesToRender.push(props.moviesToPrerenderList[i]);
    }
  }

  React.useEffect(() => {
    if (location === '/movies') {
      if (!lastSearchedMovies) {
        props.setMoviesListCaption('Чтобы найти фильм, введите запрос');
      } else if (lastSearchedMovies.length === 0) {
        props.setMoviesListCaption('Фильм по запросу не найден');
      }
    } else if (location === '/saved-movies') {
      if(props.searchResult === '') {
        props.setMoviesListCaption('Сохранённых фильмов пока нет');
      } else {
        props.setMoviesListCaption(props.moviesListCaption);
      }
    }
  }, [])

  const handleShowMoreClick = () => {
    window.innerWidth >= largeScreenSizePoint
      ? setMaxMoviesNum(maxMoviesNum + 4)
      : setMaxMoviesNum(maxMoviesNum + 2);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= largeScreenSizePoint) {
      setMaxMoviesNum(maxMoviesNumOnLargeScreen);
    } else if (window.innerWidth < largeScreenSizePoint 
      && window.innerWidth >= middleScreenSizePoint) {
      setMaxMoviesNum(maxMoviesNumOnMiddleScreen);
    } else if (window.innerWidth < middleScreenSizePoint 
      && window.innerWidth >= smallScreenSizePoint) {
      setMaxMoviesNum(maxMoviesNumOnSmallScreen);
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
              {props.moviesListCaption}
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
