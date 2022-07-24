import React from 'react';
import './SearchForm.css';

function SearchForm (props) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    props.onFormSubmit(searchQuery);
  }

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
              ${(searchQuery !== '')
                ? 'search-form__submit-btn_active'
                : 'search-form__submit-btn_disabled'
              }
            `} 
            type='submit'
            disabled={(searchQuery !== '') ? false : true
            }
          >
            Найти
          </button>
        </div>
      <label className='search-form__filter' htmlFor='checkbox-toggle'>
        <input 
          className='search-form__checkbox'
          type='checkbox'
          checked={props.filterCheckboxState}
          onChange={props.onFilterCheckboxChange}
          id='checkbox-toggle'
          disabled={false}
        />
        <span className='search-form__checkbox-capture'>Короткометражки</span>
      </label>
    </div>
  </form>
  );
}

export default SearchForm
