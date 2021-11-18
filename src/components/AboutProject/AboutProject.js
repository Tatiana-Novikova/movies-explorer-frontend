import React from 'react';
import './AboutProject.css';

function AboutProject () {
  return ( 
    <section className='about-project' id='about-project'>
      <h2 className='title_place_section'>О проекте</h2>
      <div className='about-project__info'>
        <div className='about-project__stages'>
          <h3 className='about-project__heading'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление 
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__stages'>
          <h3 className='about-project__heading'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__scale'>
        <p className='about-project__scale-value'>1 неделя</p>
        <p className='about-project__scale-value'>4 недели</p>
      </div>
      <div className='about-project__scale-captures'>
        <p className='about-project__scale-capture'>Back-end</p>
        <p className='about-project__scale-capture'>Front-end</p> 
      </div>
    </section>
  );
}

export default AboutProject
