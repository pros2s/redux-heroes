const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filteredHeroes: []
}

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
        heroesLoadingStatus: 'idle',
        filteredHeroes: state.activeFilter === 'all'
                          ?
                        action.payload
                          :
                        action.payload.filter((hero) => hero.element !== state.activeFilter)
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
        heroes: newHeroes,
        filteredHeroes: state.activeFilter === 'all'
                          ?
                        newHeroes
                          :
                        newHeroes.filter((hero) => hero.element === action.payload)
      }
    case 'HERO_CREATED':
      const createdHeroes = [ ...state.heroes, action.payload ];
      return {
        ...state,
        heroes: createdHeroes,
        filteredHeroes: state.activeFilter === 'all'
                          ?
                        createdHeroes
                          :
                        createdHeroes.filter((hero) => hero.element === action.payload)
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
        activeFilter: action.payload,
        filteredHeroes: action.payload === 'all'
                          ?
                        state.heroes
                          :
                        state.heroes.filter((hero) => hero.element === action.payload)
      }
    default: return state
  };
};


export default reducer;
