import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm (props) {
  const [isRequest, setIsRequest] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(localStorage.getItem('searchQuery:'+props.target) || '');
  const [isShort, setIsShort] = React.useState(() => {
    const saved = JSON.parse(localStorage.getItem('checkboxState:'+props.target));
    return saved || '';
  });
  const searchQueryRef = React.useRef(searchQuery);


  const handleSearch = (e) => {
    e.preventDefault();
    localStorage.setItem('searchQuery:'+props.target, searchQuery);
    setIsRequest(true);
    props.onSearchFormSubmit({ searchQuery, isShort });
    setIsRequest(false);
  }
 
  const onCheckboxChange = (isChecked) => {
    localStorage.setItem('checkboxState:'+props.target, Boolean(isChecked));
    props.onSearchFormSubmit({ searchQuery, isShort:isChecked });
    setIsShort(isChecked);
  }

  React.useEffect(() => {
    localStorage.setItem('checkboxState:'+props.target, Boolean(isShort));
  }, [isShort])

  return (
    <form 
    className='search-form'
    onSubmit={handleSearch}
    noValidate 
    autoComplete='off'
  > 
    <div className='search-form__container'>
      <div className='search-form__icon'></div> 
        <div className='search-form__input-container'>
          <input
            className='search-form__input'
            ref={searchQueryRef}
            id='query' 
            name='query' 
            type='text'
            placeholder='Фильм'
            onChange={ (e) => setSearchQuery(e.target.value) }
            value={searchQuery}
            required
          />
          <button
            className={`search-form__submit-btn opacity-transition
              ${(searchQuery !== '')  && !isRequest
                ? 'search-form__submit-btn_active'
                : 'search-form__submit-btn_disabled'
              }
            `} 
            type='submit'
            disabled={(searchQuery !== '') && !isRequest ? false : true
            }
          >
            Найти
          </button>
        </div>
      <FilterCheckbox
        onChange={onCheckboxChange}
        isChecked={isShort}
      />
    </div>
  </form>
  );
}

export default SearchForm
