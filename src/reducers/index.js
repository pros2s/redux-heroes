const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    //////Fetch heroes//////
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading'
      }
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle'
      }
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error'
      }

    //////Add and remove heroes//////
    case 'HERO_DELETED':
      const newHeroes = state.heroes.filter((hero) => hero.id !== action.payload);
      return {
        ...state,
        heroes: newHeroes
      }
    case 'HERO_CREATED':
      const createdHeroes = [ action.payload, ...state.heroes ];
      return {
        ...state,
        heroes: createdHeroes
      }

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


export default reducer;
