import React from 'react';
import './SearchForm.css';

function SearchForm (props) {
  return (
    <form 
    className='search-form'
    onSubmit={props.onFormSubmit}
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
            onChange={props.onSearchQueryChange}
            required
          />
          <button
            className={`search-form__submit-btn opacity-transition
              ${(props.searchQuery !== '')
                ? 'search-form__submit-btn_active'
                : 'search-form__submit-btn_disabled'
              }
            `} 
            type='submit'
            disabled={(props.searchQuery !== '') ? false : true
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
