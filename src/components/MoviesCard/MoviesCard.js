import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const [saveBtnState, setSaveBtnState] = React.useState(false);
  function handleSaveClick() {
    setSaveBtnState(!saveBtnState);
  }
  return (
    <article className={`
    ${(!props.moviesCard.featurette && props.isGridFiltered) 
      ? 'movies-card_hidden'
      : 'movies-card' 
    }`}>
      <img 
        className='movies-card__image' 
        src={props.moviesCard.link} 
        alt={props.moviesCard.title}
      />
      <div className='movies-card__info'>
        <div className='movies-card__main'>
          <h2 className='movies-card__title'>{props.moviesCard.title}</h2>
          <button
            className={`
              ${!props.moviesCard.saved 
                ? 'movies-card__btn_type_save'
                : 'movies-card__btn_hidden' 
              }
              ${saveBtnState 
                ? 'movies-card__btn_active'
                : 'movies-card__btn_disabled' 
              }`}
            type='button' 
            aria-label='Сохранить' 
            onClick={handleSaveClick}
          >
          </button>
          <button
            className={`
              ${props.moviesCard.saved 
                ? 'movies-card__btn_type_delete'
                : 'movies-card__btn_hidden' 
              }
            `}
            type='button' 
            aria-label='Удалить' 
            onClick={props.onDeleteCardClick}
          >
          </button>
        </div>
        <span className='movies-card__duration'>1ч42м</span>
      </div>
    </article>
  )
}

export default MoviesCard;
