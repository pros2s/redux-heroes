import { createAction } from "@reduxjs/toolkit";


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


export const heroesFetching = createAction('HEROES_FETCHING');
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const heroDeleted = createAction('HERO_DELETED');
export const heroCreated = createAction('HERO_CREATED');

export const fetchingFilters = createAction('FILTERS_FETCHING');
export const fetchedFilters = createAction('FILTERS_FETCHED');
export const fetchingErrorFilters = createAction('FILTERS_FETCHING_ERROR');
export const filterCharacters = createAction('FILTER_CHARACTERS');
