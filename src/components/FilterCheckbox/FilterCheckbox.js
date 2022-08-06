import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox (props) {          
  return (
      <div className='filterCheckbox'>
        <label 
          className='filterCheckbox__label'
          htmlFor='filterCheckbox-toggle'
        >
          <input 
            className='filterCheckbox__check'
            type='checkbox'
            checked={props.isChecked}
            onChange={ (e) => {
              props.onChange(e.target.checked);
            }}
            id='filterCheckbox-toggle'
            disabled={false}
           />
          <span className='filterCheckbox__capture'>Короткометражки</span>
        </label>
      </div>
  )
}

export default FilterCheckbox;
