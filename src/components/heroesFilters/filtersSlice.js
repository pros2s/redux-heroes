import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    fetchingFilters: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    fetchedFilters: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload
    },
    fetchingErrorFilters: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    filterCharacters: (state, action) => {
      state.activeFilter = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;


export default reducer;
export const {
  fetchingFilters,
  fetchedFilters,
  fetchingErrorFilters,
  filterCharacters
} = actions;
