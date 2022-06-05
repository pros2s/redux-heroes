import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { filterCharacters, fetchFilters } from './filtersSlice';
import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
  }, []); //eslint-disable-line


  if (filtersLoadingStatus === 'loading') {
      return <Spinner/>;
  };

  if (filtersLoadingStatus === 'error') {
      return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
  };

  const renderFilters = (arr) => {
    if (arr.length === 0) {
        return <h5 className='text-center mt-5'>Фильтры не найдены</h5>
    };

    return arr.map(({ name, className, output }) => {
      const btnClass = classNames('btn', className, { active: activeFilter === name });
        return (
          <button
            key={ name }
            className={ btnClass }
            onClick={ () => dispatch(filterCharacters(name)) }>
              { output }
          </button>
        );
    });
  };
  const btns = renderFilters(filters);


  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          { btns }
        </div>
      </div>
    </div>
  );
};


export default HeroesFilters;
