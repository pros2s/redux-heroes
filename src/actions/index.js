import { createAction } from "@reduxjs/toolkit";

import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice';


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

export const fetchingFilters = createAction('FILTERS_FETCHING');
export const fetchedFilters = createAction('FILTERS_FETCHED');
export const fetchingErrorFilters = createAction('FILTERS_FETCHING_ERROR');
export const filterCharacters = createAction('FILTER_CHARACTERS');
