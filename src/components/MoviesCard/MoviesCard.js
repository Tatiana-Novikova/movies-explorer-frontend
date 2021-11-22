import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const [saveBtnState, setSaveBtnState] = React.useState(false);

  function handleSaveCardClick() {
    setSaveBtnState(!saveBtnState);
    props.onSaveCard();
  }

  return (
    <article className={`
    ${(!props.сardToRender.featurette && props.isGridFiltered) 
      ? 'movies-card_hidden'
      : 'movies-card' 
    }`}>
      <img 
        className='movies-card__image' 
        src={props.сardToRender.link} 
        alt={props.сardToRender.title}
      />
      <div className='movies-card__info'>
        <div className='movies-card__main'>
          <h2 className='movies-card__title'>{props.сardToRender.title}</h2>
          <span className='movies-card__duration'>{props.сardToRender.duration}</span>
        </div>
          <button
            className={`
              ${!props.сardToRender.saved 
                ? 'movies-card__btn_type_save'
                : 'movies-card__btn_hidden' 
              }
              ${saveBtnState 
                ? 'movies-card__btn_active'
                : 'movies-card__btn_disabled' 
              }
            `}
            disabled={props.сardToRender.saved ? true : false}
            type='button' 
            aria-label='Сохранить' 
            onClick={handleSaveCardClick}
          >
          </button>
          <button
            className={`
              ${props.сardToRender.saved
                ? 'movies-card__btn_type_delete'
                : 'movies-card__btn_hidden'
              }
            `}
            type='button'
            aria-label='Удалить'
            onClick={props.onDeleteCardClick}
            disabled={false}
          >
          </button>
      </div>
    </article>
  )
}

export default MoviesCard;
