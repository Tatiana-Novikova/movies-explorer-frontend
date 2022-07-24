import React from 'react'; 
import './Movie.css';

function Movie (props) {
  const [saveBtnState, setSaveBtnState] = React.useState(false);
  const isOnSavedMovies = window.location.pathname === '/saved-movies';
  const isOnMovies = window.location.pathname === '/movies';
  const isSaved = props.isSavedCheck(props.movieToRender);

  const handleSaveCardClick = () => {
    setSaveBtnState(!saveBtnState);
    props.handleSaveOrDeleteClick(props.movieToRender, isSaved);
  }

  return (
    <article>
     <a className="movie__link" 
        href={isOnSavedMovies 
          ? `${props.movieToRender.trailer}`
          : `${props.movieToRender.trailerLink}`
        }
        target="_blank" 
        rel="noreferrer"
      >
        <img 
          className='movie__image' 
          src={isOnMovies
            ? 'https://api.nomoreparties.co' + props.movieToRender.image.url
            :  props.movieToRender.image
          } 
          alt={props.movieToRender.nameRU}
        />
      </a>
      <div className='movie__info'>
        <div className='movie__main'>
          <h2 className='movie__title'>{props.movieToRender.nameRU}</h2>
          <span className='movie__duration'>
            {Math.floor(props.movieToRender.duration/60)}ч{props.movieToRender.duration%60}м
          </span>
        </div>
          <button
            className={`
              ${isSaved
                ? 'movie__btn_active'
                : 'movie__btn_disabled' 
              }
              ${isOnMovies
                ? 'movie__btn_type_save'
                : 'movie__btn_type_delete'
              }
            `}
            type='button' 
            aria-label='Сохранить/Удалить' 
            onClick={handleSaveCardClick}
          >
          </button>
      </div>
    </article>
  )
}

export default Movie;
