// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import { fetchingFilters, fetchedFilters, fetchingErrorFilters, filterCharacters } from "../../actions";
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchingFilters());
    request('http://localhost:3001/filters')
      .then((filters) => dispatch(fetchedFilters(filters)))
      .catch(dispatch(fetchingErrorFilters()))
  }, []); //eslint-disable-line


  if (filtersLoadingStatus === "loading") {
      return <Spinner/>;
  }

  if (filtersLoadingStatus === "error") {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
        return <h5 className="text-center mt-5">Фильтры не найдены</h5>
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
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          { btns }
        </div>
      </div>
    </div>
  )
};


export default HeroesFilters;
