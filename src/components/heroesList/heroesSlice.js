import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import { useHttp } from '../../hooks/http.hook';


export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  () => {
    const { request } = useHttp();
    return request('http://localhost:3001/heroes');
  }
);

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  }
});

export const filteredHeroesSelector = createSelector(
  (state) => state.heroes.heroes,
  (state) => state.filters.activeFilter,
  (heroes, filter) => {
    if (filter === 'all') return heroes;
    return heroes.filter((hero) => hero.element === filter);
  }
);

const { actions, reducer } = heroesSlice;


export default reducer;
export const { heroDeleted, heroCreated } = actions;