import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice';
import { fetchingFilters, fetchedFilters, fetchingErrorFilters } from '../components/heroesFilters/filtersSlice';


export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(fetchingFilters());
  request('http://localhost:3001/filters')
    .then((filters) => dispatch(fetchedFilters(filters)))
    .catch(dispatch(fetchingErrorFilters()));
};
