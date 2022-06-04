const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
};


const heroes = (state = initialState, action) => {
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
    default: return state
  };
};


export default heroes;
