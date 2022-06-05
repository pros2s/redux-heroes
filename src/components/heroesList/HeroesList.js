import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect';

import './heroesListItem.scss';

import { heroDeleted, fetchHeroes } from '../heroesList/heroesSlice';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import { useHttp } from '../../hooks/http.hook';


const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.heroes.heroes,
    (state) => state.filters.activeFilter,
    (heroes, filter) => {
      if (filter === 'all') return heroes;
      return heroes.filter((hero) => hero.element === filter);
    }
  );

  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes(request));
    // eslint-disable-next-line
  }, []);

  const onDeleteChar = useCallback((id) => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then(dispatch(heroDeleted(id)))
      .catch((err) => { throw new Error(err) })
  }, [ request ]); //eslint-disable-line


  if (heroesLoadingStatus === 'loading') {
    return <Spinner/>;
  }

  if (heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
  };

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
        return (
        <CSSTransition
          timeout={ 0 }
          classNames='char'>
            <h5 className='text-center mt-5'>Героев пока нет</h5>
        </CSSTransition>
      );
    };

    return arr.map(({id, ...props}) => {
        return (
          <CSSTransition
            key={ id }
            timeout={ 500 }
            classNames='char'>
              <HeroesListItem {...props} onDelete={ () => onDeleteChar(id) }/>
          </CSSTransition>
        );
    });
  };


  const elements = renderHeroesList(filteredHeroes);
  return (
    <TransitionGroup component='ul'>
      {elements}
    </TransitionGroup>
  );
};


export default HeroesList;
