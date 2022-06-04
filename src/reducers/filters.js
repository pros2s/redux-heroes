const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
};


const filters = (state = initialState, action) => {
  switch (action.type) {
    //////Fetch filters//////
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading'
      }
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filtersLoadingStatus: 'idle',
        filters: action.payload
      }
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      }

    case 'FILTER_CHARACTERS':
      return {
        ...state,
        activeFilter: action.payload
      }
    default: return state
  };
};


export default filters;
