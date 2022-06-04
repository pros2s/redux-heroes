import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './heroesListItem.scss';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const {heroes, heroesLoadingStatus} = useSelector(state => state);
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))

    // eslint-disable-next-line
  }, []);

  const onDeleteChar = useCallback((id) => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then(dispatch(heroDeleted(id)))
      .catch((err) => { throw new Error(err) })
  }, [ request ]); //eslint-disable-line


  if (heroesLoadingStatus === "loading") {
    return <Spinner/>;
  }

  if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  };

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
        return (
        <CSSTransition
          timeout={ 0 }
          classNames='char'>
            <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    };

    return arr.map(({id, ...props}) => {
        return (
          <CSSTransition
            key={id}
            timeout={ 500 }
            classNames='char'>
              <HeroesListItem {...props} onDelete={ () => onDeleteChar(id) }/>
          </CSSTransition>
        );
    });
  };


  const elements = renderHeroesList(heroes);
  return (
    <TransitionGroup component="ul">
      {elements}
    </TransitionGroup>
  );
};


export default HeroesList;
