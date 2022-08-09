import './MoreBtn.css';

function MoreBtn (props) {

  return (
    <button 
      className={`${props.movies.length >= props.maxMoviesNum 
        ? `more-btn` 
        : `more-btn_hidden`
      }`}
      type='button' 
      aria-label='Показать больше карточек' 
      onClick={props.onClick}
      disabled={false}
    >
      Ещё
    </button>
  )
}

export default MoreBtn