import { createReducer } from "@reduxjs/toolkit";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
  heroCreated
} from '../actions';


const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
};

const heroes = createReducer(initialState, (builder) => {
  builder
    .addCase(heroesFetching, (state) => {
      state.heroesLoadingStatus = 'loading';
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = 'idle';
    })
    .addCase(heroesFetchingError, (state) => {
      state.heroesLoadingStatus = 'error';
    })
    .addCase(heroDeleted, (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    })
    .addCase(heroCreated, (state, action) => {
      state.heroes.push(action.payload);
    })
    .addDefaultCase(() => {});
});


export default heroes;
